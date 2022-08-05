function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Mob {
    constructor(color, radius, square) {
        this.class_name = 'enemy'
        this.name = 'mob'
        this.color = color
        this.square = square
        this.radius = radius
        this.speed = 1
    }

    move(game) {
        var [map_r, map_c, cell_r, cell_c] = this.square
        var cell = game.map[map_r][map_c]
        var dr = randomInt(-1, 1)
        var dc = randomInt(-1, 1)

        while ((cell_r + dr > game.cell_rows-1) || (cell_r + dr < 0) || (cell_c + dc > game.cell_cols-1) || (cell_c + dc < 0) || (cell[cell_r+dr][cell_c+dc][0].name == 'wall') || (cell[cell_r+dr][cell_c+dc][0].name == 'portal')) {
            dr = randomInt(-1, 1)
            dc = randomInt(-1, 1)
        }

        game.map[this.square[0]][this.square[1]][this.square[2]][this.square[3]].pop(this)
        this.square = [map_r, map_c, cell_r + dr, cell_c + dc]
        game.map[this.square[0]][this.square[1]][this.square[2]][this.square[3]].push(this)
    }

    agent_collide(game) {
        for (let obj of game.map[this.square[0]][this.square[1]][this.square[2]][this.square[3]]) {
            if (obj.class_name == 'agent') {
                obj.hp -= 1
                if (obj.hp <= 0) {
                    game.map[obj.square[0]][obj.square[1]][obj.square[2]][obj.square[3]].pop(obj)
                    obj.square = obj.start
                    game.map[obj.square[0]][obj.square[1]][obj.square[2]][obj.square[3]].push(obj)
                    obj.hp = 3
                }
            }
        }
    }

    draw(game) {
        var [map_r, map_c, cell_r, cell_c] = this.square
        ctx.fillStyle = this.color
        var x = cell_c*game.square_size + Math.floor(game.square_size / 2)
        var y = cell_r*game.square_size + Math.floor(game.square_size / 2)
        ctx.beginPath()
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
    }
}


class MobReturn extends Mob {
    constructor(color, radius, square, direction) {
        super(color, radius, square)

        this.direction = direction
        this.name = 'mob_return'
    }

    move(game) {
        var [map_r, map_c, cell_r, cell_c] = this.square

        if (this.direction[0] != 0) {
            if ((cell_r + this.direction[0] < 0) || (cell_r + this.direction[0] > game.cell_rows-1)) {
                this.direction[0] *= -1
            }
        }

            var square_next = game.map[map_r][map_c][cell_r + this.direction[0]][cell_c + this.direction[1]]
            for (let obj of square_next) {
                if ((obj.class_name == 'wall') || (obj.class_name == 'door')) {
                    this.direction[0] *= -1
                }
            }

        if (this.direction[1] != 0) {
            if ((cell_c + this.direction[1] < 0) || (cell_c + this.direction[1] > game.cell_cols-1)) {
                this.direction[1] *= -1
            }
        }

            square_next = game.map[map_r][map_c][cell_r + this.direction[0]][cell_c + this.direction[1]]
            for (let obj of square_next) {
                if ((obj.class_name == 'wall') || (obj.class_name == 'door')) {
                    this.direction[1] *= -1
                }
            }

        game.map[this.square[0]][this.square[1]][this.square[2]][this.square[3]].pop(this)
        this.square = [map_r, map_c, cell_r + this.direction[0], cell_c + this.direction[1]]
        game.map[this.square[0]][this.square[1]][this.square[2]][this.square[3]].push(this)
    }
}


class MobGo extends Mob {
    constructor(color, radius, square, steps) {
        super().constructor(color, radius, square)
        this.name = 'mob_go'
        this.steps = steps
        this.step = 0
    }

    move(game) {
        this.step = (this.step + 1) % len(this.steps)
        game.map[this.square[0]][this.square[1]][this.square[2]][this.square[3]].pop(this)
        this.square = this.steps[this.step]
        game.map[this.square[0]][this.square[1]][this.square[2]][this.square[3]].push(this)
    }
}
