class Agent {
    constructor(game, color, square, radius) {
        this.color = color
        this.hp = 3
        this.square = square
        this.radius = radius
        this.width = game.square_size
        this.height = game.square_size

        this.up = 'KeyW'
        this.down = 'KeyS'
        this.left = 'KeyA'
        this.right = 'KeyD'

        this.score = 0
        this.direction = [1, 0]
        this.start = [0, 0, 5, 1]
        this.class_name = 'agent'
        this.bag = {}
    }

    key_pressed(game, event) {
        var [map_r, map_c, cell_r, cell_c] = this.square
        var square_current = game.map[map_r][map_c][cell_r][cell_c]

        var [dmr, dmc, dcr, dcc] = [0, 0, 0, 0]
        var key = event.code

        if (key == this.up) {
            this.direction = [0, -1]
            if (cell_r > 0) {
                dcr = -1
            }
            else if (map_r > 0) {
                dmr = -1
                dcr = -1
            }
        }

        else if (key == this.down) {
            this.direction = [0, 1]
            if (cell_r < game.cell_rows-1) {
                dcr = 1
            }
            else if (map_r < game.map_rows-1) {
                dmr = 1
                dcr = 1
            }
        }

        else if (key == this.left) {
            this.direction = [-1, 0]
            if (cell_c > 0) {
                dcc = -1
            }
            else if (map_c > 0) {
                dmc = -1
                dcc = -1
            }
        }

        else if (key == this.right) {
            this.direction = [1, 0]
            if (cell_c < game.cell_cols - 1) {
                dcc = 1
            }
            else if (map_c < game.map_cols-1) {
                dmc = 1
                dcc = 1
            }
        }

        var next_cr = (cell_r + dcr + game.cell_rows) % game.cell_rows
        var next_cc = (cell_c + dcc + game.cell_cols) % game.cell_cols

        var [next_mr, next_mc, next_cr, next_cc] = [map_r+dmr, map_c+dmc, next_cr, next_cc]
        var square_next = game.map[next_mr][next_mc][next_cr][next_cc]

        var can_move = false
        if (square_next[0].class_name == 'ground') {
            can_move = true
            for (let obj of square_next) {
                if (obj.class_name == 'food') {
                    square_next.pop(obj)
                    this.score += 1
                    if (obj.name in this.bag) {
                        this.bag[obj.name] += 1
                    }
                    else{
                        this.bag[obj.name] = 1
                    }
                }
                else if (obj.class_name == 'portal') {
                    [next_mr, next_mc, next_cr, next_cc] = obj.dest
                }
                else if (obj.class_name == 'key') {
                    square_next.pop(obj)
                    if (obj.class_name in this.bag) {
                        this.bag[obj.class_name] += 1
                    }
                    else {
                        this.bag[obj.class_name] = 1
                    // if this.bag['key'] == 0
                   }
                }
                else if (obj.class_name == 'door') {
                    if (('key' in this.bag) && (this.bag['key'] > 0)) {
                        square_next.pop(obj)
                        this.bag['key'] -= 1
                    }
                    else {
                        can_move = false
                    }
                }

                else if (obj.class_name == 'bullet_case') {
                    square_next.pop(obj)
                    if (obj.name in this.bag) {
                        this.bag['bullets: '] += 1
                    }
                    else {
                        this.bag['bullets: '] = 1
                    }
                }


                else if (obj.class_name == 'enemy') {
                    this.hp -= 1
                    if (this.hp <= 0) {
                        this.hp = 3
                        [next_mr, next_mc, next_cr, next_cc] = this.start
                    }
                }
            }
        }



        if (can_move) {
            this.square = [next_mr, next_mc, next_cr, next_cc]
            square_current.pop(this)
            game.map[next_mr][next_mc][next_cr][next_cc].push(this)
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