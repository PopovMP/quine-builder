"use strict";

const {readFileSync}   = require("node:fs");
const {join}           = require("node:path");
const {spawnSync}      = require("node:child_process");
const {describe, test} = require("node:test");
const {strictEqual}    = require("node:assert");

const quinePath   = join(__dirname, "..", "quine.js");
const builderPath = join(__dirname, "..", "quine-builder.js");

describe("Quine Builder", () => {
    test("Builder produces a quine.js file", () => {
        // Run the builder
        spawnSync("node", [builderPath], {
            encoding: "utf8",
            stdio: "inherit",
        });

        // Read the quine file
        const quineContent = readFileSync(quinePath, {encoding: "utf8"});
        strictEqual(quineContent.length > 0, true);
    });

    test("Quine output matches the quine.js source code", () => {
        // Run the quine
        const quineOutput = spawnSync("node", [quinePath], {
            encoding: "utf8",
            stdio: "pipe",
        });

        // Read the quine source code
        const quineSource = readFileSync(quinePath, {encoding: "utf8"});

        // Compare the output with the source code
        strictEqual(quineOutput.stdout, quineSource);
    });
});
