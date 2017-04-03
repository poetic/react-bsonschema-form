import React, { PropTypes } from "react";
import StringField from "./StringField";

function BsonNumberField ({ formData, onChange, stringToBsonNumber, ...other }) {
  // NOTE: formData is string, so when it's false, it must be empty string or undefined
  return (
    <StringField
      formData={formData && formData.toJSON().toString()}
      onChange={(value) => onChange(stringToBsonNumber(value))}
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
