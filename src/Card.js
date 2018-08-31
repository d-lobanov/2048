import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { value } = this.props;
    const color = value ? 255 - (15 * Math.log2(value)) : 255;
    const style = { backgroundColor: `rgb(255, ${color}, ${color})` };

    return (
      <div className="card" style={style}>
        {value}
      </div>
    );
  }
}

export default Card;
