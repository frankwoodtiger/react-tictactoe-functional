import React from 'react';
import '../App.css';
import { getSymbol } from './utils'
import Box from './Box'

const DEFAULT_DIMENSION = 3;
const DEFAULT_BOX_STATE = null;
const DEFAULT_BOX_OBJ = {
  boxState: DEFAULT_BOX_STATE,
  color: false
};
const DEFAULT_GAME_STATE = {
  matrix: [],
  isPlayerOne: true,
  markStrike: false
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
    if (this.detectWinStrike() && !prevState.markStrike) {
      this.setState((previousState, props) => {
        let newMatrix = previousState.matrix.map((row) => row.slice());
        this.markWinStrike(newMatrix);
        return {
          matrix: newMatrix, 
          markStrike: !prevState.markStrike
        }
      });
    }
  }

  boxOnClickHandler(rowIdx, colIdx) {
    if (!this.isGameFinished() && this.state.matrix[rowIdx][colIdx].boxState === DEFAULT_BOX_STATE) {
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

  detectWinStrike() {
    // Horizontal
    for (let i = 0; i < DEFAULT_DIMENSION; i++) {
      if (this.state.matrix[i].reduce((acc, boxObj) => acc && boxObj.boxState !== DEFAULT_BOX_STATE && boxObj.boxState === this.state.matrix[i][0].boxState, true)) {
        return true;
      }
    }
    
    // Vertical
    for (let i = 0; i < DEFAULT_DIMENSION; i++) {
      let vertical = [];
      for (let j = 0; j < DEFAULT_DIMENSION; j++) {
        vertical.push(this.state.matrix[j][i].boxState);
      }
      if (vertical.every(boxState => boxState !== DEFAULT_BOX_STATE && boxState === vertical[0])) {
        return true;
      }
    }

    // Diagonal
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < DEFAULT_DIMENSION; i++) {
      diagonal1.push(this.state.matrix[i][i].boxState);
      diagonal2.push(this.state.matrix[i][DEFAULT_DIMENSION - 1 - i].boxState);
    }
    if (diagonal1.every(boxState => boxState !== DEFAULT_BOX_STATE && boxState === diagonal1[0]) ||
      diagonal2.every(boxState => boxState !== DEFAULT_BOX_STATE && boxState === diagonal2[0])) {
        return true;
    }

    return false;
  }

  markWinStrike(matrix) {
    // Horizontal
    for (let i = 0; i < DEFAULT_DIMENSION; i++) {
      if (matrix[i].reduce((acc, boxObj) => acc && boxObj.boxState !== DEFAULT_BOX_STATE && boxObj.boxState === matrix[i][0].boxState, true)) {
        matrix[i].forEach(boxObj => boxObj.color = true);
        return;
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
        return;
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
      return;
    }
    if (diagonal2.every(boxObj => boxObj.boxState !== DEFAULT_BOX_STATE && boxObj.boxState === diagonal2[0].boxState)) {
      diagonal2.forEach(boxObj => boxObj.color = true);
      return;
    }

    return;
  }

  isGameFinished() {
    return this.state.matrix.every(row => row.every(boxObj => boxObj.boxState !== DEFAULT_BOX_OBJ.boxState)) || this.detectWinStrike();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>Tic Tac Toe</div>
          <div>Current Turn: {getSymbol(this.state.isPlayerOne)}</div>
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