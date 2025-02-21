import { body, param  } from "express-validator";
import { comentarioExist } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const agregarComentarioValidator = [
    validateJWT,
    body("titulo").notEmpty().withMessage("El titulo es requerido"),
    body("contenido").notEmpty().withMessage("El contenido es requerido"),
    validarCampos,
    handleErrors
]

export const actualizarComentarioValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un Id valido"),
    param("uid").custom(comentarioExist),
    validarCampos,
    handleErrors
]

export const eliminarComentarioValidaror = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(comentarioExist),
    validarCampos,
    handleErrors
]
