

export function astar(grid, startNode, finishNode){
    const dir = [0, 1, 0, -1, 0];
    const visitedNodes = [];

    startNode.distance = 0;
    const toVisit = [];
    toVisit.push(startNode);

    while(toVisit.length > 0){
        var currNode = toVisit.shift();
        if(currNode.visited){
            continue;
        }
        currNode.visited = true;
        visitedNodes.push(currNode);
        if(currNode.isFinish){
            toVisit.push(currNode);
            return visitedNodes;
        }
        for(let i=0; i < 4; i++){
            var r = currNode.row + dir[i];
            var c = currNode.col + dir[i+1];

            if(r>=0 && c>=0 && r<grid.length && c<grid[0].length && !grid[r][c].visited && !grid[r][c].isWall && grid[r][c].parent === null){
                if(grid[r][c].isWeight){
                    grid[r][c].distance = currNode.distance + 3;
                }
                else{
                    grid[r][c].distance = currNode.distance + 1;
                }
                grid[r][c].distance += heuristics(grid[r][c], finishNode);
                grid[r][c].parent = currNode;
                toVisit.push(grid[r][c]);
                
            }
        }
        toVisit.sort((a, b) => a.distance - b.distance);
        
    }

    return visitedNodes;
}

function heuristics(currNode, finishNode){
    return Math.abs(finishNode.row - currNode.row) + Math.abs(finishNode.col - currNode.col);
}
