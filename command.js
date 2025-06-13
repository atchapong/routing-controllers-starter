#!/usr/bin/env node
"use strict";
var program = require('commander');
var fs = require('fs');
const { exec } = require("child_process");

program
    .version('1')
    .description("Cil for outlander")
    .option('-deploy, --deployinserver', 'Deploy Nodejs')
    .option('-crud, --createfile <name>', 'Create File CRUD Add name for create')
    .parse(process.argv);
var options = program.opts();

if (options.createfile) {
    const fileCreat = ['controller','interface','dto','model','service']
    const filename = options.createfile

    for (const type of fileCreat) {
        console.log(`Create ${type}`)
        fs.readFile(`./ExFile/${type}.text`,
        function(err, data) {       
            if (err) throw err;
    
            let file = data.toString('utf8')
            file = file.replaceAll('{name}', filename)
            file = file.replaceAll('{name_big}', filename.charAt(0).toUpperCase() + filename.slice(1))
            file = file.replaceAll('`', '')
            
            // data is a buffer containing file content
            fs.appendFile(`./src/${type}s/${options.createfile}.${type}.ts`, file, function (err) {
                if (err) throw err;
                console.log(`File is ${type} created successfully.`);
              });
        });
    }

}

if(options.deployinserver) {
    exec("bash deploy.sh", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

if (!process.argv.slice(2).length) {
    program.outputHelp();
}