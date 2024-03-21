import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Node from './Node/Node';

import './PathFinderViz.css';
import {bfs} from '../algorithms/bfs';
import {backtrack} from '../algorithms/backtrack';

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 20;



export default class PathFinderViz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            mousePressed: false,
        };
    }

    
    /*Invoked immediately after a component is mounted. Any remote endpoint should also be placed here*/
    componentDidMount() {
        this.createGrid();
    }

    


    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWall(this.state.nodes, row, col);
        this.setState({nodes: newGrid, mousePressed: true});
    }

    handleMouseEnter(row, col) {
        if(!this.state.mousePressed) return;
        const newGrid = getNewGridWithWall(this.state.nodes, row, col);
        this.setState({nodes: newGrid});
    }

    handleMouseUp() {
        this.setState({mousePressed: false});
        return;
    }

    animatePathBFS(node) {
        var currNode = node;

        var shortestPath = [];

        if(!currNode.isFinish){
            return;
        }

        while(currNode.parent != null){
            if(currNode.isWall || currNode.isStart){
                break;
            }
            shortestPath.unshift(currNode);
            currNode = currNode.parent;
        }

        for(let i=0; i < shortestPath.length; i++){
            console.log(shortestPath[i])
            setTimeout(() => {
                const node = shortestPath[i];
                const newGrid = this.state.nodes.slice();
                const newNode = {
                    ...node,
                    isVisited: false,
                    isPath: true,
                };
                newGrid[node.row][node.col] = newNode;
                this.setState({nodes: newGrid});
            },5*i);
        }
    }

    animatePathBacktrack(shortestPath) {

        for(let i=0; i < shortestPath.length; i++){
            setTimeout(() => {
                const node = shortestPath[i];
                const newGrid = this.state.nodes.slice();
                const newNode = {
                    ...node,
                    isVisited: !node.visited,
                    isPath: true,
                };
                newGrid[node.row][node.col] = newNode;
                this.setState({nodes: newGrid});
            },50*i);
        }
    }


    animateBFS(visitedNodes) {
        for(let i=0; i <= visitedNodes.length-1; i++){
            if(i===visitedNodes.length-1){
                setTimeout(() => {
                    this.animatePathBFS(visitedNodes[visitedNodes.length-1]);
                }, 6 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                const newGrid = this.state.nodes.slice();
                const newNode = {
                    ...node,
                    isVisited: true,
                };
                newGrid[node.row][node.col] = newNode;
                this.setState({nodes: newGrid});
            },5 * i);
        }
    }

    animateBacktrack(visitedNodes, path) {
        console.log(visitedNodes);
        for(let i=0; i <= visitedNodes.length; i++){
            if(i===visitedNodes.length){
                setTimeout(() => {
                    this.animatePathBacktrack(path);
                }, 6 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                const newGrid = this.state.nodes.slice();
                const newNode = {
                    ...node,
                    isVisited: true,
                };
                newGrid[node.row][node.col] = newNode;
                this.setState({nodes: newGrid});
            },5 * i);
        }
    }

    

    visualizeBFS() {
        const {nodes} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = bfs(nodes, startNode, finishNode);
        this.animateBFS(visitedNodesInOrder);
        
    }

    visualizeBacktrack() {
        const {nodes} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = backtrack(nodes, startNode, finishNode);
        this.animateBacktrack(visitedNodesInOrder[0], visitedNodesInOrder[1]);
    }

    createGrid() {
        const nodes = [];
        for (let row = 0; row < 15; row++) {
            const currRow = [];
            for (let col = 0; col < 40; col++) {
                const currentNode = {
                    col,
                    row,
                    isStart: row === 10 && col === 5,
                    isFinish: row === 5 && col ===25,
                    visited: false,
                    isVisited: false,
                    parent: null,
                    isPath: false,
                    isWall: false,
                    isWeight: false,
                };
                currRow.push(currentNode);
            }
            nodes.push(currRow);
        }
        this.setState({nodes});
    }

    
    reset(){
        window.location.reload();
    }

    render() {
        const {nodes} = this.state;

        return (
            <>
            <div className="algo">
                <br></br>
                <br></br>
                <Button variant="outline-dark" onClick={() => this.visualizeBFS()}>
                    Breadth First Search
                </Button>
                <br></br>
                <br></br>
                <Button variant="outline-secondary" onClick={() => this.reset()}>
                    Reset Grid
                </Button>
                <br></br>
                <br></br>
                <br></br>
            </div>
            
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const {row, col, isStart, isFinish, isVisited, isPath, isWall, isWeight} = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    row={row}
                                    col={col}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    isVisited={isVisited}
                                    isPath={isPath}
                                    isWall={isWall}
                                    isWeight={isWeight}
                                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                    onMouseUp={() => this.handleMouseUp()}
                                ></Node>
                            );
                        })}</div>
                    );
                })}</div>
            </>
        ); 
    }
}


const getNewGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
            ...node,
            isWall: !node.isWall,
        };
    
    
    newGrid[row][col] = newNode;
    return newGrid;
}