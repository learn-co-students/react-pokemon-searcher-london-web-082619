import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    isFlipped: false
  }

  clickHandler = () => {
    this.setState({
      isFlipped: !this.state.isFlipped
    })
  }
  render() {
    const { sprites, name, stats } = this.props.poke
    const hp = stats.find(stat => stat.name === 'hp')
    return (
      <Card onClick={this.clickHandler} className="card">
        <div>
          <div className="image">
            <img src={this.state.isFlipped === false ? sprites.front : sprites.back} alt="oh no!" />
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
