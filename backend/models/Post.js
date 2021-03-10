require('dotenv').config();

const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
})

const Post = db.define('posts', {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    content: {
        type: Sequelize.TEXT, allowNull: false
    },
    media: {
        type: Sequelize.STRING(255), allowNull: true, defaultValue: null
    },
    like: {
        type: Sequelize.INTEGER, allowNull: false, defaultValue: 0
    },
    created_at: {
        type: Sequelize.DATE, allowNull: false
    },
    visible: {
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 1
    },
    userId: {
        type: Sequelize.INTEGER, allowNull: false,
    }
},
    {
        tableName: 'posts',
        timestamps: false,
        underscored: true
    }
)

module.exports = Post;