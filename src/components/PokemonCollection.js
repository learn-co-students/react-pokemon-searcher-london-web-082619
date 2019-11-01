import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {

  // pokemon = this.props.pokemon

  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.props.pokemon.map(poke => <PokemonCard key={poke.id} poke={poke} />)}
      </Card.Group>
    )
  }
}

export default PokemonCollection
