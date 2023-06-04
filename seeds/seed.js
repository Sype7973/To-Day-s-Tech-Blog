const sequelize = require('../config/connection');
const { User, blogPost, Blogcomment } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const posts = await blogPost.bulkCreate(blogPostData, {
    individualHooks: true,
        returning: true,
    });

    const commentsSeed = await Blogcomment.bulkCreate(commentsData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();