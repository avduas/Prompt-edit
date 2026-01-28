import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ParamEditor, type Param, type Model } from './ParamEditor';

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
  colors: [],
};

describe('ParamEditor', () => {
  test('renders fields from params', () => {
    render(<ParamEditor params={params} model={model} />);

    expect(screen.getByTestId('param-1')).toBeInTheDocument();
    expect(screen.getByTestId('param-2')).toBeInTheDocument();
  });

  test('initializes values from model', () => {
    render(<ParamEditor params={params} model={model} />);

    expect(screen.getByTestId('param-1')).toHaveValue('повседневное');
    expect(screen.getByTestId('param-2')).toHaveValue('макси');
  });

  test('getModel returns updated model', () => {
    const ref = React.createRef<ParamEditor>();

    render(<ParamEditor ref={ref} params={params} model={model} />);

    fireEvent.change(screen.getByTestId('param-1'), {
      target: { value: 'вечернее' },
    });

    const result = ref.current!.getModel();

    expect(result.paramValues).toEqual([
      { paramId: 1, value: 'вечернее' },
      { paramId: 2, value: 'макси' },
    ]);
  });
});
