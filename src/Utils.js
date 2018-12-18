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

export async function saveImage(photo) {
  return new Promise((resolve, reject) => {
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

      var dest = `${fullPath}/${photo.id}.jpg`;
      var file = fs.createWriteStream(dest);
      https
        .get(photo.src.original, response => {
          response.pipe(file);

          file.on("finish", () => {
            file.close();
            // TODO: ExtendScript callback (new function wrapped in Promise async/await)
            resolve(fullPath);
          });
        })
        .on("error", err => {
          fs.unlink(dest); // Delete the file async.
          throw new Error(`${err.message}`);
        });
    } else {
      throw new Error(
        `Not in Adobe CEP environemnt, unable not download photo ${photo.id}`
      );
    }
  });
}

export async function nativePlaceImage(path, width, height) {
  return new Promise((resolve, reject) => {
    csInterface.evalScript(
      `pexelsPlaceImage('${path}', ${width}, ${height})`,
      res => {
        if (res === "Ok") {
          resolve(true);
        } else {
          throw new Error(res);
        }
      }
    );
  });
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
