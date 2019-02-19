import React, { Component } from 'react';

const Tile = (props) => {
    return (
        <React.Fragment>
            {props.layers.map(layer =>
            <img src={layer.img} style={layer.offsetStyle}/> )}
        </React.Fragment>
    )
}

export default Tile;