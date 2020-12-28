const express = require('express');

const app = express();

const Project = require('../models/project');

//Method to create new projects
app.post('/project', (req, res) => {

    let body = req.body;

    let project = new Project({
        name: body.name,
        description: body.description,
        category: body.category,
        year: body.year,
        langs: body.langs,
        image: null,
        url: body.url,
        urlGithub: body.urlGithub
    });

    //Save project
    project.save((err, projectSaved) => {

        if (err) return res.status(400).json({ ok: false, err });

        res.status(200).json({ ok: true, project: projectSaved });
    });

});

//This method returns a project by ID
app.get('/project/:id', (req, res) => {

    let id = req.params.id;

    if (id === null) res.status(400).json({ ok: false, err: { message: 'The project doesn\'t exist' } });

    Project.findById(id, (err, project) => {

        if (err) res.status(400).json({ ok: false, err });

        if (!project) res.status(400).json({ ok: false, err: { message: 'The project doesn\'t exist' } });

        res.status(200).json({ ok: true, project: project });
    });
});

//This methods returns all projects
app.get('/projects', (req, res) => {

    Project.find({}).exec((err, projects) => {

        if (err) res.status(400).json({ ok: false, err });

        if (!projects) res.status(400).json({ ok: false, err: { message: 'There aren\'t projects' } });

        res.status(200).json({ ok: true, projects: projects });
    });

});

//This method uptades a project
app.put('/project/:id', (req, res) => {

    let id = req.params.id;

    if (id === null) res.status(400).json({ ok: false, err: { message: 'The project doesn\'t exist' } });

    let body = req.body;

    Project.findByIdAndUpdate(id, body, {
        new: true
    }, (err, projectUpdated) => {

        if (err) res.status(400).json({ ok: false, err });

        if (!projectUpdated) res.status(400).json({ ok: false, err: { message: 'The project doesn\'t exist' } });

        res.status(200).json({ ok: true, project: projectUpdated });
    })
});

//This method deletes a project
app.delete('/project/:id', (req, res) => {

    let id = req.params.id;

    Project.findByIdAndRemove(id, (err, projectDeleted) => {

        if (err) res.status(400).json({ ok: false, err });

        if (!projectDeleted) res.status(400).json({ ok: false, err: { message: 'The project doesn\'t exist' } });

        res.status(200).json({ ok: true, project: projectDeleted });
    });
});


module.exports = app;