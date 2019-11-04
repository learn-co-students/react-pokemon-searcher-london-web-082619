import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  
  state = {
    flipped: false
  }

  renderSprite = () => {
    if (this.state.flipped){return this.props.sprites.back}
    return this.props.sprites.front
  }

  flipCard = () => {
    this.setState({
      flipped: !this.state.flipped
    })
  }

  render() {
    const {height, weight, name, abilities, moves, stats, types, sprites} = this.props
    const hp = stats.find(stat => stat.name === 'hp')
    return (
      <Card onClick={this.flipCard}>
        <div>
          <div className="image">
            <img src={this.renderSprite()} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp.value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
