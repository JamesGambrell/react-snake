import { connect } from 'react-redux';

import React, { Component } from 'react';
import Tile from './tile';
import GROUND_TILES from './sprite-maps/ground-tiles';
import SNAKE_TILES from './sprite-maps/snake-tiles';

import '../board.scss'
import {resetGame, RUN_GAME, runGame} from "../../actions/game-status";
import {constructBoard} from "../../actions/snake-game";

class TileMapContainer extends Component{

    /*data = {
        height:40,
        width: 40,
        tileSize:30,
        tileSets: [
            {
                spriteSheetId: 0,
                img: "ground.png",
                tiles:[
                    {
                        tileId: GROUND_TILES.GRASS_1,
                        offset: `${0 * (-30)}px 0px`
                    },
                    {
                        tileId: GROUND_TILES.GRASS_2,
                        offset: `${1 * (-30)}px 0px`
                    },
                    {
                        tileId: GROUND_TILES.GRASS_3,
                        offset: `${2 * (-30)}px 0px`
                    },
                    {
                        tileId: GROUND_TILES.GRASS_4,
                        offset: `${3 * (-30)}px 0px`
                    },
                    {
                        tileId: GROUND_TILES.STUMP_1,
                        offset: `${4 * (-30)}px 0px`
                    }
                ]
            },
        ]
    };*/

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if(!this.props.data.board){
            this.props.resetBoard(this.generateBoard(this.props.gridWidth, this.props.gridHeight))
        }
    }

    generateBoard(w,h){

        var board_mtx = [];

        for(let y=0; y<h; y++){
            let row = [];
            for(let x=0; x<w; x++){
                row.push({
                    sheet:0,
                    tile: Math.floor(Math.random()*9)
                })
            }
            board_mtx.push(row);
        }
        return board_mtx;
    }

    randomizeRabbit(){
        return {
            x:Math.floor(Math.random() * (this.props.gridWidth / 2) ),
            y:Math.floor(Math.random() * (this.props.gridHeight / 2) ),
            tile: SNAKE_TILES.RABBIT
        };

    }

    renderBoard(board){
        const basis = `${100/this.props.gridHeight}%`;
        return (
            <table className="board">
                {
                    board.map( (row, y) => {
                        return (
                            <tr>
                                {

                                    row.map((cell, x) => {
                                    return <td style={{flexBasis: basis}}>{this.determineCellType(cell, x, y)}</td>
                                })}
                            </tr>
                        )
                    })
                }
            </table>)
    }

    determineCellType(tileInfo, x, y){
        let tileLayers = [];

        let bkgdSheet = this.props.data.spriteSheets[tileInfo.sheet];
        let bkgdTile = bkgdSheet.tiles.find(t => t.tileId == tileInfo.tile);
        let bkgdTileStyle = {
            objectPosition: bkgdTile ? bkgdTile.offset : "0 0"
        };

        tileLayers.push({
            img: bkgdSheet.img,
            offsetStyle: bkgdTileStyle
        });


        let snakeSheet = this.props.data.spriteSheets[1];
        let snake = this.props.data.snake.filter(s => s.x == x && s.y == y).reverse();

        snake.map(snakeSection =>{
            let snakeTile = snakeSheet.tiles.find(t => t.tileId == snakeSection.tile);
            let snakeTileStyle = {
                objectPosition: snakeTile ? snakeTile.offset : "0 0"
            };
            tileLayers.push({
                img: snakeSheet.img,
                offsetStyle: snakeTileStyle
            })
        });

        //Rabbit
        if(this.props.data.rabbit        &&
            this.props.data.rabbit.x == x &&
            this.props.data.rabbit.y == y) {
            tileLayers.push({
                img: snakeSheet.img,
                offsetStyle: {
                    objectPosition: snakeSheet.tiles.find(t => t.tileId == this.props.data.rabbit.tile).offset
                }
            });
        }

        return <Tile layers={tileLayers} />
    }

    handleKeyPress(evt){
        switch(evt.key){
            case "ArrowUp":
            case "w":
            case "W":
                if(this.state.direction != "down") this.setState({direction: "up"});
                break;

            case "ArrowRight":
            case "d":
            case "D":
                if(this.state.direction != "left") this.setState({direction: "right"});
                break;

            case "ArrowDown":
            case "s":
            case "S":
                if(this.state.direction != "up") this.setState({direction: "down"});
                break;

            case "ArrowLeft":
            case "a":
            case "A":
                if(this.state.direction != "right") this.setState({direction: "left"});
                break;
        }
    }

    render(){
        //const board = this.generateBoard(this.props.width, this.props.height);
        return (this.props.data.board &&
            this.renderBoard(this.props.data.board)
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    status: state.gameStatus,
    data: state.gameData
});
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRunGameClick: () => dispatch(runGame(ownProps.status)),
        onResetGameClick: () => dispatch(resetGame(ownProps.status)),
        resetBoard: (payload) => dispatch(constructBoard(payload))
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TileMapContainer);
