import React from 'react';
import Board from "./Board";
import isGameOver from "../utils/winner";

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.initialSquares = Array(9).fill(null);
        this.state = {
            squares: [...this.initialSquares],
            isX: true
        }
    }

    handleClick(i) {
        const squares = [...this.state.squares];

        if( squares[i] || isGameOver(squares) ) {
            return;
        }

        squares[i] = this.state.isX ? 'X' : '0';
        this.setState({
            squares: squares,
            isX: !this.state.isX
        });
    }

    resetGame() {
        this.setState({
           squares: [...this.initialSquares],
           isX: true
        });
        console.log(this.initialSquares);
    }

    render() {

        const winner = isGameOver(this.state.squares);
        let status;

        if(winner) {
            status = 'Vencedor: ' + winner
        } else {
            status = 'Próximo jogador: ' + (this.state.isX ? 'X' : '0');
        }

        return(
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} onClick={i => this.handleClick(i)} />
                    <button onClick={() => this.resetGame()}>Limpar</button>
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                </div>
            </div>
        );
    }

}