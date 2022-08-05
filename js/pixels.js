const canvas = document.getElementById('field')
const ctx = canvas.getContext('2d')

var game
var agent

function gameLoop() {
	game.count += 1
	game.changeAll();
	game.drawAll();
}

function main() {
    game = new Game()

 
    agent = new Agent(game, "rgb(0, 0, 200)", [0, 0, 1, 1], Math.floor(game.square_size/2.5))
    game.agents.push(agent)
    game.map[0][0][1][1].push(agent)

	game_ = setInterval(gameLoop, 5)
}


document.addEventListener('keyup', function(event) {
    agent.key_pressed(game, event);
});


main()
