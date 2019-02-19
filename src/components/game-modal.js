import React, {Component} from 'react';
import PropTypes from "prop-types";

import {
    PAUSE_GAME,
    END_GAME,
    RESET_GAME
} from "../actions/game-status";

import './game-modal.scss';

export default class GameModal extends Component{
    static propTypes = {
        onRunGameClick: PropTypes.func.isRequired,
        onResetGameClick: PropTypes.func.isRequired,
        status: PropTypes.string.isRequired
    };

    renderContent(){
       switch(this.props.status) {
           case RESET_GAME:
               return (
                   <React.Fragment>
                       <h2>SNAKES!!!!!!</h2>
                       <div>UP: [UP] or W</div>
                       <div>RIGHT: [RIGHT] or D</div>
                       <div>DOWN: [DOWN] or S</div>
                       <div>LEFT: [LEFT] or A</div>
                       <button onClick={this.props.onRunGameClick}>Start Game</button>
                   </React.Fragment>
               );

           case PAUSE_GAME:
               return (
                   <React.Fragment>
                       <h2>SNAKES!!!!!!</h2>
                       <p>Game Paused</p>
                       <button onClick={this.props.onRunGameClick}>Resume Game</button>
                       <button onClick={this.props.onResetGameClick}>Restart Game</button>
                   </React.Fragment>
               );

           case END_GAME:
               return (
                   <React.Fragment>
                       <h2>SNAKES!!!!!!</h2>
                       <p>You have Died!!</p>
                       <button onClick={this.props.onResetGameClick}>Restart Game</button>
                   </React.Fragment>
               );
       }

    }

    render(){
        return (
            <div className="modal-overlay">
                <div className="modal-box">
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}