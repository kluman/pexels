/*
 * The Adobe CEP environment provides node along with various node modules.
 */
const cep = window.cep;
const csInterface = new window.CSInterface();
const hostEnvironment = csInterface.hostEnvironment;
const fs = hostEnvironment && window.cep_node.require("fs");
const https = hostEnvironment && window.cep_node.require("https");
const process = window.process;

export function getApiKey() {
  return localStorage.getItem("pexels-key");
}

export function setApiKey(key) {
  if (key) {
    localStorage.setItem("pexels-key", key);
  }
}

// TODO wrap this in a Promise
export function saveImage(photo) {
  if (hostEnvironment) {
    const path = homeDirectoryPath(),
      now = new Date(),
      year = now.getFullYear(),
      month = now.getMonth(),
      fullPath = `${path}/${year}/${month}`;

    if (!fs.existsSync(`${path}/${year}`)) {
      fs.mkdirSync(`${path}/${year}`);
    }

    if (!fs.existsSync(`${fullPath}`)) {
      fs.mkdirSync(`${fullPath}`);
    }

    console.log(`Start download`);
    var dest = `${fullPath}/${photo.id}.jpg`;
    var file = fs.createWriteStream(dest);
    https
      .get(photo.src.original, response => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          // TODO resolve
          console.log("finished");
        });
      })
      .on("error", err => {
        fs.unlink(dest); // Delete the file async.
        console.log(`Error ${err.message}`);
        // TODO throw Error when wrapped in promise
      });
  } else {
    // TODO throw Error
    console.log(
      `Not in Adobe CEP environemnt, can not download photo ${photo.id}`
    );
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
  if (hostEnvironment) {
    cep.util.openURLInDefaultBrowser(url);
  }
}

export function nativeInit() {
  if (hostEnvironment) {
    const path = homeDirectoryPath();

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }
}

function homeDirectoryPath() {
  if (hostEnvironment) {
    const home =
      process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
    return `${home}/Pexels`;
  }
}
