import { combineReducers } from "redux";
import gameStatusReducer from './game-status';
import snakeGameReducer from './snake-game';

export default combineReducers({
    gameStatus: gameStatusReducer,
    gameData: snakeGameReducer
});