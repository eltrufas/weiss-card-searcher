import React from 'react'


export default (props) => {
  let setComponents = []
  props.sets.forEach((set) => {
    let name = set.get('name')
    let id = set.get('id')

    setComponents.push(
      <label key={id} >
        <input type="checkbox"
          name={ name }
          checked={ set.get('selected') }
          onClick={ () => props.handleSelect(set) }
          />
          <span className='label-body'>
          { name }
          </span>
      </label>
    )
  })

  return (
    <div>
      { setComponents }
    </div>
  )

}
