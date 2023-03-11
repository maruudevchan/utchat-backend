import { query } from "express";
import { ChatModel } from "../models/chats.model.js";
import { messagesQueries } from "./message.queries.js";
import { MessageModel } from "../models/messages.model.js";

import {Op as Op} from 'sequelize';

class chatsQueries{
    async store(chat){
        try{
            const query = await ChatModel.create(chat);
            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }

    async findChat(id1,id2){
        try{
            console.log('Llamada a la función findChat');
            console.log('query de chats');
            //primero checo en mensajes si existen mensajes
            console.log("buscando mensajes en query");
            const buscarChat = await ChatModel.findOne({
                where: {
                    [Op.or]: [
                      { user1: id1, user2: id2 },
                      { user1: id2, user2: id1 }
                    ]
                  }
                });
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }
    

    async findChatById(chat){
        try{
            const query = await ChatModel.findOne({where:{idChat:chat}});
            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }

    }
    
}

export const chatQueries = new chatsQueries();