var request = require('request');
var tokens = require('./secrets.js');
var fs = require('fs');
var contributors = [];
owner = process.argv[2];
name = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': tokens.GITHUB_TOKEN
        }
    };
    request(options, function(err, res, body) {
        contributors = JSON.parse(body);
        cb(err, contributors);
    });
};


if (owner === undefined || name === undefined) {
    console.log("Please try again by entering a repo owner and repo name!")
} else {
    getRepoContributors(owner, name, function(err, result) {
        console.log("Errors:", err);
        console.log("Result:", result);
        for (i = 0; i < result.length; i++) {
            downloadImageByURL(result[i].avatar_url, result[i].login)
            console.log(result[i].avatar_url);
        }
    });
}

function downloadImageByURL(url, filePath) {
    filePath = "./avatars/" + filePath + ".jpg"
    request(url).pipe(fs.createWriteStream(filePath));
};

