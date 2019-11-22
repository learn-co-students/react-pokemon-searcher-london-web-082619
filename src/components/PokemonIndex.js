import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'
import SortPokemons from './SortPokemons'

class PokemonPage extends React.Component {
  state ={
    pokemons: [],
    query: '',
    isSorted: false
  }

  fetchPokemons = () =>{
    fetch('http://localhost:3000/pokemon').then(res => res.json())
    .then(pokemons => this.setState({pokemons}))
  }

  componentDidMount() {
    this.fetchPokemons()
  }

  setQuery = (e) => this.setState({ query: e.target.value })

  filterPokemon = (pokemons, query) => {
    if (query) return [...pokemons].filter(pokemon => pokemon.name.includes(query))
    return pokemons
    
    
  } 
  
  addPokemon = (pokemon) => {
    // console.log(pokemon)
    fetch('http://localhost:3000/pokemon',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: pokemon.name,
        stats: [{
          value: pokemon.hp,
          name: 'hp'
        }],
        sprites: {
          front: pokemon.frontUrl,
          back: pokemon.backUrl
        }

      })
    }).then(res => res.json()).then(newPokemon => this.setState({pokemons: [...this.state.pokemons, newPokemon]}))
    .catch(error => console.error(error))
  }

  setSortPokemon = (isSorted) =>{
    this.setState({isSorted: isSorted})
  }

  sortPokemons = (pokemons, isSorted) =>{
    if (isSorted) return [...pokemons].sort((a,b) =>{
      return a.name.localeCompare(b.name)
    })
    return pokemons
  }
  render() {
    const sortedPokemons = this.sortPokemons(this.state.pokemons, this.state.isSorted)
    const renderPokemons = this.filterPokemon(sortedPokemons, this.state.query)
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search onChange={this.setQuery} />
        <br />
        <SortPokemons sortPokemons={this.state.isSorted} setSortPokemon={this.setSortPokemon}/>
        <br />
        <PokemonCollection pokemons={renderPokemons}/>
      </Container>
    )
  }
}

export default PokemonPage
