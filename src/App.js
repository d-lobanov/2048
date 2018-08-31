import React, { Component } from 'react';
import Swipeable from 'react-swipeable'
import './App.css';
import Row from './Row';
import {
  debounceTimes,
  generateMap,
  isLost,
  isWin,
  moveElements,
  runCheat
} from './functions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMap: generateMap(),
      finished: false
    };
  }

  componentWillMount() {
    document.ontouchmove = (e) => e.preventDefault();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const direction = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    }[e.keyCode];

    this.move(direction);
  };

  swiped = (e, deltaX, deltaY) => {
    const direction = Math.abs(deltaX) > Math.abs(deltaY)
      ? deltaX > 0 ? 'left' : 'right'
      : deltaY > 0 ? 'up' : 'down';

    this.move(direction);0
  };

  move = (direction) => {
    if (!direction || this.state.finished) {
      return;
    }

    const newMap = moveElements(this.state.gameMap, direction);

    this.setState({ gameMap: newMap });

    const playerWon = isWin(newMap);
    const playerLose = isLost(newMap);

    if (playerWon || playerLose) {
      this.setState({ finished: true });
      setTimeout(() => {
        alert(playerWon ? 'You won' : 'You lose');
        window.location.reload();
      }, 500);
    }
  }

  activateCheat = debounceTimes(() => {
    const gameMap = runCheat(this.state.gameMap);

    this.setState({ gameMap });
  }, 3);

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title" onClick={this.activateCheat}>2048</h1>
        </header>
        <Swipeable className="game-map"
                   trackMouse
                   onSwiped={this.swiped}>
          {this.state.gameMap.map((cards, index) => <Row cards={cards} key={index}/>)}
        </Swipeable>
      </div>
    );
  }
}

export default App;
