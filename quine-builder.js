"use strict";

const {readFileSync, writeFileSync} = require("node:fs");
const {stdout} = require("node:process");

const quine = "quine.js";

// The following hashtag is replaced with the source code
// It must be the first hashtag in the file
const source = "#";

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
