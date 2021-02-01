const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");       //선 그리기 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const nowcolor = document.getElementById("jsNowColor");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;     // 캔버스 크기 지정 (앞에서 지정한 것은 css 크기(사용자에게 보이기 위하여))
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {      //경로를 만든다
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {             // 그린다
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopPainting(event) {
    painting = false;
}

function startPainting(event) {
    painting = true;
}

function onMouseDown(event) {
    painting = true;
}

function onMouseUp(event) {
    stopPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    nowcolor.style.backgroundColor = color;     //현재 사용중인 색상 표시 
}

function handleRangeChange(event) {
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(event) {
    if(filling){
        ctx.fillRect(0, 0,canvas.width,canvas.height);
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}
