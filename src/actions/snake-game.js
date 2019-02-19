export const UPDATE_RABBIT = 'UPDATE_RABBIT';
export const UPDATE_SNAKE = 'UPDATE_SNAKE';
export const SET_DIRECTION = 'SET_DIRECTION';
export const CONSTRUCT_BOARD = 'CONSTRUCT_BOARD';
export const GAME_IS_RESET = 'GAME_IS_RESET';

export const updateRabbit = payload => ({type: UPDATE_RABBIT, payload});
export const updateSnake = payload => ({type: UPDATE_SNAKE, payload});
export const setDirection = payload => ({type: SET_DIRECTION, payload});
export const constructBoard = payload => ({type: CONSTRUCT_BOARD, payload});
export const gameIsReset = () => ({type: GAME_IS_RESET});