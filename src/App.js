import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Row from './Row';
import { generateMap, moveValuesLeft, moveValuesRight, putRandomCardOnMap, transposeArray } from './functions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMap: generateMap()
    };
  }

  handleKeyDown = (e) => {
    const callback = {
      37: this.onKeyLeft,
      38: this.onKeyUp,
      39: this.onKeyRight,
      40: this.onKeyDown,
    }[e.keyCode];

    return callback && callback();
  };

  onKeyLeft = () => {
    const newGameMap = putRandomCardOnMap(moveValuesLeft(this.state.gameMap));

    this.setState({ gameMap: newGameMap });
  };

  onKeyUp = () => {
    const newGameMap = putRandomCardOnMap(transposeArray(moveValuesLeft(transposeArray(this.state.gameMap))));

    this.setState({ gameMap: newGameMap });
  };

  onKeyRight = () => {
    const newGameMap = putRandomCardOnMap(moveValuesRight(this.state.gameMap));

    this.setState({ gameMap: newGameMap });
  };

  onKeyDown = () => {
    const newGameMap = putRandomCardOnMap(transposeArray(moveValuesRight(transposeArray(this.state.gameMap))));

    this.setState({ gameMap: newGameMap });
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
