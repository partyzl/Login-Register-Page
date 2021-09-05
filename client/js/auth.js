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
        const r = await fetch(url, options);
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

const login = token => {
    const user  = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("password", user.password_digest);
    window.location.href = "./static/dash"
}

const loginForm = document.querySelector("#submit-btn")
loginForm.addEventListener("submit", requestLogin);