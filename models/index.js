const blogPost = require('./blogPost');
const User = require('./User');
const Blogcomment = require('./Blogcomment');

User.hasMany(blogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

blogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Blogcomment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blogcomment.belongsTo(User, {
    foreignKey: 'user_id'
});

blogPost.hasMany(Blogcomment, {
    foreignKey: 'blogPost_id',
    onDelete: 'CASCADE'
});

Blogcomment.belongsTo(blogPost, {
    foreignKey: 'blogPost_id'
});

module.exports = {
  User,
  blogPost,
  Blogcomment
};