import React, {PropTypes} from "react";

import {
  defaultFieldValue,
  getWidget,
  getUiOptions,
  optionsList,
  getDefaultRegistry
} from "../../utils";

function emptyToUndefined (value) {
  if (value == null) {
    return undefined;
  } else if (typeof value === 'string') {
    return value.length > 0 ? value : undefined;
  } else {
    // value can be other types, say long, int, double
    return value;
  }
}

function StringField(props) {
  const {
    className,
    schema,
    name,
    uiSchema,
    idSchema,
    formData,
    required,
    disabled,
    readonly,
    autofocus,
    registry,
    onChange,
  } = props;
  const {title, format} = schema;
  const {widgets, formContext} = registry;
  const enumOptions = Array.isArray(schema.enum) && optionsList(schema);
  const defaultWidget = format || (enumOptions ? "select" : "text");
  const {widget=defaultWidget, placeholder="", ...options} = getUiOptions(uiSchema);
  const Widget = getWidget(schema, widget, widgets);
  const inputProps = {};

  return <Widget
    {...inputProps}
    options={{...options, enumOptions}}
    className={className}
    schema={schema}
    id={idSchema && idSchema.$id}
    label={title === undefined ? name : title}
    value={defaultFieldValue(formData, schema)}
    onChange={(value) => onChange(emptyToUndefined(value))}
    required={required}
    disabled={disabled}
    readonly={readonly}
    formContext={formContext}
    autofocus={autofocus}
    registry={registry}
    placeholder={placeholder}/>;
}

if (process.env.NODE_ENV !== "production") {
  StringField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object.isRequired,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.object,
    ]),
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
      ])).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired,
    }),
    formContext: PropTypes.object.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
  };
}

StringField.defaultProps = {
  uiSchema: {},
  registry: getDefaultRegistry(),
  disabled: false,
  readonly: false,
  autofocus: false,
};

export default StringField;
