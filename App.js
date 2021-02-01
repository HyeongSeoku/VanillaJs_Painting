const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");       //선 그리기 
const colors = document.getElementsByClassName("jsColor");

canvas.width=700;     // 캔버스 크기 지정 (앞에서 지정한 것은 css 크기(사용자에게 보이기 위하여))
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
       ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function stopPainting(event){
    painting=false;
}

function startPainting(event){
    painting = true;
}

function onMouseDown(event) {
    painting = true;
}

function onMouseUp(event) {
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle=color;
}



if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick))
