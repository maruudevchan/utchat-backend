import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Routes } from '../routes/routes.js';
import { Database } from './database.js';
import { Server } from "socket.io"
import { messagesQueries } from '../sql/message.queries.js'

dotenv.config();

class App {
    app = express.application;
    http = null;
    routes = new Routes();
    db = new Database();

    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        this.app = express();
        this.initSocket()
        this.config();
        this.http = http.createServer(this.app);
        await this.initDatabase();
        this.routes.initRoutes(this.app);
    }

    initSocket(){
        const io = new Server(3001, {
            cors: {
                origin: '*',
            }
        });

        io.on('connection', (socket) => {
            socket.on('new-message', async (data) => {
                console.log(data);
                const query = await messagesQueries.findMessages(data.idchat);

                if(query.ok){
                    io.emit('new-message', query.data)
                }

                
            })
        });
    }
    
    config() {
        this.app.use(
            express.urlencoded({
                extended: true
            }));

        this.app.use(express.json());
        
        this.app.use(cors({origin: '*' }));
    }

    async initDatabase(){
        const connection = await this.db.connection();
        console.log(connection.message);
    }
}

export default new App();