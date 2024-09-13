import usuarioSchema from "../schema/usuario.schema";
import { usuarioType } from "../type/usuario.type";

class usuarioService{

    async create(usuarioType:usuarioType){
        try{
            const usuario = await usuarioSchema.create(usuarioType)
            return usuario
        } catch(error){
            console.error(error)
        }
    }


    async findAll(){
        try{
            const usuario = await usuarioSchema.find()
            return usuario;
            } catch(error){
            console.error(error);
        }
    }

    async update(id:string, usuario:usuarioType){
        try{
            const uptdatedusuario= await usuarioSchema.findByIdAndUpdate(id,{
                nome: usuario.nome,
                idade: usuario.idade,
                sexo: usuario.sexo,   
            }, {new: true})
            return uptdatedusuario;
        }catch(error){
            console.error(error);
        }
    }

    async delete(id : string){
        try{
            const deletedusuario= await usuarioSchema.findByIdAndDelete(id)
            return "usuario Removido"
        }catch(error){
            console.error(error);
        }
    }

    async findByName(nome: string) {
        return await usuarioSchema.findOne({ nome });
    }
}

export default new usuarioService();