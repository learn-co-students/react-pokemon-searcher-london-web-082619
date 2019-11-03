import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  
  state = {
    showSpriteFront: true
  }

  isHP = (stat) => {
    return stat.name === "hp"
  }

  getHP = stats => {
    let hp = stats.find(this.isHP)
    return hp.value
  }

  handleClick = event => {
    event.preventDefault();
    this.toggleSpriteFrontAndBack()
  }

  toggleSpriteFrontAndBack = () => {
    this.setState({
      showSpriteFront: !this.state.showSpriteFront
    })
  }

  render() {
    return (
      <Card>
        <div onClick={this.handleClick}>
          <div className="image">
            <img src={this.state.showSpriteFront ? this.props.pokemon.sprites.front : this.props.pokemon.sprites.back} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getHP(this.props.pokemon.stats)} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
