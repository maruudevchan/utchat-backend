import { query } from "express";
import { ChatModel } from "../models/chats.model.js";

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

    async findChat(chat){
        try{
            const query = await ChatModel.findOne({where:{user1:chat.user1, user2:chat.user2}});
            if (query){
                return {ok:true, data:query};
            }
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