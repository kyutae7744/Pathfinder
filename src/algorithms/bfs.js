
export function bfs(grid, startNode, finishNode){
    const visitedNodes = [];
    const R = grid.length;
    const C = grid[0].length;

    const dir = [0, 1, 0, -1, 0];

    var toVisit = [];

    toVisit.push(startNode);

    while(toVisit.length > 0){
        var node = toVisit.shift();
        
        
        if(node.isFinish){
            visitedNodes.push(node);
            return visitedNodes;
        }

        if(node.visited){
            continue;
        }

        visitedNodes.push(node);
        node.visited = true;

        for(let i=0; i < 4; i++){
            var r = node.row + dir[i];
            var c = node.col + dir[i+1];

            if(r >= 0 && r < R && c >=0 && c < C && !grid[r][c].visited && !grid[r][c].isWall){
                grid[r][c].parent = node;
                toVisit.push(grid[r][c]);
            }
        }

    }

    return visitedNodes;
}