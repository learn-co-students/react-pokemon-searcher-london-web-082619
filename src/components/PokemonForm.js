import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      front: '',
      back: ''
    }
  }


  handleChange = (e) => {
    e.preventDefault()

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    const newPokemon = this.state
    this.props.addPokemon(newPokemon)
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" value={this.state.name} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" value={this.state.hp} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="front" value={this.state.front} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="back" value={this.state.back} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
