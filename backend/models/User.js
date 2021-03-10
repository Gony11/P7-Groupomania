require('dotenv').config();

const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
})

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING(255), allowNull: false
    },
    name: {
        type: Sequelize.STRING(255), allowNull: false
    },
    email: {
        type: Sequelize.STRING(255), allowNull: false
    },
    password: {
        type: Sequelize.STRING(255), allowNull: false
    },
    url_image: {
        type: Sequelize.STRING(255), allowNull: true, defaultValue: null
    },
    function: {
        type: Sequelize.STRING(255), allowNull: true, defaultValue: null
    },
    role: {
        type: Sequelize.INTEGER, allowNull: false, defaultValue: 0
    }
},
    {
        tableName: 'users',
        timestamps: false,
        underscored: true
    }
)

module.exports = User;