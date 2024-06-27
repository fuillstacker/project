const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'User'
    }
})

const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Like = sequelize.define('like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER
    }
})

const Comm = sequelize.define('comm', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER
    }
})


User.hasMany(Post)
Post.belongsTo(User)

Post.hasMany(Like, {as: 'likes'})
Like.belongsTo(Post)

Post.hasMany(Comm, {as: 'comms'})
Comm.belongsTo(Post)

module.exports = {
    User,
    Post, 
    Like,
    Comm
}  