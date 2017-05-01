import React from 'react';
import ReactDOM from 'react-dom';
import InputArea from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputArea />, div);
});
