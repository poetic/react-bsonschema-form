import React, { PropTypes } from "react";
import { Double } from 'bson';
import BsonNumberFieldHOC from './BsonNumberFieldHOC';

function stringToBsonNumber (string) {
  const float = parseFloat(string);
  if (isNaN(float)) {
    return undefined;
  } else {
    return new Double(parseFloat(float.toFixed(2)));
  }
}

export default BsonNumberFieldHOC(stringToBsonNumber)
