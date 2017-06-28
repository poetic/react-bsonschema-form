import React, {PropTypes} from "react";

function HTMLWidget(props) {
  const html = props.options.html || '';
  return <div className="raw-html" dangerouslySetInnerHTML={{ __html: html }} />
}

if (process.env.NODE_ENV !== "production") {
  HTMLWidget.propTypes = {
    value: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.object,
    ]),
  };
}

export default HTMLWidget;
