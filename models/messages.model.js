import { Model, DataTypes } from "sequelize";
import {DatabaseConfig} from "../config/database.js";

export class MessageModel extends Model {}

MessageModel.init({
    idText: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    messages: {
        type: DataTypes.JSON,
        allowNull: true
    }
},
    {
        sequelize: DatabaseConfig,
        tableName: 'messages',
        timestamps: false
    }
);