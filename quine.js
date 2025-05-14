"use strict";

const {readFileSync, writeFileSync} = require("node:fs");
const {stdout} = require("node:process");

const quine = "quine.js";

// The following hashtag is replaced with the source code
// It must be the first hashtag in the file
const source = "\"use strict\";\r\n\r\nconst {readFileSync, writeFileSync} = require(\"node:fs\");\r\nconst {stdout} = require(\"node:process\");\r\n\r\nconst quine = \"quine.js\";\r\n\r\n// The following hashtag is replaced with the source code\r\n// It must be the first hashtag in the file\r\nconst source = \"#\";\r\n\r\nif (source.length === 1) {\r\n    build();\r\n} else {\r\n    print();\r\n}\r\n\r\nfunction build() {\r\n    const sourceContent = readFileSync(__filename, {encoding: \"utf8\"});\r\n    const outputContent = replaceSource(sourceContent);\r\n    writeFileSync(quine, outputContent, {encoding: \"utf8\"});\r\n}\r\n\r\nfunction print() {\r\n    const outputContent = replaceSource(source);\r\n    stdout.write(outputContent);\r\n}\r\n\r\nfunction replaceSource(src) {\r\n    const chars = src.split(\"\");\r\n    for (let i = 0; i < chars.length; i++) {\r\n        if (chars[i].charCodeAt(0) === 35) { // Hashtag\r\n            chars[i] = escapeString(src);\r\n            break;\r\n        }\r\n    }\r\n    return chars.join(\"\");\r\n}\r\n\r\n/**\r\n * Escape special characters in a string\r\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#escape_sequences\r\n * @param {string} str\r\n * @returns {string}\r\n */\r\nfunction escapeString(str) {\r\n    str = str.replaceAll(\"\\\\\", \"\\\\\\\\\"); // Must be first\r\n\r\n    const escapeMap = {\r\n        \"\\0\": \"\\\\0\",\r\n        \"\\\`\": \"\\\\\\\`\",\r\n        \"\\\'\": \"\\\\\\\'\",\r\n        \"\\\"\": \"\\\\\\\"\",\r\n        \"\\n\": \"\\\\n\",\r\n        \"\\r\": \"\\\\r\",\r\n        \"\\v\": \"\\\\v\",\r\n        \"\\t\": \"\\\\t\",\r\n        \"\\b\": \"\\\\b\",\r\n        \"\\f\": \"\\\\f\",\r\n    };\r\n\r\n    for (const char of Object.keys(escapeMap)) {\r\n        str = str.replaceAll(char, escapeMap[char]);\r\n    }\r\n\r\n    return str;\r\n}\r\n";

if (source.length === 1) {
    build();
} else {
    print();
}

function build() {
    const sourceContent = readFileSync(__filename, {encoding: "utf8"});
    const outputContent = replaceSource(sourceContent);
    writeFileSync(quine, outputContent, {encoding: "utf8"});
}

function print() {
    const outputContent = replaceSource(source);
    stdout.write(outputContent);
}

function replaceSource(src) {
    const chars = src.split("");
    for (let i = 0; i < chars.length; i++) {
        if (chars[i].charCodeAt(0) === 35) { // Hashtag
            chars[i] = escapeString(src);
            break;
        }
    }
    return chars.join("");
}

/**
 * Escape special characters in a string
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#escape_sequences
 * @param {string} str
 * @returns {string}
 */
function escapeString(str) {
    str = str.replaceAll("\\", "\\\\"); // Must be first

    const escapeMap = {
        "\0": "\\0",
        "\`": "\\\`",
        "\'": "\\\'",
        "\"": "\\\"",
        "\n": "\\n",
        "\r": "\\r",
        "\v": "\\v",
        "\t": "\\t",
        "\b": "\\b",
        "\f": "\\f",
    };

    for (const char of Object.keys(escapeMap)) {
        str = str.replaceAll(char, escapeMap[char]);
    }

    return str;
}
