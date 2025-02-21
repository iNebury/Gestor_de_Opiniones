import User from "../usuario/usuario.model.js"
import Categoria from "../categoria/categoria.model.js"
import Comentario from "../comentario/comentario.model.js"
import Publicacion from "../publicaciones/publicaciones.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}


export const categoriaExist = async (uid = " ") => {
    const existe = await Categoria.findById(uid)
    if(!existe){
        throw new Error("No existe la categoria con el ID proporcionado")
    }
}

export const comentarioExist = async (uid = " ") => {
    const existe = await Comentario.findById(uid)
    if(!existe){
        throw new Error("No existe el comentario con el ID proporcionado")
    }
}

export const publicacionExist = async (uid = " ") => {
    const existe = await Publicacion.findById(uid)
    if(!existe){
        throw new Error("No existe la publicacion con el ID proporcionado")
    }
}
