import * as dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
import { Error } from "./interface";

export class Auth{

     public generateToken = async (data: any,JWT_SECRET:string,JWT_DURATION:string) => {
        return jwt.sign({
            data
        },
            JWT_SECRET,
            {
                expiresIn: JWT_DURATION
            }
        );
    }

    public validateToken=(req: Request, res: Response, next: NextFunction) => {
        try {
            const token: string = req.headers.authorization + '';

            var JWT_SECRET="";
            //process.env.JWT_SECRET
            return jwt.verify(token, JWT_SECRET  + '', async (err) => {
                if (err) return res.status(401).json({
                    code: -2,
                    message: 'Token Invalido'
                });     

            const datatoken = jwt_decode(token);
            req.body.users=datatoken;
            next();
        });
            
        } catch (error) {
            
        }
        const dataResponde:Error={
            code:"UNEXPECTED_ERROR",
            description:"Ha ocurrido un error inesperado",
            statusCode:401,
            title:"Lo sentimos",
            path:"ruta"

        }
        res.status(401).json(dataResponde)
    }
}