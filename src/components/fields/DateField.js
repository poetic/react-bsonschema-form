import React, { PropTypes } from "react";
import Datetime from 'react-datetime';
import moment from 'moment';

import 'react-datetime/css/react-datetime.css';

function stringifyDate ({ date, utc }) {
  if (date == null) {
    return date
  }
  if (utc) {
    return moment(date).utc().format('L LT')
  } else {
    return moment(date).format('L LT')
  }
}

function cleanValue (value) {
  // empty string, undefind, null ...
  if (!value) {
    return undefined
  } else if (typeof value.toDate === 'function') {
    return value.toDate();
  } else {
    // the value may be string, we will let the json schema form to tell
    // user the type is not date
    return value;
  }
}

function DateField(props) {
  const {onChange, formData, readonly, disabled, uiSchema} = props;
  const {StringField} = props.registry.fields;
  const {utc} = uiSchema['ui:options'] || {};

  if (readonly || disabled) {
    const formDataString = stringifyDate({ date: formData, utc })
    return <StringField
      {...props}
      formData={formDataString}/>
  } else {
    return (
      <Datetime
        inputProps={{ placeholder: 'mm/dd/yyyy' }}
        utc={utc}
        input
        closeOnSelect
        timeFormat={false}
        value={formData}
        onChange={(value) => onChange(cleanValue(value))}
      />
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  DateField.propTypes = {
    value: PropTypes.string,
  };
}

export default DateField;
