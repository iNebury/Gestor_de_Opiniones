import { Schema, model } from "mongoose";

const publicacionesSchema = new Schema({
    titulo:{
        type: String,
        required: [true, "Titulo is required"],
        maxLength: [25, "Titulo cannot exceed 25 characters"]
    },
    contenido:{
        type: String,
        required: [true, "Contenido is required"],
    },
    autor:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    comentarios:[{
        type: Schema.Types.ObjectId,
        ref: "Comentario"
    }],
    categoria:{
        type: Schema.Types.ObjectId,
        required: [true, "Categoria is required"],
        ref: "Categoria"
    },
    status:{
        type: Boolean,
        default: true
    }
});

publicacionesSchema.methods.toJSON = function() {
    const { __v, contrasena, _id, ...publicacion } = this.toObject();
    publicacion.uid = _id; 
    return publicacion;
};

export default model("Publicacion", publicacionesSchema);
