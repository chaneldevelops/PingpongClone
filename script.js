
import Ball from "./Ball.js" // importing links the different js files to the main js file
import Paddle from "./Paddle.js"


// Create variables of the Ball and Paddle classes from the HTML
const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")


// Define a variable to keep track of the last time the function was called
let lastTime


function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)
    
    // Increase hue of background color over time
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    )

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

    // If the ball is off the screen, it's a point for losing
    if (isLose()) handleLose()
  }

  // Update lastTime and generate a new game/reset
  lastTime = time
  window.requestAnimationFrame(update)
}

// Define the isLose function, that returns true if the ball is off screen
function isLose() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

// Define handleLose function, which updates the score and resets the ball and computer paddle 
function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
  }
  ball.reset()
  computerPaddle.reset()
}

// Add event listener that updates the player paddle position based on the mouse movement
document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})

// Start the game loop
window.requestAnimationFrame(update)