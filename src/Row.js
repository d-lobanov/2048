import React, { Component } from 'react';
import Card from './Card';

class Row extends Component {
  render() {
    const cards = this.props.cards.map(card => <Card value={card} key={Math.random()}/>);

    return (
      <div className="row">{cards}</div>
    );
  }
}

export default Row;
