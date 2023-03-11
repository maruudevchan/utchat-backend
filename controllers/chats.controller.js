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
        const id1 = req.params.id1;
        const id2 = req.params.id2;
        const query = await chatQueries.findChat(id1,id2);
        if (query){
            console.log('query', query);
            return res.status(200).json({ok: true, data: query.data});
        }else{
            //osea no hay
            console.log('No existe chat', query);
            //creo el chat
            const chat = {
                user1: id1,
                user2: id2
            }
            const query2 = await chatQueries.store(chat);
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