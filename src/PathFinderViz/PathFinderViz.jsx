import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Node from './Node/Node';

import './PathFinderViz.css';
import {bfs} from '../algorithms/bfs';
import {backtrack} from '../algorithms/backtrack';
import {dijkstra} from '../algorithms/dijkstra';
import {greedy} from '../algorithms/greedy';
import {astar} from '../algorithms/astar';

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 47;
var wallOrWeight = true;


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
        const nodes = createGrid();
        this.setState({nodes});
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
        if(shortestPath === null || shortestPath.length === 0 || !shortestPath[shortestPath.length-1].isFinish){
            return;
        }
        for(let i=0; i < shortestPath.length-1; i++){
            setTimeout(() => {
                const node = shortestPath[i];
                const newGrid = this.state.nodes.slice();
                const newNode = {
                    ...node,
                    isPath: true,
                };
                newGrid[node.row][node.col] = newNode;
                this.setState({nodes: newGrid});
            },50*i);
        }
    }

    animatePath(node) {
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
                if(newNode.isWeight){
                    newNode.isPath = false;
                    newNode.isWeightPath = true;
                    newNode.isWeight = false;
                }
                newGrid[node.row][node.col] = newNode;
                this.setState({nodes: newGrid});
            },5*i);
        }
    }

    animate(visitedNodes) {
        for(let i=0; i <= visitedNodes.length-1; i++){
            
            if(i===visitedNodes.length-1){
                setTimeout(() => {
                    this.animatePath(visitedNodes[visitedNodes.length-1]);
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
                if(newNode.isWeight){
                    newNode.isVisited = false;
                }
                newGrid[node.row][node.col] = newNode;
                this.setState({nodes: newGrid});
            },5 * i);
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
        for(let i=0; i <= visitedNodes.length; i++){
            if(i===visitedNodes.length){
                setTimeout(() => {
                    this.animatePathBacktrack(path);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                const newGrid = this.state.nodes.slice();
                const newNode = {
                    ...node,
                    isVisited: !this.state.nodes[node.row][node.col].isVisited,
                };
                newGrid[node.row][node.col] = newNode;
                this.setState({nodes: newGrid});
            },10 * i);
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

    visualizeDijkstra() {
        const {nodes} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(nodes, startNode, finishNode);
        this.animate(visitedNodesInOrder);
    }

    visualizeGreedy() {
        const {nodes} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = greedy(nodes, startNode, finishNode);
        this.animate(visitedNodesInOrder);
    }

    visualizeAstar() {
        const {nodes} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = astar(nodes, startNode, finishNode);
        this.animate(visitedNodesInOrder);
    }

    
    reset(){
        window.location.reload();
    }

    render() {
        const {nodes} = this.state;

        return (
            <>
            <br></br>
            <div>
                <ul className="legend">
                    <li className="legendItem">
                        <div className='legendStart'></div> Start
                    </li>
                    <li className="legendItem">
                        <div className='legendEnd'></div> End
                    </li>
                    <li className="legendItem">
                        <div className='legendWall'></div> Wall
                    </li>
                    <li className="legendItem">
                        <div className='legendWeight'></div> Weight
                    </li>
                    <li className="legendItem">
                        <div className='legendWeighted'></div> Weighted Algorithm
                    </li>
                    <li className="legendItem">
                        <div className='legendVisited'></div> Visited
                    </li>
                    <li className="legendItem">
                        <div className='legendUnvisited'></div> Unvisited
                    </li>
                    <li className="legendItem">
                        <div className='legendPath'></div> Path
                    </li>
                </ul>
            </div>
            <br></br>
            <div className="algo">
                <br></br>
                <Button variant="secondary" onClick={() => this.visualizeBFS()}>
                    Breadth First Search
                </Button>
                <text>&nbsp;</text>
                <Button variant="secondary" onClick={() => this.visualizeBacktrack()}>
                    Backtracking
                </Button>
                <text>&nbsp;</text>
                <Button variant="dark" onClick={() => this.visualizeDijkstra()}>
                    Dijkstra's
                </Button>
                <text>&nbsp;</text>
                <Button variant="dark" onClick={() => this.visualizeGreedy()}>
                    Greedy Best-first Search
                </Button>
                <text>&nbsp;</text>
                <Button variant="dark" onClick={() => this.visualizeAstar()}>
                    A*
                </Button>
                <br></br>
                <br></br>
            </div>
            
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const {row, col, isStart, isFinish, isVisited, isPath, isWall, isWeight, isWeightPath} = node;
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
                                    isWeightPath={isWeightPath}
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

document.onkeydown = function (e) {
    if(e.key === 'w'){
        wallOrWeight = !wallOrWeight;
        if(wallOrWeight){
            document.getElementById("wallWeight").innerHTML = "Wall";
        }
        else{
            document.getElementById("wallWeight").innerHTML = "Weight";
        }
        
    }
};

const getNewGridWithWall = (grid, row, col) => {
    if(grid[row][col].isFinish || grid[row][col].isStart){
        return grid;
    }
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    
    var newNode = {
        ...node,
    };

    if(wallOrWeight){
        newNode.isWeight = false;
        newNode.isWall = !node.isWall;
    }
    else{
        newNode.isWall = false;
        newNode.isWeight = !node.isWeight;
    }
    newGrid[row][col] = newNode;
    return newGrid;
}

const createGrid = () => {
    const nodes = [];
    for (let row = 0; row <23; row++) {
        const currRow = [];
        for (let col = 0; col < 60; col++) {
            const currentNode = {
                col,
                row,
                isStart: row === START_NODE_ROW && col === START_NODE_COL,
                isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                visited: false,
                isVisited: false,
                parent: null,
                isPath: false,
                isWall: false,
                isWeight: false,
                isWeightPath: false,
                distance: 0,
                heuristics: 0,
                totalDistance: 0,
            };
            currRow.push(currentNode);
        }
        nodes.push(currRow);
    }
    return nodes;
}