import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    return (
      <div className="six columns">
        <h4>{this.props.card.id}</h4>
        <h2>{this.props.card.name}</h2>
        <span>
          <b>Level: </b>{this.props.card.level}&nbsp;
          <b>Cost: </b>{this.props.card.cost}&nbsp;
          <b>Power: </b>{this.props.card.power}&nbsp;
          <b>Soul: </b>{this.props.card.soul}&nbsp;
          <b>Color: </b>{this.props.card.color}

        </span>
        <p>{this.props.card.text}</p>
        <br/>
      </div>
    );
  };

}
