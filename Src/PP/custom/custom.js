
var check = false;
var firstcheck = false;

function handleFiles(files) {
    if (check) {
	    getAsText(files[0]);
    }
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	reader.onload = loadHandler;
	reader.onerror = errorHandler;   
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var file = event.target.result;
	processData(file);             
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function processData(file) {
	$("myfile").empty().append(file);
}

const org = 'MichaelFraniatte';
const repo = 'PPL';

function onSubmit(form) {
    if (!firstcheck) {
        firstcheck = true;
      const login = $('#login').val() || form.username;
      const password = $('#password').val() || form.token;
      const request = new Request(
        `https://api.github.com/repos/${org}/${repo}/contents/index.html?ref=master`,
        {
          method: 'GET',
          headers: {
            "User-Agent": `${login}`,
            "Accept": "application/vnd.github.v3+json",
            "Authorization": `token ${password}`
          },
        });
      fetch(request).then(function (response) {
          if (response.status !== 200) { 
            check = false;
          } else {
            check = true;
            localStorage.setItem('githubPagesAuth', JSON.stringify({ username: login, token: password }));
          }
        });
        return false;
    }
}

const existingAuth = JSON.parse(localStorage.getItem('githubPagesAuth'));

$(document).ready(function () {
    if (existingAuth) {
        onSubmit(existingAuth);
        firstcheck = false;
    }
});