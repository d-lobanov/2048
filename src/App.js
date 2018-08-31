import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Row from './Row';
import {
  generateMap,
  isGameFinished,
  moveElements
} from './functions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMap: generateMap()
    };
  }

  handleKeyDown = (e) => {
    const direction = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    }[e.keyCode];

    if (!direction) {
      return;
    }

    const newMap = moveElements(this.state.gameMap, direction);

    this.setState({ gameMap: newMap });

    if (isGameFinished(newMap)) {
      alert('Game finished');
    }
  };

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">2048</h1>
        </header>
        <div className="game-map">
          {this.state.gameMap.map(cards => <Row cards={cards} key={Math.random()}/>)}
        </div>
      </div>
    );
  }
}

export default App;
