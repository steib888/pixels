class Bullet {
    constructor(name, color, x, y, size) {
        this.class_name = "bullet"
        this.name = name
        this.color = color
        this.x = x
        this.y = y
        this.size = size
        this.speed = 1
        this.direction = [0, 1]
    }

    //def move(this) {
    //    if this.direction[0]
    //}

    draw(game) {
        pygame.draw.rect(game.window, this.color, this.rect)
    }
}
