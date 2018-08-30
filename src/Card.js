import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { value } = this.props;
    const color = 255 - (2 * value);
    const style = { backgroundColor: `rgb(255, ${color}, ${color})` };

    return (
      <div className="card" style={style}>
        {value}
      </div>
    );
  }
}

export default Card;
