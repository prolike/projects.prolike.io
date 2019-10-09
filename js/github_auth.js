

var provider = new firebase.auth.GithubAuthProvider();
provider.addScope('repo');

firebase.auth().signInWithPopup(provider).then(function(result) {
// This gives you a GitHub Access Token. You can use it to access the GitHub API.
var token = result.credential.accessToken;
console.log(token);
// The signed-in user info.
var user = result.user;
console.log(user.email);
var userImage = document.querySelector("#user-image");

// appending the user profile image

var userPic = document.createElement("img");
userPic.src=user.photoURL;
userImage.append(userPic);

// appending the user email address

var userEmail = document.querySelector("#user-email");
userEmail.innerHTML = user.email;


// ...
}).catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
// The email of the user's account used.
var email = error.email;
// The firebase.auth.AuthCredential type that was used.
var credential = error.credential;
// ...
});

function githubSignout(){
   firebase.auth().signOut()

   .then(function() {
      console.log('Signout successful!')
   }, function(error) {
      console.log('Signout failed')
   });
}
