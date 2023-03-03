import {userQueries} from '../sql/user.queries.js';
import {request, response} from 'express';
import {Payload} from '../helpers/payload.js';

import pkg from 'bcrypt';
const {bcrypt} = pkg;
const saltRounds = 10;

class userController{
    static payload = new Payload();


    async createUser(request, response){
        const body = request.body;
        console.log(request.body);

        //encrypt password
        const salt = pkg.genSaltSync(saltRounds);
        const password = pkg.hashSync(body.pwd, salt);
        request.body.pwd = password;
        

        const query = await userQueries.store(body, body.pwd);
        if (query.ok){
            return response.status(200).json({ok: true, data: query.data});
        }else{
             return response.status(500).json({ok: false, error: query.error});
        }
    }
    //poner usuario en activo
    async setOnline(request, response){
        const user = request.body;
        const query = await userQueries.setOnline(user);
        if (query.ok){
            return response.status(200).json({ok: true, data: query.data});
        }else{
            return response.status(500).json({ok: false, data: null});
        }
    }
    //poner usuario en inactivo
    async setOffline(req, res){
        const user = req.body;
        const query = await userQueries.setOffline(user);
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(500).json({ok: false, data: null});
        }
    }

    async activeUsers(req, res){
        const query = await userQueries.activeUsers();
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(500).json({ok: false, data: null});
        }
    }

    async updateUser(req, res){
        const body = req.body;
        const query = await userQueries.updateUser(body);
        if (query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(500).json({ok: false, data: null});
        }    
    }

    async login(req, res){
        const body = req.body;
        const query = await userQueries.findUser({
            username: body.username,
            pwd: body.pwd,
        });

        if (query){
            //valida password
            const match = pkg.compareSync(body.pwd, query.data.pwd);
            console.log('id: '+query.data.idUser);
            if (match==true){
                try {
                    const token = userController.payload.createToken(query.data);
                    
                    return res.status(200).send({ok: true, token: token});
                } catch (error) {
                    return res.status(403).send({
                        ok: false,
                        message:'error on token creation',
                        error: error
                    });
                }
            }else{
                return res.status(403).send({
                    ok: false,
                    message:'Incorrect password'
                });
            }
            

        }else{
            return res.status(404).json({ok: false, data: null});
        }

    }


}

export const usuarioController = new userController();