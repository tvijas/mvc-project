const {DataTypes} = require("sequelize");
const sequelize = require("./config")

const UserEntity = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    user_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {timestamps: false, validate: true});

module.exports = UserEntity;