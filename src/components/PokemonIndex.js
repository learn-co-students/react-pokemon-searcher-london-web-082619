import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const BASE_URL = "http://localhost:3000";
const POKEMON_URL = `${BASE_URL}/pokemon`;

class PokemonIndex extends React.Component {

  state = {
    pokemon: [], 
    searchTerm: ""
  }

  componentDidMount(){
    this.getPokemon().then(this.updateStateWithPokemon)
  }

  getPokemon = () => {
    return fetch(POKEMON_URL).then(resp => resp.json())
  }

  updateStateWithPokemon = (pokemon) => {
    this.setState({
      pokemon: pokemon
    })
  }

  updateStateWithNewPokemon = (newPokemon) => {
    this.setState({
      pokemon: [
        ...this.state.pokemon,
        newPokemon
      ]
    })
  }

  handleChange = (event, {value}) => {
    this.setState({
      searchTerm: value
    })
  }

  filterPokemonByName = () => {
    return this.state.pokemon.filter(pokemon => {
      return pokemon.name.includes(this.state.searchTerm)
    })
  }

  postPokemon = (newPokemon) => {
    let configObject = this.generateConfigObject("POST", newPokemon)
    fetch(POKEMON_URL, configObject).then(resp => resp.json()).then(this.updateStateWithNewPokemon)
  }

  generateConfigObject = (method, data) => {
    return {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data)
    }
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm postPokemon={this.postPokemon} />
        <br />
        <Search onSearchChange={_.debounce(this.handleChange, 500)} showNoResults={false} value={this.state.searchTerm} />
        <br />
        <PokemonCollection pokemon={ this.state.searchTerm == "" ? this.state.pokemon : this.filterPokemonByName() }/>
      </div>
    )
  }
}

export default PokemonIndex
