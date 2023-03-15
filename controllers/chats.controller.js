import { chatQueries } from '../../backend/sql/chat.queries.js';
import { request, response } from 'express';
import { Payload } from '../helpers/payload.js';

class chatController {
    static payload = new Payload();

    async createChat(req, res) {
        const body = req.body;
        const query = await chatQueries.store(body);
        if (query.ok) {
            return res.status(200).json({ ok: true, data: query.data });
        } else {
            return res.status(500).json({ ok: false, error: query.error });
        }
    }

    async findChat(req, res) {
        const id1 = req.params.id1;
        const id2 = req.params.id2;
        const query = await chatQueries.findChat(id1, id2);
        if (query) {
            //el query devuelve un chat existente
            return res.status(200).json({ ok: true, cid: query.chat });
        } else {
            return res.status(500).json({ ok: false, error: query.error });
        }

    }

}

export const chatsController = new chatController();