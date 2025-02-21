import { Schema, model } from "mongoose";

const categoriaSchema = new Schema({
    titulo:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    descripcion:{
        type: String,
        required: [true, "Surname is required"],
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
