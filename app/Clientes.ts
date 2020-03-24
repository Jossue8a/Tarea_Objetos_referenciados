import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"

export interface ICliente extends mongoose.Document { 
    name: string;
    direccion: string;
    correo: string;
    telefono: string;
}

const ClienteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    correo: {type: String, required: true},
    direccion: { type: String, required: true },
    telefono: {type: String, required: true}
});

export const Cliente = mongoose.model<ICliente>("Cliente", ClienteSchema);

export const CreateCliente = async function(name: string, direccion: string, correo: string, telefono: string){
    await connectMongoDB;

    const newOne = new Cliente();
    newOne.name = name;
    newOne.direccion = direccion;
    newOne.correo = correo;
    newOne.telefono = telefono;

    newOne.save( (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newOne);
        }
    } );
}

export function getCliente(_name: string):Promise<any>{
    return new Promise<any>( resolve => {
        Cliente.findOne({ name: _name}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}


