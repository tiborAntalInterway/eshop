'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');

    sh.cp('-R', sourcePath, destPath);

    //skopiruj screenshoty pre pagebuilder
    //console.log("path=", upath.dirname(__filename)+"/../src/pug/pagebuilder/");
    let sourceImagePath = upath.dirname(__filename)+"/../src/pug/pagebuilder/";
    let files = sh.ls('-R', sourceImagePath);
    let file;
    for (let i=0; i<files.length; i++) {
        file = files[i];
        if (!file.match(/\.jpg$/)) continue;

        //console.log("file=", file);
        console.log("Copy PB block image: ", sourceImagePath+file, " => ", destPath+"/pagebuilder/"+file);
        sh.cp(sourceImagePath+file, destPath+"/pagebuilder/"+file);
    }
};