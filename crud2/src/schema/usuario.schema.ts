import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    idade: {
        type: Number,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default model("usuario", usuarioSchema);
