const fs = require('fs');

function writeFile(fileName, contents) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, contents, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

module.exports = {
    writeFile
}

