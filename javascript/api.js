

'use strict';
var token;
var githubCode = window.location.href;
var urlCode = new URL(githubCode)
var ghCode = urlCode.searchParams.get("code");
const proxyurl = "https://cors-anywhere.herokuapp.com/";

if (ghCode == null) {
  window.location.replace("/");
}

else {


  var clientID = "44203f7dbb6402bb922b"
  var clientSecret = "8f820f0af6d38f1a6945bafa6184b3e3d6ede080"
  var siteurl = "http://192.168.99.100"
  var redirect_url = siteurl + "/login/"

  var data;

  var requestToken = new XMLHttpRequest()
  requestToken.open('POST', proxyurl + 'https://github.com/login/oauth/access_token?client_id=' + clientID + '&client_secret=' + clientSecret + '&code=' + ghCode + '&redirect_uri=' + redirect_url, false)
  requestToken.setRequestHeader("Accept", "application/json")
  var token;
  requestToken.onload = function () {

    var data = JSON.parse(this.response)
    if (requestToken.status >= 200 && requestToken.status < 400) {

    } else {
      window.location.replace("/");
    }

    token = data.access_token;
  }

  requestToken.send()

}


var getOrg = new XMLHttpRequest()
getOrg.open('GET', proxyurl + "https://api.github.com/user/orgs", false)
getOrg.setRequestHeader("Authorization", " token " + token)
var org_array = [];
getOrg.onload = function () {

  var data = JSON.parse(this.response)

  data.forEach(org => {

    org_array.push(org.login);

  })

}


getOrg.send()

if (org_array.indexOf("Prolike-io") !== -1) {
  sessionStorage.setItem("user_t", token);
  sessionStorage.setItem("user", "user");

  if (token == null) {
    window.location.replace("/");
  } else {

    window.location.replace("/boards/");
  }
} else {
  window.location.replace("/noaccess/");
}




