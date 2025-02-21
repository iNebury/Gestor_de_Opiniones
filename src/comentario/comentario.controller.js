import Comentario from "./comentario.model.js"
import Publicacion from "../publicaciones/publicaciones.model.js"

export const agregarComentario = async(req,res) =>{
    try{

        const data = req.body
        const {uidPublicacion} = req.body

        const comentario = await Comentario.create(data)
        await Publicacion.findByIdAndUpdate(uidPublicacion,{$push: {comentarios: comentario}})

        return res.status(201).json({
            message: "Comentario creado",
            comentario
        })
    }catch(error){
        return res.status(500).json({
            message: "Falló la creación del comentario",
            error: error.message
        })
    }
}


export const actualizarComentario = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;
        const {uidAutor} = req.body;

        const comentario = await Comentario.findByIdAndUpdate(uid, data, { new: true });

        if (uidAutor !== comentario.autor.toString()) {
            return res.status(400).json({
                success: false,
                msg: "No tienes permisos para actualizar este comentario"
            });
        }

        res.status(200).json({
            success: true,
            msg: "comentario actualizado",
            comentario,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el comentario",
            error: err.message
        });
    }
}


export const eliminarComentario = async (req, res) => {
    try {
        const { uid } = req.params;
        const {uidPublicacion} = req.body;
        const {uidAutor} = req.body;

        const comentario = await Comentario.findByIdAndUpdate(uid, {status: false}, { new: true });
        await Publicacion.findByIdAndUpdate(uidPublicacion,{$pull: {comentarios: uid}})

        if (uidAutor !== comentario.autor.toString()) {
            return res.status(400).json({
                success: false,
                msg: "No tienes permisos para actualizar este comentario"
            });
        }


        res.status(200).json({
            success: true,
            msg: "Comentario eliminado",
            comentario,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar el comentario",
            error: err.message
        });
    }
}