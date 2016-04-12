import { combineReducers } from 'redux-immutable'
import setList from './sets'
import { Map, List, fromJS } from 'immutable'
import { SELECT_SET, REQUEST_SET, RECEIVE_SET, CHANGE_QUERY } from '../actions'

function initialSets(sets) {
  let state = {}

  sets.forEach((set, index) => {
    state[index] = Object.assign({}, set, {
      id: index.toString(),
      loading: false,
      selected: false
    })
  })

  return fromJS(state)
}

function sets(state=initialSets(setList), action) {
  switch(action.type) {
  case SELECT_SET:
    return state.updateIn([action.set.get('id'), 'selected'], value => !value)
  case REQUEST_SET:
    return state.setIn([action.set.get('id'), 'loading'], true)
  case RECEIVE_SET:
    return state.setIn([action.set.get('id'), 'loading'], false)
      .setIn([action.set.get('id'), 'cards'], fromJS(action.cards))
  default:
    return state
  }
}

function query(state="", action) {
  switch (action.type) {
  case CHANGE_QUERY:
    return action.query
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  sets,
  query
})

export default rootReducer
