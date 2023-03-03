import { query } from "express";
import { UserModel } from "../models/user.model.js";

class UserQueries{
    async store(user){
        try{
            const query = await UserModel.create(user);
            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }

    async findUser(user){
        try{
            const query = await UserModel.findOne({where:{username:user.username}});
            
            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }

    }

    async updateUser(user){
        try{
            const query = await UserModel.update(user, {where:{username:user.username}});
            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }

    async activeUsers(){
        try{
            const query = await UserModel.findAll({where:{isOnline:true},attributes:['nam1','lastname1','lastname2']});
            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }

    async setOffline(user){
        try{
            const query = await UserModel.update({isActive:false}, {where:{username:user.username}});
            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }

    async setOnline(user){
        try{
            console.log('llego al query');
            console.log('data de petición: '+user.username + ' ' + user.isOnline);
            const query = await UserModel.update({isOnline:true}, {where:{username:user.username}});
            console.log('llego al query');
            console.log('query: '+query);

            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }
    

}

export const userQueries = new UserQueries();