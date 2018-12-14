/*
 * The Adobe CEP environment provides node along with various node modules.
 */
const cep = window.cep;
const cepNode = window.cep_node;
const csInterface = window.csInterface;
const process = window.process;
const fs = cep && cep.fs;

export function getApiKey() {
  return localStorage.getItem("pexels-key");
}

export function setApiKey(key) {
  if (key) {
    localStorage.setItem("pexels-key", key);
  }
}

export function nativeHostCapabilities(script) {
  if (csInterface && csInterface.hostEnvironment) {
    return csInterface.getHostCapabilities(script);
  }
}

export function nativeEvalScript(script) {
  // csInterface.evalScript(script);
}

export function nativeAddEventListener(type, listener) {
  // csInterface.addEventListener(type, listener);
}

export function nativeRemoveEventListener(type, listener) {
  // csInterface.removeEventListener(type, listener);
}

export function nativeOpenBrowserUrl(url) {
  if (cep && cep.util) {
    cep.util.openURLInDefaultBrowser(url);
  }
}

export function nativeInit() {
  if (cep && process) {
    const home =
      process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
    const path = `${home}/pexels`;

    if (fs.stat(path) !== 0) {
      fs.makedir(path);
    }
  }
}
