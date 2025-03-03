#!/usr/bin/env node
const { version } = require('./package.json');
const { program } = require("commander");
const { html, md } = require("./index.js");
const { print, error } = require('./_api');
const Path = require('path');
const fs = require('fs');

function isDirectory(path) {
    try {
        return fs.statSync(path).isDirectory();
    } catch (error) {
        return false;
    }
}

function getAllFiles(path) {
    let filesArray = [];
    let files = fs.readdirSync(path);
  
    for (const file of files) {
        const fullPath = Path.join(path, file);
        const stat = fs.statSync(fullPath);
    
        if (stat.isDirectory()) {
            const nestedFiles = getAllFiles(fullPath);
            filesArray = filesArray.concat(nestedFiles);
        } else {
            if (Path.extname(fullPath) == '.mde') {
                filesArray.push(fullPath);
            }
        }
    }
  
    return filesArray;
}

program
    .version(version)
    .description("A simple CLI tool");

program
    .command("about")
    .description("See about info")
    .action(() => {
        print("mde V. " + version);
        print("By Calebh101");
    });

program
    .command("compile")
    .argument("<target>", "Either \"md\" or \"html\"")
    .argument("<location>", "File or directory to compile")
    .action(async (target, location) => {
        const path = Path.resolve(location);
        const directory = isDirectory(path);

        let paths = [];
        print("Starting \"mde compile\" on " + (directory ? "directory" : "file") + " " + path);

        if (directory) {
            paths = getAllFiles(path);
            if (paths.length <= 0) {
                return error("Directory " + path + " does not contain any .mde files");
            }
        } else {
            paths = [path];
            if (Path.extname(path) !== '.mde') {
                return error("File " + path + " is not a .mde file");
            }
        }

        if (target === "html") {
            paths.forEach(element => {
                const newpath = Path.format({
                    ...Path.parse(element),
                    base: undefined,
                    ext: '.html',
                });

                const data = html(fs.readFileSync(element, 'utf-8'));
                fs.writeFileSync(newpath, data);
                console.log("Compiled file " + newpath);
            });
        } else if (target === "md") {
            paths.forEach(element => {
                const newpath = Path.format({
                    ...Path.parse(element),
                    base: undefined,
                    ext: '.md',
                });
    
                const data = md(fs.readFileSync(element, 'utf-8'));
                fs.writeFileSync(newpath, data);
                console.log("Compiled file " + newpath);
            });
        } else {
            error("Invalid target: " + target);
        }
    });

program.parse(process.argv);