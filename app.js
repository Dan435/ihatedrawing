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
    cnv = createCanvas(1000, 700);
    background("#f7df1e");
    cnv.mousePressed(placeFirstPoint);
    cnv.mouseReleased(placeSecondPoint);
}

class Store {   
    static getDots(jsonName) {
        let dots;
        if (localStorage.getItem(jsonName) === null) {
            dots = [];
        } else {
            dots = JSON.parse(localStorage.getItem(jsonName));
        }

        return dots;
    }
    /**
     * @function addDot - Добавляет первую/вторую точку в соответствующий JSON, в зависимости от переданных параметров.
     * @param obj - Объект координат точки.
     */
    static addDot(obj, jsonName){
        const CURRENT_DOTS = Store.getDots(jsonName);
        CURRENT_DOTS.push(obj); 
        window.localStorage.setItem(jsonName, JSON.stringify(CURRENT_DOTS));
    }
}

function placeFirstPoint(){
    const firstPoint = {
        id: i,
        x1: mouseX,
        y1: mouseY
    };
    Store.addDot(firstPoint, 'points1');
    strokeWeight(8);
    point(mouseX, mouseY);
    text(str(i), mouseX + 20, mouseY + 20);
}

//Парсим джейсон, получаем линию
function placeSecondPoint(){
    const secondPoint = {
        id: j,
        x2: mouseX,
        y2: mouseY
    };
    Store.addDot(secondPoint, 'points2');
    point(mouseX, mouseY);
    text(str(j), mouseX + 20, mouseY + 20);
    strokeWeight(4);
    line(JSON.parse(window.localStorage.getItem('points1'))[i].x1,
    JSON.parse(window.localStorage.getItem('points1'))[i].y1, 
    mouseX, mouseY);
    i++;  
    j++;
}

function drawLine(){
    var firstJson = JSON.parse(localStorage.getItem('points1'));
    var secondJson= JSON.parse(localStorage.getItem('points2'));
    // TODO: Реализовать
}

// Очистка LocalStorage + канвы
document.querySelector('#clearButton').addEventListener('click', (e) => {
    localStorage.clear();
    i = 0;
    j = 0;
    clear();
    setup();
})