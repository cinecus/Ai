var socket = io();
var params = jQuery.deparam(window.location.search);

//When host connects to server
socket.on('connect', function () {

    document.getElementById('players').value = "";

    //Tell server that it is host connection
    socket.emit('host-join', params);
});

socket.on('showGamePin', function (data) {
    document.getElementById('gamePinText').innerHTML = data.pin;
});

//Adds player's name to screen and updates player count
socket.on('updatePlayerLobby', function (data) {
    const playerGrid = document.getElementById("playerGrid")
    document.getElementById("playerGrid").innerHTML = ""
    document.getElementById('players').value = "";
    for (var i = 0; i < data.length; i++) {
        const colors = ["red", "orange", "yellow", "blue", "yellow-light", "pink", "orange-dark"]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        const playerDiv = document.createElement('div')
        playerDiv.classList.add('player', randomColor) //fix สีแดง
        playerDiv.innerHTML = data[i].name
        playerGrid.appendChild(playerDiv)
        // document.getElementById('players').value += data[i].name + "\n";
    }
    document.getElementById("players-count").innerHTML = "👤 "+data.length

});

//Tell server to start game if button is clicked
function startGame() {
    socket.emit('startGame');
}
function endGame() {
    window.location.href = "/";
}

//When server starts the game
socket.on('gameStarted', function (id) {
    console.log('Game Started!');
    window.location.href = "/host/game/" + "?id=" + id;
});

socket.on('noGameFound', function () {
    window.location.href = '../../';//Redirect user to 'join game' page
});

