import React, {PropTypes} from "react";
import _ from "lodash";

function trim (value) {
  return typeof value === 'string' ? value.trim() : value
}

class BaseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  componentWillReceiveProps({ value }){
    this.setState({ value })
  }

  render() {
    const {
      readonly,
      autofocus,
      options,  // eslint-disable-line
      schema,   // eslint-disable-line
      formContext,  // eslint-disable-line
      registry, // eslint-disable-line
      className='form-control',
      ...inputProps
    } = this.props;
    const {value} = this.state;

    return (
      <input
      {...inputProps}
      className={className}
      readOnly={readonly}
      autoFocus={autofocus}
      value={typeof value === "undefined" ? "" : value}
      onBlur={() => this.props.onChange(trim(value))}
      onChange={({ target: { value } }) => this.setState({value})}/>
    );
  }
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default BaseInput;
