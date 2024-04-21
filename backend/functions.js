import fs from "fs";
import url from "url";
import path, { resolve } from "path";
// __dirname variable. kopiertes code snippet. wäre bei Verwendung von require zum importieren nicht nötig
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

//readJson liest die die benötigte Datei per Promise ein.
export function readJson(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const jsonString = data.toString();
                const jsonObject = JSON.parse(jsonString);
                resolve(jsonObject);
            }
        });
    });
}
// Übergibt den Pfad und ruft readJson auf
export function myPathRead() {
    return readJson(__dirname + "/data/g-book.json");
}
// schreibt Datei per Promise
export function writeJson(path, jsObject) {
    return new Promise((resolve, reject) => {
        const jsonString = JSON.stringify(jsObject, null, 4);
        fs.writeFile(path, jsonString, (err) => {
            if (err) {
                return reject(err);
            } else {
                resolve(jsObject);
            }
        });
    });
}
// ruft writeJson und übergibt path
export function myPathWrite(postsArray) {
    return writeJson(__dirname + "/data/g-book.json", postsArray);
}
