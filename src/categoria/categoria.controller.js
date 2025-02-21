import Categoria from "./categoria.model.js"

export const agregarCategoria = async(req,res) =>{
    try{

        const data = req.body

        const categoria = await Categoria.create(data)

        return res.status(201).json({
            message: "Categoria ha sido creada",
            categoria
        })
    }catch(error){
        return res.status(500).json({
            message: "Falló la creación de categoria",
            error: error.message
        })
    }
}

export const buscarCategoria = async (req, res) => {
    try{
        const { uid } = req.params;
        const categoria = await Categoria.findById(uid)

        if(!categoria){
            return res.status(404).json({
                success: false,
                message: "Categoria no encontrada"
            })
        }

        return res.status(200).json({
            success: true,
            categoria
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener la categoria",
            error: err.message
        })
    }
}


export const actualizarCategoria = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const categoria = await Categoria.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "Categoria actualizada",
            categoria,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la categoria",
            error: err.message
        });
    }
}


export const eliminarCategoria = async (req, res) => {
    try {
        const { uid } = req.params;

        const categoria = await Categoria.findByIdAndUpdate(uid, {status: false}, { new: true });

        res.status(200).json({
            success: true,
            msg: "Categoria eliminada",
            categoria,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar la categoria",
            error: err.message
        });
    }
}