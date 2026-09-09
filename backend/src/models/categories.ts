import { DataTypes } from "sequelize"
import { sequelize } from "../util/database"

export const Categories = sequelize.define('Categories',
{
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    cate_title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status_display: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'categories',
    timestamps: true,
})