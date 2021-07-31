import React from 'react'

const Hello = (props) => {
  const items = [];
  for (let i = 0; i < parseInt(props.loopCount); i++ ){
    items.push(
      <p>Hello {props.name}</p>
    )
  }
  return (
    <div>
      {items}
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George"/>
      <Hello name="Daisy"/>
      <Hello loopCount="5"/>
    </div>
  )
}

Hello.defaultProps = {
  name: "Tobias",
  loopCount: 1,
}

export default App

