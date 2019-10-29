'use strict';

// Check if there is a user logged in

if (sessionStorage.getItem("user") == null) {
    window.location.replace("/");
}

// get the sessioned profile image

document.querySelector(".profile-picture").src = sessionStorage.getItem('user-img');



var token = sessionStorage.getItem("user_t");
var repo_name = document.querySelector(".cost-name").innerHTML;

const proxyurl = "https://cors-anywhere.herokuapp.com/";

var zenhub_token = "aa02c7e3618a31f77e2b94998cd87805b65258aac1542e1e97ae700a2e399b9b98ff80603b690bd7";

var userlogin = sessionStorage.getItem("user");

// Get repo id
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

// get the workspaces related to the selected repo.

var getWorkspaces = new XMLHttpRequest()
getWorkspaces.open('GET', proxyurl + 'https://api.zenhub.io/p2/repositories/' + repo_id + '/workspaces', false)
getWorkspaces.setRequestHeader("X-Authentication-Token", zenhub_token)

var workspaceArray = [];
var repoArray = [];

getWorkspaces.onload = function () {
    var data = JSON.parse(this.response)
    if (getWorkspaces.status >= 200 && getWorkspaces.status < 400) {
        data.forEach(workspace => {

            workspaceArray.push(workspace.id);

            workspace.repositories.forEach(repo => {
                repoArray.push(repo)
            })

        })
    }
    else {
    }
}

getWorkspaces.send()

// Get all issues and pipelines from all workspaces out in a json var

var allIssues = [];
var allpipelines = [];
workspaceArray.forEach(getWorkspace);

function getWorkspace(value) {
    var getPipeline = new XMLHttpRequest()
    getPipeline.open('GET', proxyurl + 'https://api.zenhub.io/p2/workspaces/' + value + '/repositories/' + repo_id + '/board', false)
    getPipeline.setRequestHeader("X-Authentication-Token", zenhub_token)

    getPipeline.onload = function () {
        var data = JSON.parse(this.response)
        if (getPipeline.status >= 200 && getPipeline.status < 400) {
            data.pipelines.forEach(pipeline => {

                var issueEstimates = [];
                pipeline.issues.forEach(issue => {
                    if (issue.estimate != undefined) {
                        issueEstimates.push(issue.estimate.value);
                    }

                })

                var summedEstimates = sum(issueEstimates);

                function sum(obj) {
                    var sum = 0;
                    for (var el in obj) {
                        if (obj.hasOwnProperty(el)) {
                            sum += parseFloat(obj[el]);
                        }
                    }
                    return sum;
                }


                var pipelineItem = document.createElement("DIV");



                var text = '<h3>' + pipeline.name + " " + pipeline.issues.length + ' Estimates: ' + summedEstimates + '</h3>';
                pipelineItem.innerHTML = text;

                pipelineItem.setAttribute('class', "pipeline")
                document.querySelector(".pipeline-box").appendChild(pipelineItem);



                if (pipeline.name == "To do") {
                    pipeline.issues.forEach(issue => {
                        allIssues.push(issue);
                    })
                }
            })
            allIssues.slice(0, 2);
        }

        else {
        }
    }

    getPipeline.send()
}







// Get newest open issue

var newestIssues = new XMLHttpRequest()
newestIssues.open('GET', proxyurl + 'https://api.github.com/repos/prolike/' + repo_name + '/issues?sort=created', false)
newestIssues.setRequestHeader("Authorization", " token " + token)

var newissueDate;

newestIssues.onload = function () {
    var data = JSON.parse(this.response)
    if (newestIssues.status >= 200 && newestIssues.status < 400) {

        document.querySelector(".ni-number").innerHTML += data[0].number;
        document.querySelector(".ni-title").innerHTML = data[0].title;
        newissueDate = data[0].created_at;


        document.querySelector(".ni-cont").innerHTML = data[0].user.login;
        document.querySelector(".ni-link").href = data[0].html_url;
    }
    else {
    }
}

newestIssues.send()

var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

var newdate = new Date(newissueDate);

var formatedNewissueDate = newdate.toLocaleDateString("en-GB", + dateOptions);

document.querySelector(".ni-time").innerHTML = formatedNewissueDate;


// get newest 'closed' issue

var newestClosedIssue = new XMLHttpRequest()
newestClosedIssue.open('GET', proxyurl + 'https://api.github.com/repos/prolike/' + repo_name + '/issues?state=closed&sort=updated', false)
newestClosedIssue.setRequestHeader("Authorization", " token " + token)

var newestClosedIssueDate;

newestClosedIssue.onload = function () {
    var data = JSON.parse(this.response)
    if (newestClosedIssue.status >= 200 && newestClosedIssue.status < 400) {

        document.querySelector(".ci-number").innerHTML += data[0].number;
        document.querySelector(".ci-title").innerHTML = data[0].title;
        newestClosedIssueDate = data[0].created_at;


        document.querySelector(".ci-cont").innerHTML = data[0].user.login;
        document.querySelector(".ci-link").href = data[0].html_url;
    }
    else {
    }
}

newestClosedIssue.send()

var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

var old_date = new Date(newestClosedIssueDate);

var formatedNewissueDate = old_date.toLocaleDateString("en-GB", + dateOptions);

document.querySelector(".ci-time").innerHTML = formatedNewissueDate;


// Get the contributors

var getContributors = new XMLHttpRequest()
getContributors.open('GET', proxyurl + 'https://api.github.com/repos/prolike/' + repo_name + '/contributors', false)
getContributors.setRequestHeader("Authorization", " token " + token)

var getMostconstributes = [];

getContributors.onload = function () {
    var data = JSON.parse(this.response)
    if (getContributors.status >= 200 && getContributors.status < 400) {
        data.forEach(contributors => {
            if (contributors.login != userlogin) {
                getMostconstributes.push(contributors)
            }
        }

        )
    }
    else {
    }
}

getContributors.send()

var cutContrubutors = getMostconstributes.slice(0, 3);


//list contributors


console.log(cutContrubutors);

cutContrubutors.forEach(contributor => {
    var contributorbox = document.createElement("DIV")
    var cont_pic = document.createElement("IMG");
    var cont_login_box = document.createElement("H3");

    cont_login_box.innerHTML = contributor.login;

    cont_pic.src = contributor.avatar_url;



    contributorbox.setAttribute("class", "contributer-box");
    contributorbox.appendChild(cont_pic);
    contributorbox.appendChild(cont_login_box);
    document.querySelector(".contributors").appendChild(contributorbox);



})

