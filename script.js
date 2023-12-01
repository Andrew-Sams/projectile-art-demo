let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let animationFrameId;

function startSimulation() {
    let velocity = parseFloat(document.getElementById('velocity').value);
    let angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180; // convert to radians
    let height = parseFloat(document.getElementById('height').value);

    let vx = velocity * Math.cos(angle);
    let vy = velocity * Math.sin(angle);
    let g = 9.81; // gravity
    let time = 0;
    let interval = 0.1;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let x = vx * time;
        let y = canvas.height - (height + vy * time - 0.5 * g * time * time);

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();

        if (y < canvas.height) {
            time += interval;
            animationFrameId = requestAnimationFrame(draw);
        }
    }

    cancelAnimationFrame(animationFrameId);
    draw();
}

function resetSimulation() {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.onload = resetSimulation;
