import { Schema, model } from "mongoose";

const categoriaSchema = new Schema({
    titulo:{
        type: String,
        required: [true, "Titulo is required"],
        maxLength: [25, "Titulo cannot exceed 25 characters"]
    },
    descripcion:{
        type: String,
        required: [true, "descripcion is required"],
    },
    status:{
        type: Boolean,
        default: true
    }
});

categoriaSchema.methods.toJSON = function() {
    const { __v, _id, ...categoria } = this.toObject();
    categoria.uid = _id; 
    return categoria;
};

export default model("Categoria", categoriaSchema);
