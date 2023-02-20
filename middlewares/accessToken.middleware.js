import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pathToFileURL } from 'url';
dotenv.config();

export class validateToken{
    static validateJWT(request, response, next){
        const token = request.get('Authorization');

        let public_key = null;

        if(process.env.MODE!='dev'){
            public_key = fs.readFileSync('process.env.PUBLIC_KEY', 'utf8');
        }else{
            public_key = fs.readFileSync(pathToFileURL('..\\backend\\keys\\public.pem'), 'utf-8');
        } 

        try {
            const decoded = jwt.verify(token, public_key);

            // if(!decoded.data.user){
            //     return response.status(403).json({
            //         ok: false,
            //         errors:[{message: 'Don fregón verá'}]
            //     });
            // }

        } catch (error) {
            return response.status(403).json({
                ok: false,
                errors:[{message: 'Hay un problema con el header: ' + error}]
            });

        }
        next();
    }


    /**
     * 
     * @param  request 
     * @param  response 
     * @param  next 
     */

    static middlewareRunning(request, response, next){
        console.log(request.body);
        console.log('Middleware running');
        next();
    }
}