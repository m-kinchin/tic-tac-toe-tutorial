import React from 'react';
import { connect } from 'react-redux';

import '../styles/settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      size: props.size
    };
  }

  render() {
    return (
      <div className="game-settings">
        <input 
          type="number"
          min="2"
          max="10"
          step="1"
          value={this.state.size}
          onChange = {(e) => { this.setState({size: Number(e.target.value)}); }}
        />
        <button
          onClick={() => this.props.onSizeChange(this.state.size)}
        >
          Set game size
        </button>
      </div>
    );
  }
}

export default Settings;
