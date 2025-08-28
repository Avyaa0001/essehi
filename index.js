const fs = require("fs").promises;

async function cat(filePaths, outputFilePath) {
    const results = [];

    for (const path of filePaths) {
        try {
            const stat = await fs.stat(path);
            if (stat.isFile()) {
                const content = await fs.readFile(path, "utf-8");
                results.push(content);
            } else if (stat.isDirectory()) {
                results.push("Is a directory");
            } else {
                results.push("File not found");
            }
        } catch (err) {
            results.push("File not found");
        }
    }

    await fs.writeFile(outputFilePath, results.join("\n"), "utf-8");
}

module.exports = { cat };
