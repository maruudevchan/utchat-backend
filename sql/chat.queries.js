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

    async findChat(id1,id2){
        try{
            const query = await ChatModel.findOne({where:{user1:id1, user2:id2}});
            if (query){
                console.log("este es el chat: " +query.data);
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