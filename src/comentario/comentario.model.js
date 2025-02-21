import { Schema, model } from "mongoose";

const comentarioSchema = new Schema({
    titulo:{
        type: String,
        required: [true, "Titulo is required"],
        maxLength: [25, "Titulo cannot exceed 25 characters"]
    },
    contenido:{
        type: String,
        required: [true, "contenido is required"],
    },
    autor:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status:{
        type: Boolean,
        default: true
    }
});

comentarioSchema.methods.toJSON = function() {
    const { __v, contrasena, _id, ...comentario } = this.toObject();
    comentario.uid = _id; 
    return comentario;
};

export default model("Comentario", comentarioSchema);
