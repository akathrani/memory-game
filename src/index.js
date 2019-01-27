import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './header.js';
import GameBoard from './gameBoard.js';

ReactDOM.render(<Header />, document.getElementById('pt'));
ReactDOM.render(<GameBoard />, document.getElementById('deck'));