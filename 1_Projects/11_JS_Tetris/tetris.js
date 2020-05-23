document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const scoreDisp = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    
    const L_tetris = [
    [1, width+1, width*2 + 1, 2],
    [1, width+1, width*2 + 1, width*2],
    [width, width+1, width+2, width*2+2],
    [width, width*2, width*2+1, width*2+2]
    ]

    const Z_tetris = [
    [0, width, width+1, width*2+1],
    [width+1, width+ 2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
    ]

    const T_tetris = [
    [1, width, width+1, width+2],
    [1, width+ 1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
    ]

    const O_tetris = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
    ]

    const I_tetris = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
    ]

    const Tetrominoes = [L_tetris, Z_tetris, T_tetris, O_tetris, I_tetris]

    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * Tetrominoes.length);
    console.log(random);
    let current = Tetrominoes[random][currentRotation];
    console.log(Tetrominoes[0][0]);

    //Lets draw the first rotation
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    }
    
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        })
    }

    //Timer related
    timerId = setInterval(moveDown, 500);
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        Freeze()
    }

    function Freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken')))
        {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            random = Math.floor(Math.random() * Tetrominoes.length);
            current = Tetrominoes[random][currentRotation];
            currentPosition = 4;
            draw()
        }
    }
})
