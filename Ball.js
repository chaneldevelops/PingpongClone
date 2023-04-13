const INITIAL_VELOCITY = .025 // works well as an initial value not too slow or boring
const VELOCITY_INCREASE = 0.00001
export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

        set x(value) {
            this.ballElem.style.setProperty("--x", value)
        }

        rect() { // this creates the bounce effect
            return this.ballElem.getBoundingClientRect()
        }

        reset() {
        this.x = 50;
        this.y = 50;
        this.direction { x: 0}
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = {x : Math.cos(heading), y: Math.sin(heading) }
        }
        console.log(this.direction)
        }

    this.velocity  = INITIAL_VELOCITY

    update(delta) {
        this.x = this.direction.x + this.velocity * delta
        this.y = this.direction.y + this.velocity * delta
        this.velocity += VELOCITY_INCREASE * delta 
        const rect = this.rect()

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y * -1 //this flips the y direction
        }

        if (rect.right >= window.innerHeight || rect.left <= 0) {
            this.direction.x * -1 //this flips the y direction
        }
    }

}

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min
}