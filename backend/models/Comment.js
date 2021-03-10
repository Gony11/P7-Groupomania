require('dotenv').config();

const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
})

const Comment = db.define('comments', {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    content: {
        type: Sequelize.TEXT, allowNull: false
    },
    created_at: {
        type: Sequelize.DATE, allowNull: false
    },
    visible: {
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 1
    },
    postId: {
        type: Sequelize.INTEGER, allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER, allowNull: false,
    }
},
    {
        tableName: 'comments',
        timestamps: false,
        underscored: true
    }
)

module.exports = Comment;