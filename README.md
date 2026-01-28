# ParamEditor - React Component for Editing Model Parameters

This project implements a React TypeScript component for editing model parameters based on a list of `Param[]` and an initial `Model`. The component supports only string-type parameters but is designed to be easily extensible for other types.

## Features

- Displays all parameters immediately and allows editing
- Initializes values from the provided model's `paramValues`
- Provides a `getModel()` method to retrieve the full updated `Model` structure
- Extensible architecture: easily add new parameter types by extending the `paramEditors` object
- Fully typed with TypeScript
- Unit tests with Vitest and React Testing Library

## Installation and Running

```bash
npm install
npm test
npm run dev
```

## Test Output

```
 RUN  v4.0.18 /path/to/project

 ✓ src/ParamEditor.test.tsx (3 tests) 68ms
   ✓ ParamEditor (3)
     ✓ renders fields from params 46ms
     ✓ initializes values from model 5ms
     ✓ getModel returns updated model 14ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  17:41:23
   Duration  2.31s (transform 83ms, setup 266ms, import 232ms, tests 68ms, environment 1.44s)
```

## Project Structure

- `src/ParamEditor.tsx`: Main component file with all types and editors
- `src/ParamEditor.test.tsx`: Unit tests
- `src/App.tsx`: Example usage (can be modified for demo)

## Usage Example

```tsx
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

const editorRef = React.createRef<ParamEditor>();

// In render
<ParamEditor ref={editorRef} params={params} model={model} />

// To get updated model
const updatedModel = editorRef.current?.getModel();
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
