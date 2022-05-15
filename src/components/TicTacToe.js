import { useState, useEffect } from "react";
import '../App.css';
import { getSymbol } from './utils'
import Box from './Box'
import DimensionControl from './DimensionControl';

const DEFAULT_DIMENSION = 3;
const DEFAULT_BOX_STATE = null;

const createDefaultGameState = (dimension) => {
  const defaultBoxObj = {
    boxState: DEFAULT_BOX_STATE,
    color: false
  };
  const defaultGameState = {
    matrix: [],
    isPlayerOne: true,
    isGameFinished: false,
    showDimensionControl: false,
    dimension: dimension
  };
  
  for (let i = 0; i < dimension; i++) {
    defaultGameState.matrix.push([]);
    for (let j = 0; j < dimension; j++) {
      defaultGameState.matrix[i].push({...defaultBoxObj});
    }
  }
  return defaultGameState;
}

const TicTacToe = props => {
  const [gameState, setGameState] = useState(createDefaultGameState(DEFAULT_DIMENSION));

  useEffect(() => {
    // Creating a deep copy of current matrix to force react to rerender, however, 
    // this will make React to rerender the whole matrix on single cell change
    // since deep copy means newMatrix is a different reference every time.
    let newMatrix = gameState.matrix.map((row) => row.slice());

    if (!gameState.isGameFinished && detectAndMarkWinStrike(newMatrix, gameState.dimension)) {
      setGameState({
        ...gameState,
        matrix: newMatrix,
        isGameFinished: true
      });
    }
  }, [gameState]);

  const boxOnClickHandler = (rowIdx, colIdx) => {
    if (!gameState.isGameFinished && gameState.matrix[rowIdx][colIdx].boxState === DEFAULT_BOX_STATE) {
      setGameState((prevGameState) => {
        // Another deep copy, have potential performance issue on large matrix since it will rerender the whole
        // matrix on single cells changes
        let newMatrix = prevGameState.matrix.map((row) => row.slice());
        newMatrix[rowIdx][colIdx].boxState = prevGameState.isPlayerOne;
        return {
          ...prevGameState,
          matrix: newMatrix,
          isPlayerOne: !prevGameState.isPlayerOne
        }
      });
    }
  }

  const resetDimensionOnClickHandler = (e) => {
    e.preventDefault();
    const newDimension = e.target.elements["dimension-input"].value;
    if (newDimension !== '') {
      setGameState(createDefaultGameState(newDimension));
    }
  }

  const detectAndMarkWinStrike = (matrix, dimension) => {
    // Horizontal
    for (let i = 0; i < dimension; i++) {
      if (matrix[i].reduce((acc, boxObj) => acc && boxObj.boxState !== DEFAULT_BOX_STATE && boxObj.boxState === matrix[i][0].boxState, true)) {
        matrix[i].forEach(boxObj => boxObj.color = true);
        return true;
      }
    }

    // Vertical
    for (let i = 0; i < dimension; i++) {
      let vertical = [];
      for (let j = 0; j < dimension; j++) {
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
    for (let i = 0; i < dimension; i++) {
      diagonal1.push(matrix[i][i]);
      diagonal2.push(matrix[i][dimension - 1 - i]);
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

  const { matrix, isPlayerOne, showDimensionControl, dimension } = gameState;

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-text">
          <div>Tic Tac Toe</div>
          <div>Current Turn: {getSymbol(isPlayerOne)}</div>
        </div>
        <div>
          {matrix.map((row, rowIdx) => {
            return (
              <div key={`${rowIdx}`} className="row">
                  {row.map((boxObj, colIdx) => {
                    return <Box key={`${rowIdx}${colIdx}`}
                      onClickHandler={() => boxOnClickHandler(rowIdx, colIdx)} 
                      boxObj={boxObj} />
                  })}
              </div>
            )
          })}
        </div>
        <div>
          <button onClick={() => setGameState(createDefaultGameState(dimension))}>Restart</button>
          <DimensionControl showDimensionControl={showDimensionControl} dimension={dimension}
            onClickSetDimension={() => setGameState({ ...gameState, showDimensionControl: true })}
            onClickSubmitDimension={(e) => resetDimensionOnClickHandler(e)}
            onClickCancel={() => setGameState({ ...gameState, showDimensionControl: false })}
          />
        </div>
      </header>
    </div>
  )
}

export default TicTacToe;