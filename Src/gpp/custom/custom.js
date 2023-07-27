
var firstcheck = false;

const org = 'MichaelFraniatte';

function onSubmit(form) {
    if (!firstcheck) {
        firstcheck = true;
        const form = JSON.parse(localStorage.getItem('githubPagesAuth'));
        const login = $('#login').val() || form.username;
        const password = $('#password').val() || form.token;
        const repo = $('#page').val() || form.page;
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
                localStorage.setItem('githubPagesAuth', JSON.stringify({ username: login, token: password, page: repo }));
            });
            }
        });
        return false;
    }
}