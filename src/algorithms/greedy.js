

export function greedy(grid, startNode, finishNode){
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

            if(r>=0 && c>=0 && r<grid.length && c<grid[0].length && !grid[r][c].visited && !grid[r][c].isWall){
                var val = 0;
                if(grid[r][c].isWeight){
                    val += 5;
                }
                else{
                    val += 1;
                }
                val += heuristics(grid[r][c], finishNode);
                //console.log(grid[r][c].distance);
                if(grid[r][c].parent === null){
                    grid[r][c].parent = currNode;
                    grid[r][c].distance = val;
                }
                else{
                    if(grid[r][c].distance > val){
                        grid[r][c].parent = currNode;
                        grid[r][c].distance = val;
                    }
                    else{
                        continue;
                    }
                }
                toVisit.push(grid[r][c]);
                
            }
        }
        toVisit.sort((a, b) => a.distance - b.distance);
        
    }

    return visitedNodes;
}

function heuristics(currNode, finishNode){
    return (Math.abs(finishNode.row - currNode.row) + Math.abs(finishNode.col - currNode.col));
}
