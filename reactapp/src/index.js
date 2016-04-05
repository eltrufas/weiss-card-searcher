import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import json from './bakemono.json'

console.log(json)

ReactDOM.render(<App cards={json.cards} />, document.getElementById('react-root'));
