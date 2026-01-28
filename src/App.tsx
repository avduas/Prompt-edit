import { ParamEditor, type Param, type Model } from './ParamEditor';
import { useRef } from 'react';

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

function App() {
  const editorRef = useRef<ParamEditor>(null);

  const handleGetModel = () => {
    const result = editorRef.current?.getModel();
    console.log(result);
    alert(JSON.stringify(result, null, 2));
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Param Editor</h1>

      <ParamEditor
        ref={editorRef}
        params={params}
        model={model}
      />

      <button onClick={handleGetModel}>
        Get model
      </button>
    </div>
  );
}

export default App;
