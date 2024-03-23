

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
                var dist = 0;
                if(grid[r][c].isWeight){
                    dist += 5;
                }
                else{
                    dist += 1;
                }
                dist += currNode.distance;

                var heur = heuristics(grid[r][c], finishNode);

                grid[r][c].distance = dist;
                grid[r][c].heuristics = heur + dist;
                grid[r][c].parent = currNode;
                

                console.log(grid[r][c].heuristics);
                toVisit.push(grid[r][c]);
                
            }
        }
        toVisit.sort((a, b) => a.heuristics - b.heuristics);
        
    }

    return visitedNodes;
}

function heuristics(currNode, finishNode){
    return (Math.abs(finishNode.row - currNode.row) + Math.abs(finishNode.col - currNode.col));
}
