import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            row,
            col,
            isFinish, 
            isStart, 
            isVisited, 
            isPath,
            isWall,
            isWeight,
            isWeightPath,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        const extraClassName = 
            isFinish ? 'node-finish' : 
            isStart ? 'node-start' : 
            isVisited ? 'node-visited' : 
            isPath ? 'node-path' : 
            isWall ? 'node-wall' :
            isWeight ? 'node-weight' :
            isWeightPath ? 'node-weight-path' :
            '';

        return <div className={`node ${extraClassName}`}
            onMouseDown = {() => onMouseDown(row, col)}
            onMouseEnter = {() => onMouseEnter(row, col)}
            onMouseUp = {() => onMouseUp()}
        ></div>; 
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
}