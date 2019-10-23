'use strict';
if (sessionStorage.getItem("user") == null) {
    window.location.replace("/");
}

var token = sessionStorage.getItem("user_t");

const proxyurl = "https://cors-anywhere.herokuapp.com/";

var zenhub_token = "aa02c7e3618a31f77e2b94998cd87805b65258aac1542e1e97ae700a2e399b9b98ff80603b690bd7";



var getUser = new XMLHttpRequest()
getUser.open('GET', proxyurl + 'https://api.github.com/user', true)
getUser.setRequestHeader("Authorization", " token " + token)
getUser.onload = function () {

    var data = JSON.parse(this.response)
    if (getUser.status >= 200 && getUser.status < 400) {
        sessionStorage.setItem("user-img", data.avatar_url)
        document.querySelector(".username").innerHTML = data.login;
        sessionStorage.setItem("user", data.login)
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

getUser.send()

var getTeams = new XMLHttpRequest()
getTeams.open('GET', proxyurl + 'https://api.github.com/user/teams', false)
getTeams.setRequestHeader("Authorization", " token " + token)
getTeams.setRequestHeader("X-OAuth-Scopes", "user")
getTeams.setRequestHeader("X-Accepted-OAuth-Scopes", "user")
var teamArray = [];
getTeams.onload = function () {

    var data = JSON.parse(this.response)
    if (getTeams.status >= 200 && getTeams.status < 400) {
        data.forEach(team => {

            teamArray.push(team.name);

        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

getTeams.send()

teamArray.forEach(getRepos);


function getRepos(value, index, array) {
    var getSRepos = new XMLHttpRequest()
    getSRepos.open('GET', proxyurl + 'https://api.github.com/repos/prolike/' + value, false)
    getSRepos.setRequestHeader("Authorization", " token " + token)
    var repo_name; 
    getSRepos.onload = function () {
        var data = JSON.parse(this.response)
        if (getSRepos.status >= 200 && getSRepos.status < 400) {
            var btn2 = document.createElement("BUTTON");
            btn2.innerHTML = data.name;
            
            btn2.setAttribute('onclick', "showBoard('" + data.name + "')")
            document.body.appendChild(btn2);

        }



        else {


        }
    }

    getSRepos.send()
}


function showBoard(repo_name) {
   
    var name = repo_name.replace(/[^\w\s]/gi, '')
    window.location.replace("/boards/" + name + "/");

    
}

/*
var requestRepos = new XMLHttpRequest()
requestRepos.open('GET', proxyurl + 'https://api.github.com/user/repos', false)
requestRepos.setRequestHeader("Authorization", " token " + token)
var repoArray = [];
requestRepos.onload = function () {

    var data = JSON.parse(this.response)
    if (requestRepos.status >= 200 && requestRepos.status < 400) {


        data.forEach(repo => {

            repoArray.push(repo.id);

        })


    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

requestRepos.send()

console.log(repoArray) */

/* for(var i in repoArray) { */
/* var requestBoard = new XMLHttpRequest()
console.log(i.valueOf);
requestBoard.open('GET', proxyurl + 'https://api.zenhub.io/p2/repositories/' + i.valueOf + '/workspaces', true)
requestBoard.setRequestHeader("X-Authentication-Token", zenhub_token)
requestBoard.onload = function () {
    var data = JSON.parse(this.response)
    if (requestBoard.status >= 200 && requestBoard.status < 400) {
        console.log(data);

        data.forEach(board => {
            console.log(board.name);
            var btn2 = document.createElement("BUTTON");
            btn2.innerHTML = board.name;
            document.body.appendChild(btn2);
        })
    }



    else {
        var btn2 = document.createElement("BUTTON");
        btn2.innerHTML = "no board";
        document.body.appendChild(btn2);
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)

    }
}

requestBoard.send() */
/* } */
