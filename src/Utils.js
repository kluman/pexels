import CSInterface from "adobe-cep/CEP_8.x/CSInterface.js";

function getApiKey() {
  return localStorage.getItem("pexels-key");
}

function setApiKey(key) {
  if (key) {
    localStorage.setItem("pexels-key", key);
  }
}

function nativeHostCapabilities(script) {
  const csInterface = new window.CSInterface();
  if (csInterface.hostEnvironment) {
    return csInterface.getHostCapabilities(script);
  }
}

function nativeEvalScript(script) {
  // csInterface.evalScript(script);
}

function nativeAddEventListener(type, listener) {
  // csInterface.addEventListener(type, listener);
}

function nativeRemoveEventListener(type, listener) {
  // csInterface.removeEventListener(type, listener);
}

export { getApiKey, setApiKey, nativeHostCapabilities };
