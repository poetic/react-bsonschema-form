import React, { PropTypes } from "react";
import { Double } from 'bson';
import BsonNumberFieldHOC from './BsonNumberFieldHOC';

function stringToBsonNumber (string) {
  const float = parseFloat(string);
  if (isNaN(float)) {
    return undefined;
  } else {
    return new Double(float);
  }
}

export default BsonNumberFieldHOC(stringToBsonNumber)
