let playerData = '';

getData("../../data/player-stats.json").then(data => {
    playerData = data;
    console.log(playerData[0].player.name.first + " " + playerData[0].player.name.last);
    console.log(
        decodePosition(playerData[0].player.info.position));
})

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

function decodePosition(code) {
    if (code === "D")
        return "Defender";
}