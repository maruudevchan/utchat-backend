import {chatQueries} from '../../backend/sql/chat.queries.js';
import {request, response} from 'express';
import {Payload} from '../helpers/payload.js';

class chatController{
    static payload = new Payload();

    async createChat(req, res){
        const body = req.body;
        const query = await chatQueries.store(body);
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
             return res.status(500).json({ok: false, error: query.error});
        }
    }

    async findChat(req, res){
        const user1 = req.params.id1;
        const user2 = req.params.id2;
        const query = await chatQueries.findChat(user1,user2);
        if (query.ok){
            console.log("este es el chat: " +query.data);
            return res.status(200).json({ok: true, data: query.data});
        }else{
            console.log("no hay chat")
            return res.status(500).json({ok: false, data: null});
        }    
    }


    async deleteChat(req, res){
        const body = req.body;
        const query = await chatQueries.deleteChat(body);
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(500).json({ok: false, data: null});
        }    
    }
}

export const chatsController = new chatController();