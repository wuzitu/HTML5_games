var Paddle = function () {
    var o = {
        image: imageFromPath('paddle.png'),
        x: 90,
        y: 260,
        speed: 5,
    }
    o.moveLeft = function () {
        o.x -= o.speed
        clamp(o)
    }
    o.moveRight = function () {
        o.x += o.speed
        clamp(o)
    }
    // clamp x
    function clamp(paddle) {
        if (paddle.x <= 0)
            paddle.x = 0
        if (paddle.x >= 180)
            paddle.x = 180
    }
    return o
}
var Ball = function () {
    var o = {
        image: imageFromPath('ball.png'),
        x: 80,
        y: 220,
        speedX: 6,
        speedY: 6,
        fired: false,
    }
    o.move = function(){
        if (o.fired) {
            clamp(o)
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    // clamp x
    function clamp(o) {
        if (o.x <= 0 || o.x >= 400-o.image.width) {
            o.speedX *= -1
        }
        if (o.y <= 0 || o.y >= 300-o.image.height) {
            o.speedY *= -1
        }
    }
    return o
}

var Block = function () {
    var o = {
        image: imageFromPath('block.png'),
        x: 80,
        y: 120,
        alive: true,
    }
    
    return o
}
var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var decideCollide = function(a, b){
    var o = {  
        x: a.x,  
        y: a.y,  
        w: a.image.width,  
        h: a.image.height,
    }  
  
    var d = {  
        x: b.x,  
        y: b.y,  
        w: b.image.width,  
        h: b.image.height,
    }  
    var px, py;  
    px = o.x <= d.x ? d.x : o.x;  
    py = o.y <= d.y ? d.y : o.y;  
    // 判断点是否都在两个对象中  
    if (px >= o.x && px <= o.x + o.w && py >= o.y && py <= o.y + o.h && px >= d.x && px <= d.x + d.w && py >= d.y && py <= d.y + d.h) {  
        log('true')
        return true
    } else {  
        log('false')
        return false
    }  
}

var ArkanoidGame = function () {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    g.drawImage = function (o) {
        context.drawImage(o.image, o.x, o.y)
    }

    window.addEventListener('keydown', function (event) {
        var k = event.keyCode
        g.keydowns[k] = true
    })
    window.addEventListener('keyup', function (event) {
        var k = event.keyCode
        g.keydowns[k] = false
    })
    g.ragisterAction = function(key, callback){
        g.actions[key] = callback
    }
    setInterval(function () {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i];
            if(g.keydowns[key]){
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        //clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
    }, 1000 / fps)

    return g
}
var fps = 60
var log = console.log.bind(console)
var __main = function () {
    // game
    var game = ArkanoidGame()
    //paddle
    var paddle = Paddle()
    // ball
    var ball = Ball()
    // block
    var block = Block()
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
    game.update = function () {
        ball.move()
        if(decideCollide(ball, paddle)){
            ball.speedY *= -1
            if(ball.y+ball.image.height > paddle.y + paddle.image.height*0.3)
                ball.speedX *= -1
        }
        if(decideCollide(ball, block) && block.alive){
            block.alive = false
            ball.speedY *= -1
        }
    }
    game.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)
        if(block.alive)
            game.drawImage(block)
    }
}

__main()