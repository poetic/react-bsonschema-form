import React, { PropTypes } from "react";
import { Double } from 'bson';
import BsonNumberFieldHOC from './BsonNumberFieldHOC';

function stringToBsonNumber (string, {decimalPlaces = 2}) {
  const float = parseFloat(string);
  if (isNaN(float)) {
    return undefined;
  } else {
    return new Double(parseFloat(float.toFixed(decimalPlaces)));
  }
}

export default BsonNumberFieldHOC(stringToBsonNumber)
