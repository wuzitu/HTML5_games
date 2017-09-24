var Ball = function () {
    var o = {
        image: imageFromPath('ball.png'),
        x: 80,
        y: 220,
        speedX: 6,
        speedY: 6,
        fired: false,
    }
    o.move = function () {
        if (o.fired) {
            clamp(o)
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    // clamp x
    function clamp(o) {
        if (o.x <= 0 || o.x >= 400 - o.image.width) {
            o.speedX *= -1
        }
        if (o.y <= 0 || o.y >= 300 - o.image.height) {
            o.speedY *= -1
        }
    }
    return o
}