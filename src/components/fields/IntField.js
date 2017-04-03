import React, { PropTypes } from "react";
import { Int32 } from 'bson';
import BsonNumberFieldHOC from './BsonNumberFieldHOC';

function stringToBsonNumber (string) {
  const int = parseInt(string);
  if (isNaN(int)) {
    return undefined;
  } else {
    return new Int32(int);
  }
}

export default BsonNumberFieldHOC(stringToBsonNumber)
