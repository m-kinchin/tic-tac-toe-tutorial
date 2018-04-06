import React from 'react';

export default class Settings extends React.Component {

  onSizeButtonClick = () => {
    this.setState({
      size: this.state.sizeFieldValue,
      history: [{
        boardState: Array(this.state.sizeFieldValue*this.state.sizeFieldValue).fill({value: null, className: "cell"}),
        xIsNext: true,
        win: false,
        winner: undefined
      }]
    });
  }

  onSizeValueChange = (e) => {
    this.setState({
      sizeFieldValue: Number(e.target.value)
    });
  }

  onOrderDirectionChange = () => {
    this.setState({
      movesSortDesc: !this.state.movesSortDesc,
    });
  }

  render() {
      return (
        <div className="game-settings">
          <input 
            value={this.props.sizeFieldValue}
            onChange={(e) => this.onSizeValueChange(e)}/>
          <button
            onClick={() => this.onSizeButtonClick()}
            disabled={this.props.sizeFieldValue === this.props.size || !this.props.sizeFieldValue}>
            Set game size
          </button>
          <button
            onClick={() => this.onOrderDirectionChange()}>
            Reorder
          </button>
        </div>
    );
  }
}
