import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
const POKEMONURL = 'http://localhost:3000/pokemon'

const configObj = (type, body = undefined) => {
  let object = {
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  return object
}

class PokemonPage extends React.Component {

  state = {
    searchTerm: "",
    pokemon: []
  }

  getPokemon = () => {
    fetch(POKEMONURL)
      .then(resp => resp.json())
      .then(pokemon => this.setState({ pokemon }))
  }

  addPokemon = (newPokemon) => {
    let newPoke = {
      name: newPokemon.name,
      stats: [{
        name: "hp",
        value: newPokemon.hp
      }],
      sprites: {
        front: newPokemon.front,
        back: newPokemon.back
      }
    }

    fetch(POKEMONURL, configObj('POST', newPoke))
      .then(resp => resp.json())
      .then(newPokemon => {
        const pokemonArray = [...this.state.pokemon]
        pokemonArray.unshift(newPokemon)
        this.setState({
          pokemon: pokemonArray
        })
      })
  }

  onSearchChange = (e) => {
    console.log(e.target.value)
    const searchTerm = (e.target.value)
    this.setState({
      searchTerm
    })
  }

  handleSearchChange = e => {
    e.persist()
    this.func = this.func || _.debounce(this.onSearchChange, 500)
    this.func(e)
  }

  filterPokeMon = () => {
    if (this.state.searchTerm === "") return this.state.pokemon
    else return this.state.pokemon.filter(pokemon => pokemon.name.includes(this.state.searchTerm))
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search onSearchChange={this.handleSearchChange} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.filterPokeMon()} />
      </div>
    )
  }

  componentDidMount() {
    this.getPokemon()
  }
}

export default PokemonPage
