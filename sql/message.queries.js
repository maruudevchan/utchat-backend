import { query } from "express";
import {Sequelize, DataTypes} from 'sequelize';
import { MessageModel } from "../models/messages.model.js";

class messageQueries{
    async store(chat){
        try{
            const query = await MessageModel.create(chat);
            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }

    async findChat(chat){
        try{
            const query = await MessageModel.findOne({where:{user1:chat.user1, user2:chat.user2}});
            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }

    }
}

export const messagesQueries = new messageQueries();