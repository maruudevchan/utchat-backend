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
            const query = await UserModel.findOne({username:user});
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

    async bringUsers(){
        try{
            const query = await UserModel.findAll();
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