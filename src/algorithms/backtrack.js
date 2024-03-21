
var R=0;
var C=0;

const dir = [0, 1, 0, -1, 0];
var visitedNodes = [];
var final_path = [];
export function backtrack(grid, startNode, finishNode){
    
    
    R = grid.length;
    C = grid[0].length;
    backtracking(grid, startNode, []);
    var output = [];
    output.push(visitedNodes);
    output.push(final_path);

    return output;
    
}

function backtracking(grid, currNode, path){
    
    
    
}