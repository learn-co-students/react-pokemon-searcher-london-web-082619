import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
  render() {
    // const hp = stats.find(s => s.name === 'hp').value || 50
    return (
      <Card.Group itemsPerRow={6}>
        {
          this.props.pokemons.map(pokemon => 
            <PokemonCard 
              key={pokemon.id} 
              name={pokemon.name} 
              hp={pokemon.stats.find(s => s.name === 'hp').value || 50}
              image={pokemon.sprites.front}
              imgBack={pokemon.sprites.back}
            />
          )
        }
      </Card.Group>
    )
  }
}

export default PokemonCollection
