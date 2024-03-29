import { query } from "express";
import {Sequelize, DataTypes} from 'sequelize';
import { MessageModel } from "../models/messages.model.js";

class messageQueries{
    async store(message){
        try{
            const insertQuery = await MessageModel.create(message);
            
            if (insertQuery){ 
                console.log('insert No. '+ insertQuery.id + ' en messages');
                return {ok:true,id: insertQuery.id , data:insertQuery};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }

    async findMessages(chat){
        
        try{
            const query = await MessageModel.findAll({where:{idChat:chat}});
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