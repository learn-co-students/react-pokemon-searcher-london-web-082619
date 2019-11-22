import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    isClicked: false
  }
  render() {
    const {name, hp, image, imgBack} = this.props
    return (
      <Card>
        <div onClick={() => this.setState({isClicked: !this.state.isClicked})} >
          <div className="image">
            <img src={!this.state.isClicked ? image : imgBack} alt={name} />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
