var log = console.log.bind(console)
var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}
var decideCollide = function (a, b) {
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
        return true
    } else {
        return false
    }
}
