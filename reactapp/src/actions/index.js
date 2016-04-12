export const REQUEST_SET = 'REQUEST_SET'
export const RECEIVE_SET = 'RECEIVE_SET'
export const SELECT_SET = 'SELECT_SET'
export const CHANGE_QUERY = 'CHANGE_QUERY'

export function selectSet(set) {
  return {
    type: SELECT_SET,
    set
  }
}

export function requestSet(set) {
  return {
    type: REQUEST_SET,
    set
  }
}

export function receiveSet(set, cards) {
  return {
    type: RECEIVE_SET,
    set: set,
    cards: cards
  }
}

export function fetchSet(set) {
  return function(dispatch) {
    dispatch(requestSet(set))

    return fetch(set.get('file'))
      .then(response => response.json())
      .then(json => dispatch(receiveSet(set, json.cards)))
  }
}

export function checkSet(state, set) {
  let setState = state.getIn(['sets', set.get('id')])
  if(setState.get('cards')) {
    return false
  } else {
    return !setState.get('loading')
  }
}

export function fetchSetIfNeeded(set) {
  return (dispatch, getState) => {
    if(checkSet(getState(), set)) {
      return dispatch(fetchSet(set))
    } else {
      return Promise.resolve()
    }
  }
}

export function changeQuery(query) {
  return {
    type: CHANGE_QUERY,
    query
  }
}
