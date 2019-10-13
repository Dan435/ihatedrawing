/**
 * @var i счётчик/ ID первых точек.
 */
var i = 0;
/**
 * @var j счётчик/ ID вторых точек.
 */
var j = 0;

function setup(){
    let cnv; // Означает, что данный метод будет применяться только в пределах канвы
    localStorage.clear();
    cnv = createCanvas(1200, 900);
    background("#f7df1e");
    cnv.mousePressed(placeFirstPoint);
    cnv.mouseReleased(placeSecondPoint);
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
    /**
     * @function addDot - Добавляет первую/вторую точку в соответствующий JSON, в зависимости от переданных параметров.
     * @param obj - Объект координат точки.
     */
    static addDot(obj){
        const CURRENT_DOTS = Store.getDots();
        CURRENT_DOTS.push(obj); 
        window.localStorage.setItem('points1', JSON.stringify(CURRENT_DOTS));
    }
}

function placeFirstPoint(){
    const firstPoint = {
        id: i,
        x1: mouseX,
        y1: mouseY
    };
    Store.addDot(firstPoint);
    strokeWeight(8);
    point(mouseX, mouseY);
}

//Парсим джейсон, получаем линию
function placeSecondPoint(){
    const secondPoint = {
        id: j,
        x2: mouseX,
        y2: mouseY
    };
    point(mouseX, mouseY);
    strokeWeight(4);
    line(JSON.parse(window.localStorage.getItem('points1'))[i].x1,
    JSON.parse(window.localStorage.getItem('points1'))[i].y1, 
    mouseX, mouseY);
    i++;  
    j++;
}

// Очистка LocalStorage + канвы
document.querySelector('#clearButton').addEventListener('click', (e) => {
    localStorage.clear();
    i = 0;
    j = 0;
    clear();
    setup();
})