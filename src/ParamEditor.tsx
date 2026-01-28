import React from 'react';

/* ===== TYPES ===== */

export interface Param {
  id: number;
  name: string;
  type: 'string'; 
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Color {
  id: number;
  name: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  values: Record<number, string>;
}

/* ===== PARAM EDITORS ===== */

interface ParamEditorProps {
  param: Param;
  value: string;
  onChange: (value: string) => void;
}

const StringParamEditor: React.FC<ParamEditorProps> = ({
  param,
  value,
  onChange,
}) => (
  <label style={{ display: 'block', marginBottom: 12 }}>
    <div>{param.name}</div>
    <input
      data-testid={`param-${param.id}`}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

/* ===== EDITOR FACTORY ===== */

const paramEditors: Record<
  Param['type'],
  React.FC<ParamEditorProps>
> = {
  string: StringParamEditor,
};

/* ===== MAIN COMPONENT ===== */

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const initialValues: Record<number, string> = {};

    props.params.forEach((param) => {
      const existing = props.model.paramValues.find(
        (pv) => pv.paramId === param.id
      );
      initialValues[param.id] = existing?.value ?? '';
    });

    this.state = {
      values: initialValues,
    };
  }

  private handleChange = (paramId: number, value: string) => {
    this.setState((prev) => ({
      values: {
        ...prev.values,
        [paramId]: value,
      },
    }));
  };

  public getModel(): Model {
    return {
      ...this.props.model,
      paramValues: this.props.params.map((param) => ({
        paramId: param.id,
        value: this.state.values[param.id] ?? '',
      })),
    };
  }

  render() {
    const { params } = this.props;

    return (
      <div>
        {params.map((param) => {
          const Editor = paramEditors[param.type];

          return (
            <Editor
              key={param.id}
              param={param}
              value={this.state.values[param.id]}
              onChange={(value) =>
                this.handleChange(param.id, value)
              }
            />
          );
        })}
      </div>
    );
  }
}
