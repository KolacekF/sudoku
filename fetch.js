export const func = async function(){
    const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
    const obj = await response.json();

    let numbers = obj.newboard.grids[0].value;
    let difficulty = obj.newboard.grids[0].difficulty;
    let solution = obj.newboard.grids[0].solution;

    return {numbers, difficulty, solution};
}

//FORMAT OF FETCHED numbers, solution
//
// [2,4,8, 3,9,5, 7,1,6],
// [5,7,1, 6,2,8, 3,4,9],
// [9,3,6, 7,4,1, 5,8,2],
//
// [6,8,2, 5,3,9, 1,7,4],
// [3,5,9, 1,7,4, 6,2,8],
// [7,1,4, 8,6,2, 9,5,3],
//
// [8,6,3, 4,1,7, 2,9,5],
// [1,9,5, 2,8,6, 4,3,7],
// [4,2,7, 9,5,3, 8,6,1]
//