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
    const assistsLabel = document.getElementById("assists-label")
    const assists = document.getElementById("assists");
    const goalsPerMatch = document.getElementById("goals-per-match");
    const passesPerMinute = document.getElementById("passes-per-minute");

    changePlayer(playerData[3]);
    // fails for playerData[3]

    function changePlayer(player) {
        // Change player image
        playerImg.src = "assets/p" + player.player.id + ".png";
        console.log("changed image to: " + "p" + player.player.id + ".png");
        // Change player name
        playerName.innerHTML = player.player.name.first + " " + player.player.name.last;
        console.log("Player name: " + player.player.name.first + " " + player.player.name.last);
        // Change player position
        playerPosition.innerHTML = decodePosition(player.player.info.position);
        // Change club badge
        clubBadge.style.backgroundPosition = getBadge(player.player.currentTeam.shortName);
        console.log("Plays for: " + player.player.currentTeam.name);

        // Change Goals
        if (player.stats[0].name === "goals") goals.innerHTML = player.stats[0].value;

        if (player === playerData[3]) {
            apperances.innerHTML = player.stats[5].value;
            // There are no assists for Mertesacker
            assists.innerHTML = "0";
            goalsPerMatch.innerHTML = roundTwo(player.stats[0].value / player.stats[5].value);
            passesPerMinute.innerHTML = roundTwo((player.stats[4].value + player.stats[7].value) / player.stats[6].value);
        } else {
            // Change Apperances
            if (player.stats[6].name === "appearances") apperances.innerHTML = player.stats[6].value;
            // Change Assists
            if (player.stats[5].name === "goal_assist") assists.innerHTML = player.stats[5].value;
            // Change Goals per match
            if (player.stats[0].name === "goals" && player.stats[6].name === "appearances") goalsPerMatch.innerHTML = roundTwo(player.stats[0].value / player.stats[6].value);
            // Change passesPerMinute
            if (player.stats[4].name ===  "fwd_pass" && 
                player.stats[8].name === "backward_pass" && 
                player.stats[7].name === "mins_played") {
                passesPerMinute.innerHTML = roundTwo(getTotalPasses(player) / player.stats[7].value);
            }
        }
    }
})

function decodePosition(code) {
    switch (code) {
        case "D":
            return "Defender";
            break;
        case "M":
            return "Midfielder";
            break;
        case "F":
            return "Striker";
            break;
    }
}

function getBadge(team) {
    switch (team) {
        case "Spurs":
            return "-500px -1000px";
            break;
        case "Man City":
            return "-800px -700px";
            break;
        case "Man Utd":
            return "-600px -800px";
            break;
        case "Arsenal":
            return "-100px -100px";
            break;
        case "Leicester":
            return "0px 0px";
            break;
    }
}

function roundTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function getTotalPasses(player) {
    return player.stats[4].value + player.stats[8].value;
}