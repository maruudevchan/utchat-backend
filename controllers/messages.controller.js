import {messagesQueries} from '../sql/message.queries.js';
import {request, response} from 'express';
import {Payload} from '../helpers/payload.js';


class messageController{
    static payload = new Payload();

    async createMessage(req, res){
        const body = req.body;
        const query = await messagesQueries.store(body);
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
             return res.status(500).json({ok: false, error: query.error});
        }
    }

    async findMessages(req, res){
        const chat = req.params.cid;
        const query = await messagesQueries.findMessages(chat);
        if (query.ok){
            return res.status(200).json({ok: true, messages: query.data});
        }else{
            return res.status(500).json({ok: false, data: null});
        }    
    }

}

export const messagesController = new messageController();