import React from 'react';
import '../App.css';
import { getSymbol } from './utils'
import Box from './Box'

const DEFAULT_DIMENSION = 7;
const DEFAULT_BOX_STATE = null;
const DEFAULT_BOX_OBJ = {
  boxState: DEFAULT_BOX_STATE,
  color: false
};
const DEFAULT_GAME_STATE = {
  matrix: [],
  isPlayerOne: true,
  isGameFinished: false
};

for (let i = 0; i < DEFAULT_DIMENSION; i++) {
  DEFAULT_GAME_STATE.matrix.push([]);
  for (let j = 0; j < DEFAULT_DIMENSION; j++) {
    DEFAULT_GAME_STATE.matrix[i].push({...DEFAULT_BOX_OBJ});
  }
}

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
  }

  componentDidUpdate(prevProps, prevState) {
    let newMatrix = prevState.matrix.map((row) => row.slice());
    let hasWinStrike = this.detectAndMarkWinStrike(newMatrix);
    if (!prevState.isGameFinished && hasWinStrike) {
      this.setState({
        matrix: newMatrix,
        isGameFinished: true
      });
    }
  }

  boxOnClickHandler(rowIdx, colIdx) {
    if (!this.state.isGameFinished && this.state.matrix[rowIdx][colIdx].boxState === DEFAULT_BOX_STATE) {
      this.setState((previousState, props) => {
        let newMatrix = previousState.matrix.map((row) => row.slice());
        newMatrix[rowIdx][colIdx].boxState = previousState.isPlayerOne;
        return {
          matrix: newMatrix,
          isPlayerOne: !previousState.isPlayerOne
        }
      });
    }
  }

  restartOnClickHandler() {
    this.setState(JSON.parse(JSON.stringify(DEFAULT_GAME_STATE)));
  }

  detectAndMarkWinStrike(matrix) {
    // Horizontal
    for (let i = 0; i < DEFAULT_DIMENSION; i++) {
      if (matrix[i].reduce((acc, boxObj) => acc && boxObj.boxState !== DEFAULT_BOX_STATE && boxObj.boxState === matrix[i][0].boxState, true)) {
        matrix[i].forEach(boxObj => boxObj.color = true);
        return true;
      }
    }

    // Vertical
    for (let i = 0; i < DEFAULT_DIMENSION; i++) {
      let vertical = [];
      for (let j = 0; j < DEFAULT_DIMENSION; j++) {
        vertical.push(matrix[j][i]);
      }
      if (vertical.every(boxObj => boxObj.boxState !== DEFAULT_BOX_STATE && boxObj.boxState === vertical[0].boxState)) {
        vertical.forEach(boxObj => boxObj.color = true);
        return true;
      }
    }

    // Diagonal
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < DEFAULT_DIMENSION; i++) {
      diagonal1.push(matrix[i][i]);
      diagonal2.push(matrix[i][DEFAULT_DIMENSION - 1 - i]);
    }
    if (diagonal1.every(boxObj => boxObj.boxState !== DEFAULT_BOX_STATE && boxObj.boxState === diagonal1[0].boxState)) {
      diagonal1.forEach(boxObj => boxObj.color = true);
      return true;
    }
    if (diagonal2.every(boxObj => boxObj.boxState !== DEFAULT_BOX_STATE && boxObj.boxState === diagonal2[0].boxState)) {
      diagonal2.forEach(boxObj => boxObj.color = true);
      return true;
    }

    return false;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-text">
            <div>Tic Tac Toe</div>
            <div>Current Turn: {getSymbol(this.state.isPlayerOne)}</div>
          </div>
          <div>
            {this.state.matrix.map((row, rowIdx) => {
              return (
                <div className="row">
                    {row.map((boxObj, colIdx) => {
                      return <Box
                        onClickHandler={this.boxOnClickHandler.bind(this, rowIdx, colIdx)} 
                        boxObj={boxObj} />
                    })}
                </div>
              )
            })}
          </div>
          <div><button onClick={this.restartOnClickHandler.bind(this)}>Restart</button></div>
        </header>
      </div>
    )
  };
}

export default TicTacToe;