import { query } from "express";
import { ChatModel } from "../models/chats.model.js";
import { messagesQueries } from "./message.queries.js";
import { MessageModel } from "../models/messages.model.js";
import { UserModel } from "../models/user.model.js";

import { Op as Op } from 'sequelize';

class chatsQueries {
    async store(chat) {
        try {
            const query = await ChatModel.create(chat);
            if (query) {
                return { ok: true, data: query };
            }
        } catch (error) {
            console.log('error al ejecutar query', error);
            return { ok: false, data: query.data };
        }
    }

    async findChat(id1, id2) {
        try {
            //primero checo en mensajes si existen mensajes
            const buscarChat = await ChatModel.findOne({
                where: {
                    [Op.or]: [
                        { user1: id1, user2: id2 },
                        { user1: id2, user2: id1 }
                    ]
                }
            });
            if (buscarChat) {
                //el chat existe
                return { ok: true, chat: buscarChat.id };
            } else {
                //el chat no existe
                const chat = {
                    user1: id1,
                    user2: id2
                }
                const crearChat = await this.store(chat);
                if (crearChat.ok) {
                    //se crea el chat y se devuelve el id
                    return { ok: true, chat: crearChat.data.id };
                }
            }
        } catch (error) {
            console.log('error al ejecutar query', error);
            return { ok: false, data: query.data };
        }
    }


    async findChatById(chat) {
        try {
            const query = await ChatModel.findOne({ where: { idChat: chat } });
            if (query) {
                return { ok: true, data: query };
            }
        } catch (error) {
            console.log('error al ejecutar query', error);
            return { ok: false, data: query.data };
        }

    }

    async findChatByUser(id) {
        try {
            const query = await ChatModel.findAll({
                where: {
                    [Op.or]: [
                        { user1: id },
                        { user2: id }
                      ]
                  },
                  attributes: ['user1', 'user2'],

            });

            const users = [];
            for (const chat of query) {
                const user1 = await UserModel.findByPk(chat.user1,
                    {
                        attributes: ['id', 'nombre']
                    });
                const user2 = await UserModel.findByPk(chat.user2,
                    {
                        attributes: ['id', 'nombre']
                    });

                    if (user1.id !== id) {
                        users.push(user1);
                    }else if(user2.id !== id){
                        users.push(user2);
                    }

                if (query) {
                    return { ok: true, data: { users: users, chats: query } };
                }
            }
        } catch (error) {
            console.log('error al ejecutar query', error);
            return { ok: false, data: query.data };
        }
    }

}

export const chatQueries = new chatsQueries();