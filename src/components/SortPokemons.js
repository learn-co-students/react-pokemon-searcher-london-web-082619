import React, { Component } from 'react'

export default class SortPokemons extends Component {
    render() {
        const {sortPokemons, setSortPokemon} = this.props
        return (
            <div className="ui buttons">
            
            <button onClick={()=> setSortPokemon(false)} className={!sortPokemons ? "ui positive button" : "ui button"}>Default</button>
            <div className="or"></div>
            <button onClick={()=> setSortPokemon(true)} className={sortPokemons ? "ui positive button" : "ui button"}>Sort</button>
            </div>
        )
    }
}
