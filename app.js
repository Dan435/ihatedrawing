var i = -1;

function setup(){
    let cnv;
    localStorage.clear();
    cnv = createCanvas(1200, 900);
    background("#f7df1e");
    cnv.mousePressed(placeFirstDot);
    cnv.mouseReleased(placeSecondDot);
}

// class MyLines {
//     constructor(id, x1, y1, x2, y2){
//         this.id = id;
//         this.x1 = x1;
//         this.y1 = y1; 
//         this.x2 = x2;
//         this.y2 = y2;
//     }
// }

class Store {
    
    static getDots() {
        let dots;
        if (localStorage.getItem('points1') === null) {
            dots = [];
        } else {
            dots = JSON.parse(localStorage.getItem('points1'));
        }

        return dots;
    }
    
    static addDot(firstPoint){
        const CURRENT_DOTS = Store.getDots();
        CURRENT_DOTS.push(firstPoint); 
        window.localStorage.setItem('points1', JSON.stringify(CURRENT_DOTS));
        i++;  
    }
    
    // static addLine(myLines){
    //     const lines = Store.getLines();
    //     lines.push(myLines)
    // }

    // static clearLines() {
    //     localStorage.clear();
    // }
}

function placeFirstDot(){
    const firstPoint = {
        x1: mouseX,
        y1: mouseY
    }
    Store.addDot(firstPoint);
    strokeWeight(8);
    point(mouseX, mouseY);
}

function placeSecondDot(){
    point(mouseX, mouseY);
    strokeWeight(4);
    line(JSON.parse(window.localStorage.getItem('points1'))[i].x1,
    JSON.parse(window.localStorage.getItem('points1'))[i].y1, 
    mouseX, mouseY);
}

document.querySelector('#clearButton').addEventListener('click', (e) => {
    localStorage.clear();
    i = -1;
    clear();
    setup();
})