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
            }).catch(err => reject(err))
    })
}

getData("../../data/player-stats.json").then(data => {
    playerData = data;
    const playerSelector = document.getElementById("player-select");

    function buildDropdown() {

        for (let i = 0; i < playerData.length; i ++) {
            let name = playerData[i].player.name.first + " " + playerData[i].player.name.last;
            let element = document.createElement("option");
            element.textContent = name;
            element.value = name;
            playerSelector.appendChild(element);
        }
    }

    playerSelector.addEventListener('change', (selection) => {
        switch (selection.target.value) {
            case "Toby Alderweireld":
                changePlayer(playerData[0]);
                break;
            case "Yaya Touré":
                changePlayer(playerData[1]);
                break;
            case "Wayne Rooney":
                changePlayer(playerData[2]);
                break;
            case "Per Mertesacker":
                changePlayer(playerData[3]);
                break;
            case "Riyad Mahrez":
                changePlayer(playerData[4]);
                break;
        }
    });



    function changePlayer(player) {
        const playerImg = document.getElementById("player-img");
        const playerName = document.getElementById("player-name");
        const playerPosition = document.getElementById("player-position");
        const clubBadge = document.getElementById("badge");
        const apperances = document.getElementById("appearances");
        const goals = document.getElementById("goals");
        const assists = document.getElementById("assists");
        const goalsPerMatch = document.getElementById("goals-per-match");
        const passesPerMinute = document.getElementById("passes-per-minute");

        //Clear console
        console.clear();

        // Change player image
        playerImg.src = "assets/p" + player.player.id + ".png";
        playerImg.alt = player.player.name.first + " " + player.player.name.last;
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
            if (player.stats[0].name === "goals" &&
            player.stats[6].name === "appearances") goalsPerMatch.innerHTML = roundTwo(player.stats[0].value / player.stats[6].value);
            // Change passesPerMinute
            if (player.stats[4].name ===  "fwd_pass" && 
                player.stats[8].name === "backward_pass" && 
                player.stats[7].name === "mins_played") {
                passesPerMinute.innerHTML = roundTwo((player.stats[4].value + player.stats[8].value) / player.stats[7].value);
            }
        }
    }
    buildDropdown()
    changePlayer(playerData[0]);
})

// Takes player position code and returns a string
function decodePosition(code) {
    switch (code) {
        case "D": return "Defender";
        case "M": return "Midfielder";
        case "F": return "Striker";
    }
}

// Takes current team short name and returns the offset for the spritesheet
function getBadge(team) {
    switch (team) {
        case "Spurs": return "-500px -1000px";
        case "Man City": return "-800px -700px";
        case "Man Utd": return "-600px -800px";
        case "Arsenal": return "-100px -100px";
        case "Leicester": return "0px 0px";
    }
}

// rounds two numbers to 2 decimal places if nessercary
function roundTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}