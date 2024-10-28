export const Progress = {
    element: null, //HTML element node for input range
    elementMin: false, //will be set based on fetched sudoku grid
    solution: [], //solution of sudoku from fetched data
    solutionScore: 0,
    state: [], //current state of sudoku grid
    setElement: function(e){
        this.element = e;
    },
    setSolution: function(s){
        this.solution = s;
        this.solutionScore = this.getScore(this.solution.flat()); //.flat() because solution[] is list of lists
    },
    getScore: function(array){
        let score = 0;
        
        let scale = 7; //it should change scale of input range to more logarytmic (based on progress of the x^2 function)
        let multiplier = 20; //for refinement on progress bar movement (it should create more difference between the individual numbers of grid)
        let q = multiplier * 81;
        
        array.forEach(number => { //actually weighet sum of numbers[] from Sudoku{}
            score += number * q;
            q -= 1 * multiplier;
        });

        return score * scale;
    },
    getStateScore: function(){
        return this.getScore(this.state);
    },
    updateState: function(s){
        //skip this, if this.elementMin was already set
        if(!this.elementMin){
            this.elementMin = this.getStateScore() / this.solutionScore;
            this.element.min = this.elementMin;
        }
        
        this.state = s.map(obj => {return obj.value});

        this.element.value = this.getStateScore() / this.solutionScore; // =range between (0, 1)
    }
}