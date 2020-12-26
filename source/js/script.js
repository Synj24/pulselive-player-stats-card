let playerData = '';

// Generic function to getData from a url
function getData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.json();
            }).then((data) => {
                data = data.players;
                resolve(data);
            })
    })
};

getData("../../data/player-stats.json").then(data => {
    playerData = data;

    const playerImg = document.getElementById("player-img");
    const playerName = document.getElementById("player-name");
    const playerPosition = document.getElementById("player-position");
    const clubBadge = document.getElementById("badge");
    const apperances = document.getElementById("appearances");
    const goals = document.getElementById("goals");
    const assists = document.getElementById("assists");
    const goalsPerMatch = document.getElementById("goals-per-match");
    const passesPerMinute = document.getElementById("passes-per-minute");


    console.log(playerData[0].player.id);

    // Change player image
    playerImg.src = "assets/p" + playerData[0].player.id + ".png";
    // Change player name
    playerName.innerHTML = playerData[0].player.name.first + " " + playerData[0].player.name.last;
    // Change player position
    playerPosition.innerHTML = decodePosition(playerData[0].player.info.position);
    // Change club badge
    clubBadge.style.backgroundPosition = getBadge(playerData[0].player.currentTeam.name);
    // Change Apperances
    apperances.innerHTML = playerData[0].stats[6].value;
    // Change Goals
    goals.innerHTML = playerData[0].stats[0].value;
    // Change Assists
    assists.innerHTML = playerData[0].stats[5].value;
    // Change Goals per match
    goalsPerMatch.innerHTML = roundTwo(playerData[0].stats[0].value / playerData[0].stats[6].value);
    // Change passesPerMinute
    passesPerMinute.innerHTML = roundTwo(getTotalPasses(playerData[0]) / playerData[0].stats[7].value);
})


function decodePosition(code) {
    if (code === "D")
        return "Defender";
}

function getBadge(team) {
    if (team === "Tottenham Hotspur")
        return "-500px -1000px";
}

function roundTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function getTotalPasses(player) {
    return player.stats[4].value + player.stats[8].value;
}