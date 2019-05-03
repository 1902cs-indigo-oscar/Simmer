const runScriptButton = document.getElementById('run-script-btn')

runScriptButton.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'test-scraper.js'});
    })
})

const scrapedOutputNode = document.getElementById('scraped-output')

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.scrapedOutput){
            scrapedOutputNode.innerText = request.scrapedOutput
        }
        return true
    })

const loginForm = document.getElementById('auth-form')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const loginOutputNode = document.getElementById('login-status-output')

loginForm.addEventListener('submit', function(event){
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
        response.json().then(data => {
            loginOutputNode.innerText = 'Login request: ' + data.email
        })
    }).catch(error => {
        loginOutputNode.innerText = 'Login request failed: ' + error
    })
    loginForm.reset()
})

const checkLoginButton = document.getElementById('check-login-btn')

checkLoginButton.addEventListener('click', function(){
    fetch('https://simmer.brook.li/auth/me', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    }).then(response => {
        response.json().then(data => {
            loginOutputNode.innerText = 'Login status request: ' + data.email
        })

    }).catch(error => {
        loginOutputNode.innerText = 'Login status request failed:' + error
    })
})

loginOutputNode.innerText = window.origin

const testXhrButton = document.getElementById('test-xhr')
const xhrOutputNode = document.getElementById('test-xhr-output')

testXhrButton.addEventListener('click', function(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.google.com", true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            xhrOutputNode.innerText = xhr.responseText
        }
    }
    xhr.send()
})

