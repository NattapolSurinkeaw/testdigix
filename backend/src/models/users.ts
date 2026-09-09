import { DataTypes } from "sequelize"
import { sequelize } from "../util/database"

export const User = sequelize.define('User',
{
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    access_token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status_confirm: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    display_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    profile_img: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
})