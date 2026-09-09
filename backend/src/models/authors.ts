import { DataTypes } from "sequelize"
import { sequelize } from "../util/database"

export const Author = sequelize.define('Author',
{
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    author_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    photo_img: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    status_display: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'authors',
    timestamps: true,
})