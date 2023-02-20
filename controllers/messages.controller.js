import {messagesQueries} from '../sql/message.queries.js';
import {request, response} from 'express';
import {Payload} from '../helpers/payload.js';

import pkg from 'bcrypt';
const {bcrypt} = pkg;

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

    async findMessage(req, res){
        const body = req.body;
        const query = await messagesQueries.findMessage(body);
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(500).json({ok: false, data: null});
        }    
    }

    // async updateMessage(req, res){
    //     const body = req.body;
    //     const query = await messagesQueries.updateMessage(body);
    //     if (query.ok){
    //         return res.status(200).json({ok: true, data: query.data});
    //     }else{
    //         return res.status(500).json({ok: false, data: null});
    //     }    
    // }

    // async deleteMessage(req, res){
    //     const body = req.body;
    //     const query = await messagesQueries.deleteMessage(body);
    //     if (query.ok){
    //         return res.status(200).json({ok: true, data: query.data});
    //     }else{
    //         return res.status(500).json({ok: false, data: null});
    //     }    
    // }
}

export const messagesController = new messageController();