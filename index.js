const express = require('express')
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoutes');
const dbsetup = require('./database/dbsetup');
const path = require('path');

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

dbsetup()
app.use(express.json());
app.use('/blogimages', express.static(path.join(__dirname, '/images')));
app.use(userRoute);
app.use(blogRoute);

app.listen(5000, () => {
    console.log('Server has started')
})