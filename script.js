document.addEventListener('DOMContentLoaded' , ()=>{
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 8;
    const sqaures = [];
    let score=0;
    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/green-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/blue-candy.png)'
    ];

    function createBoard(){
        for(let i=0; i<width*width ;i++){
           const sqaure = document.createElement('div');
           sqaure.setAttribute('draggable' , true);
           let randomCol = Math.floor(Math.random() * candyColors.length);
           grid.appendChild(sqaure);
           sqaure.setAttribute('id' , i);
           sqaure.style.backgroundImage = candyColors[randomCol];
           sqaures.push(sqaure); 
        }
    }
    let colorBeingDragged;
    let colorBeingReplaced;
    let IdDragged;
    let IdReplaced;

    createBoard();
    sqaures.forEach(sqaure => sqaure.addEventListener('dragstart' , dragStart));
    sqaures.forEach(sqaure => sqaure.addEventListener('dragend' , dragEnd));
    sqaures.forEach(sqaure => sqaure.addEventListener('dragleave' , dragLeave));
    sqaures.forEach(sqaure => sqaure.addEventListener('dragover' , dragOver));
    sqaures.forEach(sqaure => sqaure.addEventListener('dragenter' , dragEnter));
    sqaures.forEach(sqaure => sqaure.addEventListener('drop' , dragDrop));

    function dragStart(){
        colorBeingDragged = this.style.backgroundImage;
        console.log(colorBeingDragged);
        IdDragged = parseInt(this.id);
        // console.log(this.id, 'dragStart');
    }
    function dragEnd(){
        let validMoves = [
            IdDragged -1 ,IdDragged +1 , IdDragged +width ,IdDragged -width
        ];
        let validMove = validMoves.includes(IdReplaced);
        if(IdReplaced && validMove){
            IdReplaced = null;
        }
        else if(IdReplaced && !validMove){
            sqaures[IdDragged].style.backgroundImage = colorBeingDragged;
            sqaures[IdReplaced].style.backgroundImage = colorBeingReplaced;
        }
        else{
            sqaures[IdDragged].style.backgroundImage = colorBeingDragged;
        }

        // console.log(this.id, 'dragEnd');
    }
    function dragLeave(){
        // console.log(this.id, 'dragLeave');
    }
    function dragEnter(e){
        e.preventDefault();
        // console.log(this.id, 'dragEnter');
    }
    function dragOver(e){
        e.preventDefault();
        // console.log(this.id, 'dragOver');
    }
    function dragDrop(){
        colorBeingReplaced = this.style.backgroundImage;
        IdReplaced = parseInt(this.id);
        sqaures[IdDragged].style.backgroundImage = colorBeingReplaced;
        this.style.backgroundImage = colorBeingDragged;
        // console.log(this.id, 'dragDrop');
    }


    //move down candies
    function moveDown(){
        for(let i=0;i<55;i++){
            if(sqaures[i+width].style.backgroundImage === '' ){
                sqaures[i+width].style.backgroundImage = sqaures[i].style.backgroundImage;
                sqaures[i].style.backgroundImage = '';
                const firstRow = [0,1,2,3,4,5,6,7];
                const isFirstRow = firstRow.includes(i);
                if(isFirstRow && sqaures[i].style.backgroundImage ==='' ){
                    let randomCol = Math.floor(Math.random() * candyColors.length);
                    sqaures[i].style.backgroundImage = candyColors[randomCol];
                }
            }
        }
    }

    //check for 3
    function checkRowForThree(){
        for(let i=0;i<61;i++){
            let rowOfThree = [i , i+1 , i+2];
            let decidedColor = sqaures[i].style.backgroundImage;
            const isBlank = sqaures[i].style.backgroundImage === '';
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55];
            if(notValid.includes(i))continue; 

            if(rowOfThree.every(index => sqaures[index].style.backgroundImage === decidedColor && !isBlank)){
                score+=3;
                scoreDisplay.innerHTML = score;
                rowOfThree.forEach(index => {sqaures[index].style.backgroundImage = ''});
            }
        }
    }
    
    function checkColForThree(){
        for(let i=0;i<47;i++){
            let ColOfThree = [i , i+width , i+width*2];
            let decidedColor = sqaures[i].style.backgroundImage;
            const isBlank = sqaures[i].style.backgroundImage === '';
            if(ColOfThree.every(index => sqaures[index].style.backgroundImage === decidedColor && !isBlank)){
                score+=3;
                scoreDisplay.innerHTML = score;

                ColOfThree.forEach(index => {sqaures[index].style.backgroundImage = ''});
            }
        }
    }


    //check for 4
    function checkRowForFour(){
        for(let i=0;i<60;i++){
            let rowOfFour = [i , i+1 , i+2 , i+3];
            let decidedColor = sqaures[i].style.backgroundImage;
            const isBlank = sqaures[i].style.backgroundImage === '';
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];

            if(notValid.includes(i))continue;

            if(rowOfFour.every(index=>sqaures[index].style.backgroundImage === decidedColor && !isBlank)){
                score+=4;
                scoreDisplay.innerHTML = score;

                rowOfFour.forEach(index => {sqaures[index].style.backgroundImage = ''});
            }
        }
    }
    checkRowForFour();

    function checkColForFour(){
        for(let i=0;i<40;i++){
            let ColOfFour = [i , i+width , i+width*2 , i+width*3];
            let decidedColor = sqaures[i].style.backgroundImage;
            const isBlank = sqaures[i].style.backgroundImage === '';
            if(ColOfFour.every(index => sqaures[index].style.backgroundImage === decidedColor && !isBlank)){
                score+=4;
                scoreDisplay.innerHTML = score;
                ColOfFour.forEach(index => {sqaures[index].style.backgroundImage = ''});
            }
        }
    }
    checkColForFour();

    // setInterval(checkRowForThree , 100);
    window.setInterval(function(){
        moveDown();
        checkRowForFour();
        checkColForFour();
        checkRowForThree()
    checkColForThree();

    } , 100);
})

