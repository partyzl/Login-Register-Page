const url = window.location.hostname.includes('localhost')
	? 'http://localhost:3000'
	: 'another url if I want to deploy';

async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password_digest: e.target.password.value
            })
        };
        const r = await fetch(`${url}/auth/login`, options);
        const data = await r.json();
        console.log("data: "+ data);
        if(!data.success) {
            throw new Error("Login not authorised")
        }
        login(data.token);
    } catch (error) {
        console.warn(error);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`${url}/auth/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

const login = token => {
    const user  = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);
    window.location.href = "http://127.0.0.1:5500/client/static/dash.html"
}

function logout(){
    localStorage.clear();
    window.location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

const loginForm = document.querySelector("#submit-btn")
loginForm.addEventListener("submit", requestLogin);