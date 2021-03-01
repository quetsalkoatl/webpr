
const radius = 10;
const ball = {x:20, y:0, dx: 5, dy: 1};
let   old  = {x: ball.x, y: ball.y};

function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "black";

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 20);
}

function nextBoard() {
    // keep old ball values for the sake of efficient clearing of the old display
    old.x = ball.x;
    old.y = ball.y;
    console.log(ball);

    // handle ball is hitting the bounds
    //   reverse direction
    //   lose some energy relative to the current inertia (only velocity varies)
    if(old.x + radius >= 400 || old.x - radius <= 0) {
        ball.dx *= -1;
        if (ball.dx > 0) {
            ball.dx--;
        } else if (ball.dx < 0) {
            ball.dx++;
        }
    }
    if (old.y + radius >= 400 || old.y < 0) {
        if (ball.dy > 0) {
            ball.dy *= 0.9;
        }
        ball.dy *= -1;
    }

    // calculate new position
    // calculate any changes in velocity due to gravitational pull or medium resistance
    ball.x = old.x + ball.dx;
    ball.y = ball.dy < 0 ? old.y - Math.pow(ball.dy, 2) : old.y + Math.pow(ball.dy, 2);
    ball.dy += 0.3;

}

function display(context) {
    context.clearRect(old.x - radius - 1 , old.y - radius -1 , 22, 22 );
    fillBox(context)
}

function fillBox(context) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}


