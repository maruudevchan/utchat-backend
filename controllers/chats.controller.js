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
        const body = req.body;
        const query = await chatQueries.findChat(body);
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(500).json({ok: false, data: null});
        }    
    }

    async bringchat(req, res){
        const query = await chatQueries.bringchat();
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(500).json({ok: false, data: null});
        }
    }
    

    async updateChat(req, res){
        const body = req.body;
        const query = await chatQueries.updateChat(body);
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
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