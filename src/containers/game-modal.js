import { connect } from "react-redux";
import {
    runGame,
    resetGame
} from "../actions/game-status";

import GameModal from "../components/game-modal";

const mapStateToProps = (state, ownProps) => ({status: state.gameStatus});
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRunGameClick: () => dispatch(runGame(ownProps.status)),
        onResetGameClick: () => dispatch(resetGame(ownProps.status)),
    }
};

const GameModalContainer = connect(mapStateToProps, mapDispatchToProps)(GameModal);

export default GameModalContainer;