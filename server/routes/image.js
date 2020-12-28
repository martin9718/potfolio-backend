const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

//This method returns a project image
app.get('/image/:img', (req, res) => {

    let img = req.params.img;

    let pathImage = path.resolve(__dirname, `../../uploads/${ img }`);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }
});


module.exports = app;