const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/blogs', {
        useUnifiedTopology: true
    })
    .then(res => console.log('Connected to DB'))
    .catch(err => console.log('Err on connecteion', err))
}