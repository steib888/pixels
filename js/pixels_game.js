class Game {
    constructor() {
        this.map = build_map(map_)
        this.mobs = []
        addMobs(this.map, this.mobs)

        this.map_rows = map_rows
        this.map_cols = map_cols
        this.cell_rows = cell_rows
        this.cell_cols = cell_cols

        this.square_size = square_size

        this.colors = ["rgb(0, 100, 0)", "rgb(100, 100, 100)", "rgb(100, 0, 0)"]

        this.F_H = 80
        this.footer = new Footer("rgb(0, 0, 0)", 0, this.square_size*this.cell_rows,
                             this.square_size*this.cell_cols, this.F_H)

        this.agents = []

        this.fps = 100
        this.count = 0

//        this.font = pygame.font.Font(None, 20)
    }

    changeAll() {
        var [a_map_r, a_map_c, a_cell_r, a_cell_c] = this.agents[0].square
        if (this.count % 80 == 0) {
            for (let mob of this.mobs) {
                var [map_r, map_c, cell_r, cell_c] = mob.square
                if ((map_r == a_map_r) && (map_c == a_map_c)) {
                    mob.move(this)
                    mob.agent_collide(this)
                }
            }
        }
    }

    draw_cell() {
        var [map_r, map_c, cell_r, cell_c] = this.agents[0].square
        var cell = this.map[map_r][map_c]
        for (var cr = 0; cr < this.cell_rows; cr++) {
            for (var cc = 0; cc < this.cell_cols; cc++) {
                for (let obj of cell[cr][cc]) {
                    obj.draw(this)
                }
            }
        }

        for (var i = 0; i < this.cell_rows+1; i++) {
//            pygame.draw.line(this.window, "blue", (0, i*this.square_size), (this.cell_cols*this.square_size, i*this.square_size))
//            pygame.draw.line(this.window, "rgb(0, 0, 200)", (0, i*this.square_size-1), (this.cell_cols*this.square_size, i*this.square_size-1))
		}
        
        for (var i = 0; i < this.cell_cols+1; i++) {
//            pygame.draw.line(this.window, "rgb(0, 0, 200)", (i*this.square_size, 0), (i*this.square_size, this.cell_rows*this.square_size))
//            pygame.draw.line(this.window, "rgb(0, 0, 200)", (i*this.square_size-1, 0), (i*this.square_size-1, this.cell_rows*this.square_size))
        }
    }

    drawAll() {
    	ctx.fillStyle = "rgb(100, 100, 100)"
        ctx.fillRect(0, 0, this.cell_cols * this.square_size, this.cell_rows * this.square_size)

        this.draw_cell()
        this.footer.draw(this)
    }
}


class Footer {
    constructor(color, x, y, w, h) {
        this.color = color
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw(game) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)


        ctx.fillStyle = game.agents[0].color
        ctx.font = '30px serif';
        var text = "score: " + String(game.agents[0].score)
        ctx.fillText(text, Math.floor(game.square_size/10), game.cell_cols * game.square_size + Math.floor(game.F_H/3)  )


        text = "HP: " + String(game.agents[0].hp)
        ctx.fillText(text, game.square_size*2, game.cell_cols * game.square_size + Math.floor(game.F_H/3)  )
/*
        string = "HP: " + str[this.hp]
        text = game.font.render[string, true, [255, 255, 255]]
        game.window.blit[text, [game.square_size*2, game.cell_cols * game.square_size + game.F_H // 3]]

        string = "mr, mc, cr, cc: " + str[this.square]
        text = game.font.render[string, true, [255, 255, 255]]
        game.window.blit[text, [game.square_size * 3, game.cell_cols * game.square_size + game.F_H // 3]]

        string = "bag: " + str[this.bag]
        text = game.font.render[string, true, [255, 255, 255]
        game.window.blit[text, [5, game.cell_cols * game.square_size + game.F_H // 3 + 20]]
*/
    }
}