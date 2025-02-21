import Publicacion from "../publicaciones/publicaciones.model.js"

export const agregarPublicaciones = async(req,res) =>{
    try{

        const data = req.body

        const publicacion = await Publicacion.create(data)

        return res.status(201).json({
            message: "Publicacion creada",
            publicacion
        })
    }catch(error){
        return res.status(500).json({
            message: "Falló la creación de la publicación",
            error: error.message
        })
    }
}


export const actualizarPublicacion = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const {uidAutor} = req.body;

        if (!uid) {
            return res.status(400).json({
                success: false,
                msg: "El ID de la publicación es requerido"
            });
        }

        const existePublicacion = await Publicacion.findById(uid);
        if (!existePublicacion) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada"
            });
        }

        if (uidAutor !== existePublicacion.autor.toString()) {
            return res.status(400).json({
                success: false,
                msg: "No tienes permisos para actualizar esta publicación"
            });
        }

        const publicacion = await Publicacion.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            success: true,
            msg: "Publicación actualizada correctamente",
            publicacion,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar la publicación",
            error: err.message
        });
    }
};


export const eliminarPublicacion = async (req, res) => {
    try {
        const { uid } = req.params;
        const { uidAutor } = req.body;

        const existePublicacion = await Publicacion.findById(uid);
        if (!existePublicacion) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada"
            });
        }

        if (uidAutor !== existePublicacion.autor.toString()) {
            return res.status(403).json({
                success: false,
                msg: "No tienes permisos para eliminar esta publicación"
            });
        }

        const publicacion = await Publicacion.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            msg: "Publicación eliminada correctamente",
            publicacion,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error al eliminar la publicación",
            error: err.message
        });
    }
};


export const listarPublicacion = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const { uid } = req.params;
        const query = { autor: uid, status: true };

        const [total, publicacion] = await Promise.all([
            Publicacion.countDocuments(query),
            Publicacion.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            publicacion
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message
        });
    }
};