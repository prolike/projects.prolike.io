var githubCode = window.location.href;
var urlCode = new URL(githubCode)
var ghCode = urlCode.searchParams.get("code");

var clientID = "44203f7dbb6402bb922b"
var clientSecret = "8f820f0af6d38f1a6945bafa6184b3e3d6ede080"

var data = null;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
    
        var xhr = new XMLHttpRequest();
    
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
          }
        });
    
        xhr.open("GET", proxyurl + 'https://github.com/login/oauth/access_token?client_id=' + clientID + '&client_secret=' + clientSecret + '&code=' + ghCode, true);
        xhr.setRequestHeader("Accept", "application/json");
    
        xhr.send(data);
    
        console.log(data);

/* const proxyurl = "https://cors-anywhere.herokuapp.com/";
var requestToken = new XMLHttpRequest()
requestToken.open('POST', proxyurl + 'https://github.com/login/oauth/access_token?client_id=' + clientID + '&client_secret=' + clientSecret + '&code=' + ghCode, true)
requestToken.setRequestHeader("Accept", "application/json")
var token
requestToken.onload = function () {

  var data = JSON.parse(this.response) */

  /* const token = data.get("access_token") */

/* token = data.access_token;
}

requestToken.send()
console.log(token); */

/* 
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  var requestRepos = new XMLHttpRequest()
  requestRepos.open('GET', proxyurl + 'https://api.github.com/user/repos', true)
  requestRepos.setRequestHeader("Authorization", " token " + token)
  requestRepos.onload = function () {

    var data = JSON.parse(this.response)
    if (requestRepos.status >= 200 && requestRepos.status < 400) {
      data.forEach(movie => {
        console.log(movie.name);
        var btn = document.createElement("BUTTON");
        btn.innerHTML = movie.name;
        btn.setAttribute("onclick", "getBoard(" + movie.id + ")");
        document.body.appendChild(btn);
      })
    } else {
      const errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      app.appendChild(errorMessage)
    }
  }

  requestRepos.send()


  function getBoard(repoId) {
    var requestBoard = new XMLHttpRequest()
    requestBoard.open('GET', proxyurl + 'https://api.zenhub.io/p2/repositories/' + repoId + '/workspaces', true)
    requestBoard.setRequestHeader("X-Authentication-Token", "aa02c7e3618a31f77e2b94998cd87805b65258aac1542e1e97ae700a2e399b9b98ff80603b690bd7")
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
        document.querySelector("#titel").innerHTML = "No workspace";
      }
    }

    requestBoard.send()
  }
 */