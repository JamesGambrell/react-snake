import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.scss';
import SnakeGame from './components/snake-game'

class App extends Component {
    render() {
        return (
            <SnakeGame/>
        )
    }
}

App.propTypes = {
    message: PropTypes.string.isRequired,
};

export default App;
