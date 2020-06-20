document.addEventListener('DOMContentLoaded', () => {
    const colors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    
    var canvas = document.getElementById('canvas');
    var ctx =  document.getElementById('canvas').getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 300, 300); //Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
    ctx.save();
    ctx.translate(150, 150);
   
    myMove();
    function myMove() {
        var elem = document.getElementById("animate");
        var pos = 0;
        var id = setInterval(frame, 500);
        function frame() {
            if (pos == 350) {
                clearInterval(id);
            } else {
                pos = Math.floor(Math.random() * 300)
                elem.style.top = pos + 'px';
                elem.style.left = pos + Math.floor(Math.random() * 100) + 'px';
                //Random coloring of squares
                let randNumber = "#";
                for (var i=0; i<6; i++) {
                    randNumber += colors[Math.floor(Math.random() * 15)];
                }
                elem.style.backgroundColor = randNumber;
            }
        }
    }
})