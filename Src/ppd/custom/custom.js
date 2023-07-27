
var firstcheck = false;

const org = 'MichaelFraniatte';
const repo = 'daynote';

function onSubmit(form) {
    if (!firstcheck) {
        firstcheck = true;
        const login = $('#login').val() || form.username;
        const password = $('#password').val() || form.token;
        const request = new Request(`https://api.github.com/repos/${org}/${repo}/contents/${repo}.html?ref=main`, {
          method: 'GET',
          headers: {
            "User-Agent": `${login}`,
            "Accept": 'application/vnd.github.v3.raw',
            "Authorization": `token ${password}`
          },
        });
        fetch(request).then(function (response) {
          if (response.status === 200) {
            response.text().then(function (txt) {
                var content = txt;
	            $("myfile").empty().append(content);
                localStorage.setItem('githubPagesAuth', JSON.stringify({ username: login, token: password }));
            });
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