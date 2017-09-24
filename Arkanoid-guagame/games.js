
var loadLevel = function(level){
    
}
var __main = function () {
    // game
    var game = ArkanoidGame(60)
    //paddle
    var paddle = Paddle()
    // ball
    var ball = Ball()
    // block
    // var block = Block()
    var blocks = []
    for (var i = 0; i < 3; i++) {
        var block = Block()
        block.x += i*100
        blocks.push(block)
    }
    game.ragisterAction('65', function(){
        //a
        paddle.moveLeft()
    })
    game.ragisterAction('68', function(){
        //d
        paddle.moveRight()
    })
    game.ragisterAction('70', function(){
        //f
        ball.fired = true
    })
    window.addEventListener('keydown', function (event) {
        var k = event.keyCode
        if (k == '80') {
            window.paused = !window.paused
        }
    })
    game.update = function () {
        if (window.paused) {
            return
        }
        if(decideCollide(ball, paddle)){
            ball.speedY *= -1
            if(ball.y+ball.image.height > paddle.y + paddle.image.height*0.3)
                ball.speedX *= -1
        }
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if(decideCollide(ball, block) && block.health){
                // block.alive = false
                block.health --
                ball.speedY *= -1
            }
        }
        ball.move()
    }
    game.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if(block.health)
                game.drawImage(block)
        }
    }
}
__main()