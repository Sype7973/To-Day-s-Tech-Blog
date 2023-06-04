const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Blogcomment extends Model { }

Blogcomment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_body: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key:'id'
            },
            allowNull: false,
        },
        blogPost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogPost',
                key:'id'
            },
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
    },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
    
    }
    
);

module.exports = Blogcomment;