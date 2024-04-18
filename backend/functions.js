import fs from "fs";
import url from "url";
import path, { resolve } from "path";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

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

export function myPathRead() {
    return readJson(__dirname + "/data/g-book.json");
}

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

export function myPathWrite(postsArray) {
    return writeJson(__dirname + "/data/g-book.json", postsArray);
}
