import React from 'react';

export default class Settings extends React.Component {
  render() {
      return (
        <div className="game-settings">
          <input 
            value={this.props.sizeFieldValue}
            onChange={(e) => this.props.onSizeValueChange(e)}/>
          <button
            onClick={() => this.props.onSizeButtonClick()}
            disabled={this.props.sizeFieldValue === this.props.size || !this.props.sizeFieldValue}>
            Set game size
          </button>
        </div>
    );
  }
}