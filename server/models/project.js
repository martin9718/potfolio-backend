const mongosee = require('mongoose');

var Schema = mongosee.Schema;

var projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name es required']
    },
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    category: {
        type: String,
        required: [true, 'The category is required']
    },
    year: {
        type: Number,
        required: [true, 'The year is required']
    },
    langs: {
        type: String,
        required: [true, 'The langs are required']
    },
    image: {
        type: String
    },
    url: {
        type: String,
        required: [true, 'The url is required']
    },
    urlGithub: {
        type: String,
        required: [true, 'The Github url is required']
    }
});


module.exports = mongosee.model('Project', projectSchema);