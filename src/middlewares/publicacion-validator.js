import { body, param  } from "express-validator";
import { publicacionExist ,userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const agregarPublicacionValidator = [
    validateJWT,
    body("titulo").notEmpty().withMessage("El titulo es requerido"),
    body("contenido").notEmpty().withMessage("La descripción es requerido"),
    body("autor").notEmpty().withMessage("La descripción es requerido").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("categoria").notEmpty().withMessage("La descripción es requerido").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]

export const actualizarPublicacionValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un Id valido"),
    param("uid").custom(publicacionExist),
    validarCampos,
    handleErrors
]

export const eliminarPublicacionValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(publicacionExist),
    validarCampos,
    handleErrors
]

export const listarPublicacionesValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]