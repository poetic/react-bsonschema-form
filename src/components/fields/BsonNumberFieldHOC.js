import React, { PropTypes } from "react";
import StringField from "./StringField";

function toString (value) {
  if (value == null) {
    return undefined
  } else if (value.toJSON) {
    return value.toJSON().toString()
  } else if (value.toString) {
    return value.toString()
  } else {
    throw new Error(`The value can not be stringified: ${value}`)
  }
}

function BsonNumberField ({ formData, onChange, stringToBsonNumber, ...other }) {
  const options = other.uiSchema && other.uiSchema['ui:options']
  // NOTE: formData is string, so when it's false, it must be empty string or undefined
  const parse = (value) => {
    return typeof value === 'string' ? stringToBsonNumber(value, options) : value
  }
  return (
    <StringField
      formData={toString(formData)}
      onChange={(value) => onChange(parse(value))}
      {...other}
    />
  );
}

if (process.env.NODE_ENV !== "production") {
  BsonNumberField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.object,
    required: PropTypes.bool,
    formContext: PropTypes.object.isRequired,
  };
}

BsonNumberField.defaultProps = {
  uiSchema: {}
};

function BsonNumberFieldHOC(stringToBsonNumber) {
  return (props) => {
    return <BsonNumberField
      {...props}
      stringToBsonNumber={stringToBsonNumber}
    />
  }
}

export default BsonNumberFieldHOC;
