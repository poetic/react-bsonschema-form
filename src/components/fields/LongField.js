import React, { PropTypes } from "react";
import { Long } from 'bson';
import BsonNumberFieldHOC from './BsonNumberFieldHOC';

function stringToBsonNumber (string) {
  const long = parseInt(string);
  if (isNaN(long)) {
    return undefined;
  } else {
    return Long.fromString(long.toString());
  }
}

export default BsonNumberFieldHOC(stringToBsonNumber)
