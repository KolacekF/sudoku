export const CustomSudoku = {
    tableID: "customSudoku",
    func: function(){
        let value = Number(this.innerHTML);
        value = (value == 9) ? 0 : value + 1;
        this.innerHTML = value;
    },
    create: function(div){
        let table = document.createElement("table");
        table.id = this.tableID;
        for (let row = 0; row < 9; row++) {
            let r = document.createElement("tr");
            for (let col = 0; col < 9; col++) {
                let c = document.createElement("td");
                //---let a = document.createElement("a");
                c.innerHTML = 0;
                c.addEventListener("click", this.func);

                //---c.appendChild(a);                
                r.appendChild(c);
            }
            table.appendChild(r);
        }
        div.appendChild(table);
    },
    getValue: function(){
        let values = [];
        let table = document.getElementById(this.tableID);
        let trElements = table.children;
        for (let r = 0; r < trElements.length; r++) {
            let array = []
            for (let c = 0; c < trElements[r].children.length; c++) {
                array.push(Number(trElements[r].children[c].innerHTML));
            }
            values.push(array);
        }

        console.log(values);

        return values;
    }
}