class Key {
    constructor(name, color, rect) {
        this.class_name = "key"
        this.name = name
        this.color = color
        this.rect = rect
    }

    draw(game) {
        var [x, y, w, h] = this.rect
        ctx.fillStyle = this.color
        ctx.fillRect(x, y, w, h)
    }
}


class BulletCase {
    constructor(name, img, x, y) {
        this.class_name = "bullet_case"
        this.name = name
        this.img = img
        this.x = x
        this.y = y
    }

    draw(game) {
        ctx.drawImage(this.img, this.x, this.y)
    }
}
