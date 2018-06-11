var request = require('request');
var tokens = require('./secrets.js');
var fs = require('fs');
var contributors = [];

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

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
    for (i = 0; i < result.length; i++) {
      downloadImageByURL(result[i].avatar_url, result[i].login)
      console.log(result[i].avatar_url);
    }
});

function downloadImageByURL(url, filePath) {
    filePath = "./avatars/" + filePath + ".jpg"
    request(url).pipe(fs.createWriteStream(filePath));
  };



