let keyString = '01234567890123456789012345678901'
        
let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
 
let imgData = ctx.createImageData(8, 1)
 
for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i + 0] = parseInt(keyString[i]) + 50
    imgData.data[i + 1] = parseInt(keyString[i + 1]) + 100
    imgData.data[i + 2] = parseInt(keyString[i + 2]) + 150
    imgData.data[i + 3] = parseInt(keyString[i + 3]) + 200
}
 
ctx.putImageData(imgData, 0, 0)