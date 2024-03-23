
var R=0;
var C=0;

const dirr = [0, -1, 0, 1];
const dirc = [1, 0, -1, 0];
var visitedNodes = [];
var final_path = [];
export function backtrack(grid, startNode, finishNode){
    
    
    R = grid.length;
    C = grid[0].length;
    backtracking(grid, startNode);
    var output = [];
    output.push(visitedNodes);
    output.push(final_path);

    return output;
    
}

function backtracking(grid, currNode){
    
    if(currNode.isFinish){
        final_path.push(currNode);
        return 1;
    }

    visitedNodes.push(currNode);
    final_path.push(currNode);
    currNode.visited = true;

    for(let i=0; i < 4; i++){
        var r = dirr[i] + currNode.row;
        var c = dirc[i] + currNode.col;

        if(r>=0 && r<R && c>=0 && c<C && !grid[r][c].visited && !grid[r][c].isWall){
            var result = backtracking(grid, grid[r][c]);
            if(result){
                return 1;
            }
        }
    }

    //currNode.visited = false;
    final_path.pop();
    visitedNodes.push(currNode);

    return 0;
}