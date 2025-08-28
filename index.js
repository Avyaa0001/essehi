const fs = require("fs").promises;
const path = require("path");

async function cat(filePaths, outputFilePath) {
    const results = [];

    for (const p of filePaths) {
        try {
            const stat = await fs.stat(p);
            if (stat.isFile()) {
                let content = await fs.readFile(p, "utf-8");
                // Handle empty source file → represent as empty string (so it adds a blank line)
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

    // ensure parent directory exists
    const dir = path.dirname(outputFilePath);
    await fs.mkdir(dir, { recursive: true });

    // write joined results (empty array → empty file, empty string → empty line)
    await fs.writeFile(outputFilePath, results.join("\n"), "utf-8");
}

module.exports = { cat };
