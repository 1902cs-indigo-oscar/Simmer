import scraper from './scraping/index.js';

chrome.tabs.onUpdated.addListener(toggleIcon);
chrome.tabs.onActivated.addListener(toggleIcon);

function toggleIcon() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let url = tabs[0].url, site = '';
    const urlTail = url.split("www.")[1];
    if (urlTail) site = urlTail.split(".com")[0];
    if (url && scraper[site]) {
      chrome.browserAction.setIcon({ path: "enabled.png" });
    }
    else {
      chrome.browserAction.setIcon({ path: "disabled.png" });
    }
  })
}