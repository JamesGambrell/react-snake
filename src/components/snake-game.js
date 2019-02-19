import React, { Component } from 'react';
import { connect } from 'react-redux';

import {pauseGame, RUN_GAME, RESET_GAME} from "../actions/game-status";
import { keyPress } from "../actions/game-input";
import {
    updateRabbit,
    updateSnake,
    gameIsReset
} from "../actions/snake-game";

import TileMap from "./tile-map/tile-map";
import GameModalContainer from "../containers/game-modal";
import SNAKE_TILES from "./tile-map/sprite-maps/snake-tiles";

import './snake-game.scss';

class SnakeGame extends Component {

    componentDidMount(){
        if(!this.props.data.rabbit) {
            this.props.onUpdateRabbit(this.randomizeRabbit());
        }
        if(!this.props.data.snake) {
            this.props.onUpdateSnake(this.buildSnake());
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.status == RUN_GAME && !this.interval) {
            this.interval = setInterval(() => this.updateSnake(this.props.data.direction), 100);
            window.addEventListener("keydown", this.props.onKeyPressChange.bind(this));
        } else if (nextProps.status != RUN_GAME && this.interval){
            clearInterval(this.interval);
            delete this.interval;
            window.removeEventListener("keydown", this.props.onKeyPressChange.bind(this));
        }

        if(nextProps.status == RESET_GAME && !this.props.data.isReset){
            this.props.onUpdateSnake(this.buildSnake());
            this.props.onUpdateRabbit(this.randomizeRabbit());
            this.props.onGameIsReset();
        }
    }

    randomizeRabbit(){
        return {
            x:Math.floor(Math.random() * (this.props.data.gridWidth / 2) ),
            y:Math.floor(Math.random() * (this.props.data.gridHeight / 2) ),
            tile: SNAKE_TILES.RABBIT
        };

    }

    buildSnake(length=3){
        let snake = [];
        let posX = Math.floor(this.props.data.gridWidth/2);
        let posY = Math.floor(this.props.data.gridHeight/2);

        for(let l=0; l<length; l++){
            snake.push({
                x: posX,
                y: posY+l,
                orient: "up",
                tile: l==0 ? SNAKE_TILES.HEAD_UP : l==length-1 ? SNAKE_TILES.TAIL_UP : SNAKE_TILES.BODY_UP_DOWN
            })
        }
        return snake
    }

    updateSnake(direction){
        let updatedSnake = [...this.props.data.snake];
        updatedSnake.pop();

        /*do{
            direction = ["up", "right", "down", "left"][Math.floor(Math.random()*4)];
        } while ((updatedSnake[0].orient == "up" && direction == "down")    ||
        (updatedSnake[0].orient == "down" && direction == "up")     ||
        (updatedSnake[0].orient == "right" && direction == "left")  ||
        (updatedSnake[0].orient == "left" && direction == "right" ));*/


        let snakeHead = {
            x: updatedSnake[0].x + ( direction == "left" ? -1 : direction == "right" ? 1 : 0 ),
            y: updatedSnake[0].y + ( direction == "up" ? -1 : direction == "down" ? 1 : 0 ),
            orient: direction
        };

        //overflow check
        snakeHead.x = (snakeHead.x >= this.props.data.gridWidth) ? 0 : (snakeHead.x < 0) ? this.props.data.gridWidth-1 : snakeHead.x;
        snakeHead.y = (snakeHead.y >= this.props.data.gridHeight) ? 0 : (snakeHead.y < 0) ? this.props.data.gridHeight-1 : snakeHead.y;

        snakeHead.tile = SNAKE_TILES[`HEAD_${direction.toUpperCase()}`];

        if(updatedSnake[0].tile != SNAKE_TILES.BODY_FULL) {
            if (direction != updatedSnake[0].orient) {
                if ((updatedSnake[0].orient == "right" && direction == "down") ||
                    (updatedSnake[0].orient == "up" && direction == "left")) {

                    updatedSnake[0].tile = SNAKE_TILES.BODY_LEFT_DOWN;

                } else if ((updatedSnake[0].orient == "down" && direction == "left") ||
                    (updatedSnake[0].orient == "right" && direction == "up")) {

                    updatedSnake[0].tile = SNAKE_TILES.BODY_LEFT_UP;

                } else if ((updatedSnake[0].orient == "down" && direction == "right") ||
                    (updatedSnake[0].orient == "left" && direction == "up")) {

                    updatedSnake[0].tile = SNAKE_TILES.BODY_UP_RIGHT;

                } else if ((updatedSnake[0].orient == "up" && direction == "right") ||
                    (updatedSnake[0].orient == "left" && direction == "down")) {

                    updatedSnake[0].tile = SNAKE_TILES.BODY_DOWN_RIGHT;
                }
            } else if ((updatedSnake[0].orient == "up" && direction == "up") ||
                (updatedSnake[0].orient == "down" && direction == "down")) {

                updatedSnake[0].tile = SNAKE_TILES.BODY_UP_DOWN;

            } else if ((updatedSnake[0].orient == "left" && direction == "left") ||
                (updatedSnake[0].orient == "right" && direction == "right")) {

                updatedSnake[0].tile = SNAKE_TILES.BODY_LEFT_RIGHT;

            }
        }

        //if(updatedSnake)
        updatedSnake[updatedSnake.length-1].tile = SNAKE_TILES[`TAIL_${updatedSnake[updatedSnake.length-2].orient.toUpperCase()}`];

        updatedSnake.unshift(snakeHead);

        if(snakeHead.x == this.props.data.rabbit.x &&
            snakeHead.y == this.props.data.rabbit.y){
            updatedSnake[0].tile = SNAKE_TILES.BODY_FULL;
            updatedSnake.push(updatedSnake[updatedSnake.length-1]);
            updatedSnake[updatedSnake.length-2].tile -= 4;

            //this.state.audio.eat.play();
            this.props.onUpdateRabbit(this.randomizeRabbit());
        }

        this.props.onUpdateSnake(updatedSnake);
    }

    render(){
        return(
            <div className="snake-game">
                <h1>Snake Game</h1>
                <div>Tile Based Animations in the DOM</div>

                {<div className="game-container">
                    <TileMap gridHeight={this.props.data.gridHeight}
                             gridWidth={this.props.data.gridWidth}/>
                    {this.props.status !== RUN_GAME &&
                    <GameModalContainer/>
                    }
                </div>}
                <button onClick={this.props.onPauseGameClick}>Pause Game</button>
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) => ({
    status: state.gameStatus,
    data: state.gameData
});
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onPauseGameClick: () => dispatch(pauseGame(ownProps.status)),
        onKeyPressChange: (evt) => dispatch(keyPress(evt)),
        onUpdateRabbit: (payload) => dispatch(updateRabbit(payload)),
        onUpdateSnake: (payload) => dispatch(updateSnake(payload)),
        onGameIsReset: () => dispatch(gameIsReset())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SnakeGame); ;
