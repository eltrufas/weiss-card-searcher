import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    return (
      <div className="row">
        <h4>{this.props.card.get('id')}</h4>
        <h2>{this.props.card.get('name')}</h2>
        <h4>{this.props.card.get('weeb_name')}</h4>
        <span>
          <b>Level: </b>{this.props.card.get('level')}&nbsp;
          <b>Cost: </b>{this.props.card.get('cost')}&nbsp;
          <b>Power: </b>{this.props.card.get('power')}&nbsp;
          <b>Soul: </b>{this.props.card.get('soul')}&nbsp;
          <b>Color: </b>{this.props.card.get('color')}

        </span>
        <p>{this.props.card.get('text')}</p>
        <br/>
      </div>
    );
  };

}
