class SudokuNumber{
    constructor(value, position){
        this.value = value
        this.const = (this.value == 0) ? false : true; //if object is fixed number in sudoku
        this.position = position; //position is list[] of square, vert, hor, positions in lists [squares, verticals, horizontals]
        this.first = false; //only first variable is set to true. If this variable needs Reset(), it means that Sudoku has no solution (all other has been tried)
    }
    GetPosition(){
        return(this.position);
    }
    Increase(){
        if(this.value == 9){return false}
        this.value = this.value + 1;
        return true;
    }
    Reset(){
        if(this.first){
            this.value = 0;
            return false;
        }
        if(this.const){
            return;
        } else{
            this.value = 0;
            return true;
        }
    }
    First(){
        this.first = true;
    }
}

export class Sudoku{
    constructor(input){
        this.squares = [];
        for (let index = 0; index < 9; index++) {
            this.squares.push([]);
        }
        this.verticals = [];
        for (let index = 0; index < 9; index++) {
            this.verticals.push([]);
        }
        this.horizontals = [];
        for (let index = 0; index < 9; index++) {
            this.horizontals.push([]);
        }

        this.numbers = [];

        this.Fill(input);
    }
    Update(){ //function to be override in HTML for example
        console.log("update");
        return
    }
    Solved(){ //function to be override in HTML for example
        console.log("Sudoku done");
        console.log(this.horizontals[0].map(x => x.value));
        console.log(this.horizontals[1].map(x => x.value));
        console.log(this.horizontals[2].map(x => x.value));
        console.log(this.horizontals[3].map(x => x.value));
        console.log(this.horizontals[4].map(x => x.value));
        console.log(this.horizontals[5].map(x => x.value));
        console.log(this.horizontals[6].map(x => x.value));
        console.log(this.horizontals[7].map(x => x.value));
        console.log(this.horizontals[8].map(x => x.value));
    }
    Unsolved(){ //function to be override in HTML for example
        console.log("Given sudoku has no solution");
    }
    Fill(input) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                let sq = (Math.floor((col) / 3)+1 + Math.floor((row) / 3) * 3) -1;

                let num = new SudokuNumber(input[row][col], [sq, col, row]);
                this.squares[sq].push(num);
                this.verticals[col].push(num);
                this.horizontals[row].push(num);
                this.numbers.push(num);
            }
        }
    }
    Solve(sleepDuration){
        this.variables = [];
        this.variables = this.numbers.filter(x => !x.const);
        this.itteration = 0;
        this.n = 0;

        this.variables[0].First(); //so that sudoku can be even unsolved

        this.intervalVar = setInterval(() => {this.Solving(this)}, sleepDuration)
    }
    Solving(that){
        const obj = that;

        let checkUnique = function(list){ //returns true if all ocuriences in a list are unique
            //create Set and compare length
            const checkSet = new Set(list);
            return checkSet.size === list.length;
        }
        let check = function(list){ //check if not contains 0 and then check unique
            //numbers is a list[] of number values of SudokuNumbers{} objects
            let numbers = [];
            list.map(x => numbers.push(x.value));
            //remove all 0 from numbers
            numbers = numbers.filter(i => i !==0);
            //check, if list[] numbers has only unique values
            return(checkUnique(numbers))
        }
        
        if (obj.n >= obj.variables.length) { //end interval if at the end of sudoku
            clearInterval(obj.intervalVar);

            obj.Solved();
        }

        obj.itteration = obj.itteration + 1;
        //console.log(itteration, n); //only for troubleshooting, it lags the console

        let pos = obj.variables[obj.n].GetPosition();

        if(obj.variables[obj.n].Increase() && 
        check(obj.squares[pos[0]]) && 
        check(obj.verticals[pos[1]]) && 
        check(obj.horizontals[pos[2]])){
            obj.n = obj.n + 1;
        } else{
            //if increase is succesfull, continue with next itteration
            //if increase is not succesfull = number was already 9
            //that means: reset that number, move back n-1 and continue with itterations
            //
            //If first of variables needs restart, it means that other solutions were tried and that sudoku has no solution
            if (obj.variables[obj.n].value >= 9) {
                if(!obj.variables[obj.n].Reset()) {
                    clearInterval(obj.intervalVar);
                    obj.Unsolved();
                }
                obj.n = obj.n - 1;
            }
        }

        obj.Update(obj.itteration);
    }
}