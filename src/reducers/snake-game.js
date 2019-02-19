import {
    UPDATE_RABBIT,
    UPDATE_SNAKE,
    SET_DIRECTION,
    CONSTRUCT_BOARD,
    GAME_IS_RESET
} from "../actions/snake-game";

import { KEYPRESS } from "../actions/game-input";

import {
     RUN_GAME
} from "../actions/game-status";
import GROUND_TILES from "../components/tile-map/sprite-maps/ground-tiles";
import SNAKE_TILES from "../components/tile-map/sprite-maps/snake-tiles";

const initialState = {
    isReset: true,
    board: null,
    snake: null,
    rabbit: null,
    gridHeight: 16,
    gridWidth: 16,
    direction: "up",
    spriteSheets: [GROUND_TILES, SNAKE_TILES]
};

const snakeGameReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case GAME_IS_RESET:
            return Object.assign({}, state, {
                isReset: true
            });
        case RUN_GAME:
            return Object.assign({}, state, {
                isReset: false
            });
        case UPDATE_RABBIT:
            return Object.assign({}, state, {
                rabbit: action.payload
            });
        case UPDATE_SNAKE:
            return Object.assign({}, state, {
                snake: action.payload
            });
        case SET_DIRECTION:
            return Object.assign({}, state, {
                direction: action.payload
            });
        case CONSTRUCT_BOARD:
            return Object.assign({}, state, {
                board: action.payload
            });
        case KEYPRESS:
            switch(action.payload){
                case "up":
                    if(state.direction == "down") action.payload= "down";
                    break;
                case "right":
                    if(state.direction == "left") action.payload= "left";
                    break;

                case "down":
                    if(state.direction == "up") action.payload= "up";
                    break;

                case "left":
                    if(state.direction == "right") action.payload= "right";
                    break;

                default:
                    action.payload = state.direction;
                    break;
            }
            return Object.assign({}, state, {
                direction: action.payload,
            });

        default:
            return state;

    }
}

export default snakeGameReducer;