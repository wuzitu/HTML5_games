var ArkanoidGame = function (fps) {
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
    g.ragisterAction = function (key, callback) {
        g.actions[key] = callback
    }
    setInterval(function () {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i];
            if (g.keydowns[key]) {
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