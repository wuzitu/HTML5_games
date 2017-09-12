var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
var log = console.log.bind(console)
var img = new Image()
img.src = 'paddle.png'
img.onload = function(){
    ctx.drawImage(img,90,260);
}
log(img.height)

// events
window.addEventListener('keydown', function(event){
    var k = event.key
    if(k == 'a'){

    }else if (k == 'd'){

    }
})