import React, { PropTypes } from "react";
import Datetime from 'react-datetime';
import moment from 'moment';

import 'react-datetime/css/react-datetime.css';

function cleanValue (value) {
  if (!value) {
    return undefined;
  } else if (typeof value.toDate === 'function') {
    return value.toDate();
  } else {
    return value;
  }
}

function DateField(props) {
  const {onChange, formData, readonly, disabled} = props;
  const {StringField} = props.registry.fields;

  if (readonly || disabled) {
    return <StringField
      {...props}
      formData={formData && moment(formData).format('L LT')}/>
  } else {
    return (
      <Datetime
        {...props}
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
