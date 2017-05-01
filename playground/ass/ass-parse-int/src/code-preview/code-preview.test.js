import React from 'react';
import ReactDOM from 'react-dom';
import CodePreview from './code-preview';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CodePreview />, div);
});
