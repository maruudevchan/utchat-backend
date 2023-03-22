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

    async setOffline(user){
        try{
            const query = await UserModel.update({isOnline:false}, {where:{id:user.id}});
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


    async activeUsers(id){
        try{
            const query = await UserModel.findAll({
                where: {
                  id: {
                    [Op.not]: id
                  },
                  isOnline: true,
                },
                attributes: ['id', 'nombre'],
              });
          

            if (query){
                return {ok:true, data:query};
            }
        }catch (error) {
            console.log('error al ejecutar query', error);
            return {ok:false, data:query.data};
        }
    }

    async findUserById(idUser){
        try
        {
            const query = await UserModel.findOne({where:{idUser:idUser}});
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