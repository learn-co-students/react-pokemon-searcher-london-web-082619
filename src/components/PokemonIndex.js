import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import API from "../adapters/API";

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchTerm: ""
  }

  componentDidMount() {
    API.getAllPokemon()
      .then(pokemon => this.setState({
        pokemon: pokemon
      }));
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} value={this.state.value} />
        <br />
        <PokemonCollection pokemon={this.filterPokemon()} />
      </div>
    )
  }

  handleSearchChange = (event, { value }) => {
    this.setState({
      searchTerm: value
    });
  }

  filterPokemon = () => {
    const regex = new RegExp(this.state.searchTerm);
    return this.state.pokemon.filter(pokemon => {
      return pokemon.name.match(regex)
    });
  }

  addPokemon = newPokemon => {
    API.postPokemon(newPokemon)
      .then(pokemon => this.setState(prevState => {
        return {
          pokemon: [...prevState.pokemon, pokemon]
        }
      }));
  }

}

export default PokemonPage
