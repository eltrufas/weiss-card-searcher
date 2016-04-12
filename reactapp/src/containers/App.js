import React from 'react'
import { connect } from 'react-redux'
import { selectSet, fetchSetIfNeeded, changeQuery } from '../actions'
import SetSelector from '../components/SetSelector'
import Card from '../components/Card'
import { List } from 'immutable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
  }

  handleSelect(set) {
    this.props.dispatch(fetchSetIfNeeded(set))
    this.props.dispatch(selectSet(set))
  }

  handleQueryChange(event) {
    this.props.dispatch(changeQuery(event.target.value))
  }

  render() {
    let activeCards = this.props.cards.map((card) => {
      return (
        <Card key={card.get('id')} card={card}/>
      )
    })

    return (
      <div className="container">
        <div className="row" style={styles.topRow}>
          <div className="four columns" style={{paddingTop:'10px'}}>
            <label>Search</label>
            <input
             type="text"
             value={this.props.query}
             onChange={this.handleQueryChange}
             />
          </div>
          <div className='four columns' style={{paddingTop:'7px'}}>
            <SetSelector sets={this.props.sets} handleSelect={this.handleSelect}/>
          </div>
          <div className='four columns'>
            <img src="dist/shinobu.png" alt="kakaka" style={{height: '120px', width: 'auto', marginBottom: "-7px"}}/>
          </div>
       </div>
       { activeCards }
   </div>
    )
  }
}

function mapStateToProps(state) {
  let activeCards = state.get('sets').reduce((cards, set) => {
    if(set.get('selected')) {
      return cards.concat(set.get('cards'))
    } else return cards
  }, List([])).filter((card) => {
    if(card) {
      let lower = state.get('query').toLowerCase()
      return card.get('id').toLowerCase().indexOf(lower) > -1
             || card.get('name').toLowerCase().indexOf(lower) > -1
    }
  })

  return { sets: state.get('sets'),
           query: state.get('query'),
           cards: activeCards
         }
}

let styles = {
  topRow: {
    borderBottom: '1px solid black',
    marginBottom: '50px',
  }

}

export default connect(mapStateToProps)(App)
