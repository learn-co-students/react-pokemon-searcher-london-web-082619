import React from 'react'
import { Card } from 'semantic-ui-react'
import PokemonImage from "./PokemonImage"

class PokemonCard extends React.Component {
  state = {
    isFlipped: false
  }

  pokemon = this.props.pokemon;

  render() {
    const name = this.pokemon.name.toUpperCase();

    return (
      <Card>
        <div onClick={this.handleClick}>
          <div className="image">
            {this.renderImage()}
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getHP()} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }

  handleClick = () => {
    this.setState(prevState => {
      return {
        isFlipped: !prevState.isFlipped
      }
    })
  }

  renderImage = () => {
    if (this.state.isFlipped) {
      return <PokemonImage url={this.pokemon.sprites.back} />
    } else {
      return <PokemonImage url={this.pokemon.sprites.front} />
    }
  }

  getHP = () => {
    const HPObj = this.pokemon.stats.find(stat => {
      return stat.name === "hp";
    });
    return HPObj.value;
  }
}

export default PokemonCard
