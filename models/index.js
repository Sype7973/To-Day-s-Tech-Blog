const blogPost = require('./blogPost');
const User = require('./User');
const comments = require('./comments');

User.hasMany(blogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

blogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

comments.belongsTo(User, {
    foreignKey: 'user_id'
});

blogPost.hasMany(comments, {
    foreignKey: 'blogPost_id',
    onDelete: 'CASCADE'
});

comments.belongsTo(blogPost, {
    foreignKey: 'blogPost_id'
});

module.exports = {
  User,
  blogPost,
  comments 
};