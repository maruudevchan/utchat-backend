//global imports
import express from 'express';
//controllers
import {usuarioController} from '../controllers/user.controller.js';
import {chatsController} from '../controllers/chats.controller.js';
import {messagesController} from '../controllers/messages.controller.js';

//middleware
import { validateToken } from '../middlewares/accessToken.middleware.js';



export class Routes{
    initRoutes(app = express.application){
        app.get('/', (req, res) => {
            res.status(200).send('<img src="https://i.pinimg.com/564x/38/18/9d/38189df7725c41f04273c3d1d974a55a.jpg" style="width:50%; display:block; margin-left:auto; margin-right:auto;"> <h1 style="text-align:center;font-family: monospace;">Welcome to my API</h1>');
        });
        //usuario
        app.route('/login').post(usuarioController.login);
        app.post('/signin', usuarioController.createUser);
        app.post('/setOnline', usuarioController.setOnline);
        app.post('/setOffline', usuarioController.setOffline);
        //usuarios Online
        app.route('/getOnlineUsers/:id').get(usuarioController.activeUsers);
        
        //chat
        app.route('/createChat').post( chatsController.createChat);
        app.route('/findChat/:id1/:id2').get(chatsController.findChat);

        //message
        app.route('/sendMessage').post( messagesController.createMessage);
        app.route('/bringMessages').post( messagesController.findMessage);
    }

}
