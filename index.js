const fs = require("fs").promises;
const path = require("path");

async function cat(filePaths, outputFilePath) {
    const results = [];

    for (const p of filePaths) {
        try {
            const stat = await fs.stat(p);
            if (stat.isFile()) {
                const content = await fs.readFile(p, "utf-8");
                results.push(content);
            } else if (stat.isDirectory()) {
                results.push("Is a directory");
            } else {
                results.push("File not found");
            }
        } catch {
            results.push("File not found");
        }
    }

    const dir = path.dirname(outputFilePath);
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(outputFilePath, results.join("\n"), "utf-8");
}

module.exports = { cat };
