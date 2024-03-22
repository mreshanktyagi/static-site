const

tGame = document.getElementById("t-game"),
startMenu = document.getElementById("start-menu"),
message = document.getElementById("message"),
currPlayer = document.getElementById("currPlayer"),

game = [[document.getElementById("pos-top-left"),   document.getElementById("pos-top"),     document.getElementById("pos-top-right")],
        [document.getElementById("pos-left"),       document.getElementById("pos-middle"),  document.getElementById("pos-right" )],
        [document.getElementById("pos-bottom-left"), document.getElementById("pos-bottom"), document.getElementById("pos-bottom-right" )]];

var marks = ["X", "O"], markSwitch, msg;

function getMark () { 
    markSwitch = !markSwitch;
    return (markSwitch)?marks[0]:marks[1];
}

function startGame (event) { 
    markSwitch = false;
    msg = "This Match is a Draw!";
    currPlayer.innerHTML = "Next Move : [ X ]    <br> Current Player : Player [ 1 ]";
    event.target.innerHTML = "RESTART";
    tGame.style.display = "block";
    startMenu.style.display = "none";
    game.forEach( row => { row.forEach( col => col.innerHTML = "" ) } )
}

function gameEngine (event) { 
    if (event.target.innerHTML == "") { 
        event.target.innerHTML = getMark();
        currPlayer.innerHTML = `Next Move : [ ${getMark()} ]    <br/> Current Player : Player [ ${(marks.indexOf(getMark())+3)%2+1} ]`;
        if(isGameOver()) showEndWindow();
    } else alert("This Box Is Already Marked!");
}

function checkWin (checkFor="", draw=false) { 
    let i, j, total=0, ocr = [0,0,0,   0,0,0,   0,0]; // Occurance: Row Column Diagonal
    for(i=0; i<3; i++)   for(j=0; j<3; j++)   if(game[i][j].innerHTML==checkFor) { 
        ocr[i]++; ocr[j+3]++; i==j?ocr[6]++:0; i+j==2?ocr[7]++:0; total++;
    }
    return ((draw && total==0 ) || (!draw && ocr.find(e=>e==3)!=undefined));
}

function showEndWindow () { 
    tGame.style.display = "none";
    startMenu.style.display = "block";
    message.innerHTML = msg;
}

var isGameOver = () => checkWin("X") ? youWin(1) : checkWin("O") ? youWin(2) : checkWin("",true) ? true : false;
var youWin = (player) => msg = `Player ${player} - Wins this Match!`;

document.getElementById("start-btn").addEventListener("click", event => startGame(event) );
game.forEach( row => { row.forEach( col => col.addEventListener( "click", event => gameEngine(event) ) ) } )