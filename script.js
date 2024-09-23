const newGameBtn = document.querySelector(".btn");
const boxes =  document.querySelectorAll(".box");
const gameInfo =  document.querySelector(".game-info");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // To show on ui
    boxes.forEach((box, index ) => {
        box.innerText  = "";
        boxes[index].style.pointerEvents = "all";
        // explore this line 
        box.classList = `box box${index+1}`;
    });
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    newGameBtn.classList.remove("active");
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText  = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){

    let answer = "";
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]]!=="" )
        && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]))
        {
            //  Check who is the winner
            if(gameGrid[position[0]] === "X"){
                answer = "X";            
            }
            else{
                answer = "0";
            }

            //  Disablepointer events 
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //  add winning background color 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer !== ""){
        gameInfo.innerText =  `Winner - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //  If No winner found ,i,e..Game is tie
    let boxCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            boxCount++;
        }
    });
    if(boxCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] ==="" ){
        
        boxes[index].innerText = currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents = "none";
    }
    swapTurn();
    checkGameOver();
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


// New game
newGameBtn.addEventListener("click", initGame );