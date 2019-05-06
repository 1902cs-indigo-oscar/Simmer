
const savePageButton = document.getElementById('save-page-btn')
const pageSavedMessage = document.getElementById('page-saved-message')

checkLoginStatus();

savePageButton.addEventListener('click', function (event) {
    event.preventDefault()
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        fetch('https://simmer.brook.li/api/articles', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: tabs[0].url
            })
        }).then(response => {
            if (response.status === 404)
                pageSavedMessage.innerText = 'Please login to Simmer first.';
            else
                response.json().then(data => {
                    pageSavedMessage.innerText = 'Page saved successfully!';
                })
        }).catch(error => {
            pageSavedMessage.innerText = 'Page saving failed: ' + error
        })
    })
})

const loginForm = document.getElementById('auth-form')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const loginErrorMessage = document.getElementById('login-error-message')

loginForm.addEventListener('submit', function (event) {
    event.preventDefault()
    fetch('https://simmer.brook.li/auth/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: usernameInput.value,
            password: passwordInput.value
        })
    }).then(response => {
        if (response.status === 401) {
            loginErrorMessage.innerText = 'wrong username and/or password';
        }
        else {
            response.json().then(data => {
                checkLoginStatus();
            })
        }
    }).catch(error => {
        loginErrorMessage.innerText = 'Login request failed: ' + error
    })
    loginForm.reset()
})

const loginInfo = document.getElementById('login-info')

function checkLoginStatus() {
    fetch('https://simmer.brook.li/auth/me', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    }).then(response => {
        if (response.status === 200) {
            response.json().then(data => {
                const logoutButton = document.createElement('button');
                logoutButton.innerText = 'logout';
                savePageButton.disabled = false;
                    logoutButton.onclick = function () {
                        savePageButton.disabled = true;
                        fetch('https://simmer.brook.li/auth/logout', {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include'
                        }).then(() => {
                            location.reload();
                        }).catch(error => {
                            console.error(error);
                        })
                    }
                loginInfo.innerHTML = '<p>Hello, ' + data.email + '<p>';
                loginInfo.appendChild(logoutButton);
            })
        }
        savePageButton.disabled = true;
    }).catch(error => {
        console.error(error);
    })
}
