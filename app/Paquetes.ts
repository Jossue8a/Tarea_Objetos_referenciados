import mongoose = require("mongoose");
import {ICliente, getCliente} from "./Clientes"
import {connectMongoDB} from "./helpers"

interface IPaquete extends mongoose.Document { 
    name: string;
    peso: number;
    tipo_paquete: number;
    direccion: String;
    estado_envio: Boolean;
    cliente: ICliente
}

const PaqueteSchema = new mongoose.Schema({
    name: { type: String, required: true},
    peso: {type: Number, required: true},
    tipo_paquete: {type: Number, required: true},
    direccion: {type: String, required: true},
    estado_envio: {type: Boolean, required: true},
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" }
});


export const Paquete = mongoose.model<IPaquete>("Paquete", PaqueteSchema);

export const CreatePaquete = async function(nameCliente:string,name:string, tipo_paquete:number,peso:number,direccion:String, estado_envio:Boolean){
    //Conectar con la base de datos
    await connectMongoDB;
    //Obtener el Cliente en funcion del nombre
    const prov:any = await getCliente(nameCliente);

    //persistencia 
    const p = new Paquete();
    p.name = name;
    p.tipo_paquete = tipo_paquete;
    p.peso = peso;
    p.direccion =  direccion;
    p.estado_envio = estado_envio;
    p.cliente = prov;

    p.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(p);
        }
    });
}

