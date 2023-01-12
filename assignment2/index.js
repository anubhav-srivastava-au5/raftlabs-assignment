const row = [2, 1, -1, -2, -2, -1, 1, 2, 2]
const col = [1, 2, 2, 1, -1, -2, -2, -1, 1]
 
 

function isValid(x, y){
    if (x > 0 && y > 0 && x <= 7 && y <= 7)
    {
        return true
    }
    return false
}

function checkKnightMovement(x,y){
    let count=0;
    for (let i = 0; i < 8; i++) {
        if(isValid(x+row[i],y+col[i]))
        {
            count++;
        }
    }
    return count
}

console.log("Total possible positions for Knight to move = ",checkKnightMovement(3,3));