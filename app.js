var i = -1;

function setup(){
    let cnv;
    localStorage.clear();
    cnv = createCanvas(1200, 900);
    background("#f7df1e");
    cnv.mousePressed(placeFirstDot);
    cnv.mouseReleased(placeSecondDot);
}

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