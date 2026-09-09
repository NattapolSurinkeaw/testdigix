import { DataTypes } from "sequelize"
import { sequelize } from "../util/database"

export const Books = sequelize.define('Books',
{
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    thumnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    publish_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_display: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'books',
    timestamps: true,
})