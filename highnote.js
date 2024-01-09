const Spotify = require('node-spotify-api');
const readline = require('readline');
const {
    exec
} = require('child_process');

const api = new Spotify({
    id: "6e6655dfaf7e42a799ae941f92940378",
    secret: "dd93144cc6294e4680ce090923df9d1c"
})

const songName = process.argv.slice(2).join(" ")

api.search({
    type: 'track',
    query: songName
}, function(error, data) {
    if (error) {
        return console.error(error)
    }
    const topResult = data.tracks.items[0];
    const artistName = topResult.artists[0].name;
    const url = topResult.external_urls.spotify;
    const releaseDate = new Date(topResult.album.release_date);
    console.log(`The top search result for "${songName}" is the song "${topResult.name}", released by the artist "${artistName}" on ${releaseDate.toDateString()}."`);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Would you like to preview this song in spotify?", function(answer) {
        if (answer && answer.toLowerCase() !== 'no') {
            exec(`open -a "Google Chrome" ${url}`)
        } else {
            console.log('whatever bro...')
        }
        rl.close();
    });
});