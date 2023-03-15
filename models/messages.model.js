import { Model, DataTypes } from "sequelize";
import {DatabaseConfig} from "../config/database.js";

export class MessageModel extends Model {}

MessageModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idchat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sender: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
},

    {
        sequelize: DatabaseConfig,
        tableName: 'messages',
        timestamps: false
    }
);