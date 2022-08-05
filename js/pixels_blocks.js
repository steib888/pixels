class Ground {
    constructor(name, img, x, y) {
        this.class_name = 'ground'
        this.name = name
        this.img = img
        this.x = x
        this.y = y
    }

    draw(game) {
        ctx.drawImage(this.img, this.x, this.y)
    }
}

class Barrier {
    constructor(name, img, x, y) {
        this.class_name = 'barrier'
        this.name = name
        this.img = img
        this.x = x
        this.y = y
    }

    draw(game) {
        ctx.drawImage(this.img, this.x, this.y)
    }
}

class Food {
    constructor(name, img, x, y) {
        this.class_name = 'food'
        this.name = name
        this.img = img
        this.x = x
        this.y = y
    }

    draw(game) {
        ctx.drawImage(this.img, this.x, this.y)
    }
}

class Portal {
    constructor(img, x, y, dest) {
        this.class_name = 'portal'
        this.img = img
        this.x = x
        this.y = y
        this.dest = dest
    }

    draw(game) {
        ctx.drawImage(this.img, this.x, this.y)
    }
}

class Door {
    constructor(name, color, rect) {
        this.class_name = "door"
        this.name = name
        this.color = color
        this.rect = rect
        this.open = false
    }

    draw(game) {
        var [x, y, w, h] = this.rect
        ctx.fillStyle = this.color
        ctx.fillRect(x, y, w, h)
    }
}
