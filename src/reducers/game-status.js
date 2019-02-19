import {
    RUN_GAME,
    PAUSE_GAME,
    END_GAME,
    RESET_GAME
} from "../actions/game-status";

const gameStatusReducer = ( state = RESET_GAME, action ) => {
    switch (action.type) {

        case RUN_GAME:
        case PAUSE_GAME:
        case END_GAME:
        case RESET_GAME:
            return action.type;

        default:
            return state;

    }
}

export default gameStatusReducer;