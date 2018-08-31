import React, { Component } from 'react';
import Card from './Card';

class Row extends Component {
  render() {
    const cards = this.props.cards.map((card, index) => <Card value={card} key={index}/>);

    return (
      <div className="row">{cards}</div>
    );
  }
}

export default Row;
