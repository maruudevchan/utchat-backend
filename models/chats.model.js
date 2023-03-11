import { Model, DataTypes } from "sequelize";
import {DatabaseConfig} from "../config/database.js";

export class ChatModel extends Model {}

ChatModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user1: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
    },
    user2: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
    }
},
    {
        sequelize: DatabaseConfig,
        tableName: 'chats',
        timestamps: false
    }
);
