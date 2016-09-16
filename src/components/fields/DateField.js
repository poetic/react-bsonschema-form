import React, { PropTypes } from "react";
import Datetime from 'react-datetime';

import BaseInput from "../widgets/BaseInput";
import 'react-datetime/css/react-datetime.css';

function DateField(props) {
  const {onChange} = props;

  const cleanValue = (value) => {
    if (!value) {
      return undefined;
    } else if (typeof value.toDate === 'function') {
      return value.toDate();
    } else {
      return value;
    }
  }

  return (
    <Datetime
      {...props}
      onChange={(value) => onChange(cleanValue(value))} />
  );
}

if (process.env.NODE_ENV !== "production") {
  DateField.propTypes = {
    value: PropTypes.string,
  };
}

export default DateField;
