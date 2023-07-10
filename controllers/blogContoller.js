const Blogs = require('../models/blogsmodel');

exports.allblogs = async (req, res) => {
    try {
        const blogs = await Blogs.find()
        res.json(blogs)
    } catch (error) {
        console.log('Err on all blogs', error)
    }
}

exports.addblog = async (req, res) => {
    try {
        const {title, subtitle, author, body} = req.body;
        const newblog = new Blogs({
            title: title,
            subtitle: subtitle,
            author: author,
            body: body,
            image: req.file.filename
        })
        await newblog.save();
    } catch (error) {
        console.log('Err on add blog', error)
    }
}

exports.details = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blogs.findById(id)
        res.json(blog)
    } catch (error) {
        console.log('Err on details', error)
    }
}

exports.editblog = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blogs.findById(id);
        res.json(blog)

    } catch (error) {
        console.log('Err on edit blog', error)
    }
}

exports.updateblog = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, subtitle, author, body} = req.body;

        await Blogs.findByIdAndUpdate(id, {
            title: title,
            subtitle: subtitle,
            author: author,
            body: body
        })
        
    } catch (error) {
        console.log('Err on update blog', error)
    }
}

exports.delete = async (req, res) => {
    try {
        const {id} = req.params;
        await Blogs.findByIdAndRemove(id)
    } catch (error) {
        console.log('Err on delete blog', error)
    }
}