'use strict';
if (sessionStorage.getItem("user") == null) {
    window.location.replace("/");
}

var token = sessionStorage.getItem("user_t");
var repo_name = sessionStorage.getItem("repo");

const proxyurl = "https://cors-anywhere.herokuapp.com/";

var zenhub_token = "aa02c7e3618a31f77e2b94998cd87805b65258aac1542e1e97ae700a2e399b9b98ff80603b690bd7";

var getSRepos = new XMLHttpRequest()
var repo_id;
getSRepos.open('GET', proxyurl + 'https://api.github.com/repos/prolike/' + repo_name, false)
getSRepos.setRequestHeader("Authorization", " token " + token)
getSRepos.onload = function () {
    var data = JSON.parse(this.response)
    if (getSRepos.status >= 200 && getSRepos.status < 400) {
        document.querySelector(".board-heading").innerHTML = data.name;
        repo_id = data.id;
    }



    else {


    }
}

getSRepos.send()



var requestBoard = new XMLHttpRequest()
requestBoard.open('GET', proxyurl + 'https://api.zenhub.io/p2/repositories/' + repo_id + '/workspaces', true)
requestBoard.setRequestHeader("X-Authentication-Token", zenhub_token)

requestBoard.onload = function () {
    var data = JSON.parse(this.response)
    if (requestBoard.status >= 200 && requestBoard.status < 400) {
        console.log(data);

    }



    else {


    }
}

requestBoard.send()