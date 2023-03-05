import { query } from "express";
import { Op } from "sequelize";
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

    async activeUsers(idUser){
        try{
            const query = await UserModel.findAll({
                where: {
                  idUser: {
                    [Op.ne]: idUser
                  },
                  isOnline: true,
                },
                attributes: ['idUser', 'nam1', 'lastname1', 'lastname2'],
              });
          

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
            
            const query = await UserModel.update({isOnline:true}, {where:{username:user.username}});
            
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