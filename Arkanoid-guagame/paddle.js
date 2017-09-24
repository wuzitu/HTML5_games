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