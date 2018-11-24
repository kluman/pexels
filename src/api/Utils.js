function getApiKey() {
  return localStorage.getItem("pexels-key");
}

function setApiKey(key) {
  if (key) {
    localStorage.setItem("pexels-key", key);
  }
}

export { getApiKey, setApiKey };
