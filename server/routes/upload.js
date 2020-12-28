const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Project = require('../models/project');

const fs = require('fs');
const path = require('path');

//default options
app.use(fileUpload({ useTempFiles: true }));

//Upload project image
app.put('/upload/:id', (req, res) => {
    let id = req.params.id;

    //Valide if file exists
    if (!req.files) res.status(400).json({
        ok: false,
        err: { message: 'No file has been selected' }
    });

    //Get the file extension
    let file = req.files.file;
    let cutName = file.name.split('.');
    let ext = cutName[cutName.length - 1];

    //Allowed extensions
    let validExtensions = ['png', 'jpg', 'gif', 'jprg'];

    //Validate the extension
    if (validExtensions.indexOf(ext) < 0) res.status(400).json({
        ok: false,
        err: { message: 'Extension is not allowed, use the following: ' + validExtensions.join(', '), ext }
    });


    //Rename file
    let fileName = `${ id }-${ new Date().getMilliseconds() }.${ ext }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(`uploads/${ fileName }`, (err) => {
        if (err) res.status(500).json({ ok: false, err });
    });

    //Save image in the project
    projectImage(id, res, fileName);

});


//Method to save image in the project
function projectImage(id, res, fileName) {

    //Find project by id
    Project.findById(id, (err, projectDB) => {
        if (err) {
            deleteFile(fileName);
            return res.status(500).json({ ok: false, err });
        }

        if (!projectDB) {
            deleteFile(fileName);
            return res.status(400).json({ ok: false, err: { message: 'The project doesn\'t exist' } });
        }

        //Delete image if exists
        deleteFile(projectDB.image);

        //Save image in the project
        projectDB.image = fileName;

        projectDB.save((err, projectSaved) => {
            res.json({ ok: true, project: projectSaved, image: fileName })
        });

    });

}

//Method yo delete file or image
function deleteFile(imageName) {
    let pathImage = path.resolve(__dirname, `../../uploads/${ imageName }`);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}


module.exports = app;