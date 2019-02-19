export const RUN_GAME = 'RUN_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const END_GAME = 'END_GAME';
export const RESET_GAME = 'RESET_GAME';

export const runGame = payload => ({type: RUN_GAME, payload});
export const pauseGame = payload => ({type: PAUSE_GAME, payload});
export const endGame = payload => ({type: END_GAME, payload});
export const resetGame = payload => ({type: RESET_GAME, payload});
