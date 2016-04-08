import React, { Component } from 'react';

import Card from './Card'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      cards: [],
      query: ""
    }
    this.handleQueryChange = this.handleQueryChange.bind(this)
  }
  handleQueryChange(event) {
    this.setState({query: event.target.value})
  }

  componentWillMount() {
    fetch('dist/mg.json').then((res) => {
      return res.json()
    }).then((json) => {
      this.setState({cards: json.cards})
    })
  }

  render() {
    let cards = this.state.cards.filter((card) => {
      return card.id.toLowerCase().indexOf(this.state.query) > -1
             || card.name.toLowerCase().indexOf(this.state.query) > -1
    }).map((card) => {
      return (<Card card={card} text={card.text}/>)
    }).reduce((a, b) => {
      if(a[a.length - 1].length < 2) {
        a[a.length - 1].push(b)
      } else {
        a.push([b])
      }

      return a;
    }, [[]]).map((a) => {
      return (
        <div className="row">
          {a}
        </div>
      )
    })

    return (
         <div className="container">
         <div className="row">
           <div className="six columns">
             <label htmlFor="exampleEmailInput">Search</label>
             <input
              type="text"
              value={this.state.query}
              onChange={this.handleQueryChange}
              />
           </div>
        </div>
           {cards}
      </div>
    );
  };

}
