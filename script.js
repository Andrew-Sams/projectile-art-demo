let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let animationFrameId;

function startSimulation() {
    let velocity = parseFloat(document.getElementById('velocity').value);
    let angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180; // convert to radians
    let height = parseFloat(document.getElementById('height').value);

    // Calculate the initial velocities
    let vx = velocity * Math.cos(angle);
    let vy = velocity * Math.sin(angle);

    // Gravity constant
    let g = 9.81;

    // Initialize time
    let time = 0;

    // Time increment for the simulation
    let interval = 0.1;

    // Draw function for the animation
    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate position
        let x = vx * time;
        let y = Math.max(0, canvas.height - (height + vy * time - 0.5 * g * time * time));

        // Draw the projectile
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Update time and continue the animation if above the ground
        if (y > 0) {
            time += interval;
            animationFrameId = requestAnimationFrame(draw);
        }
    }

    // Start or restart the simulation
    cancelAnimationFrame(animationFrameId);
    draw();
}

function resetSimulation() {
    // Stop the animation and clear the canvas
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Reset simulation on window load
window.onload = resetSimulation;
