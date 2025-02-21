import { body, param  } from "express-validator";
import { categoriaExist } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const agregarCategoriaValidator = [
    body("titulo").notEmpty().withMessage("El titulo es requerido"),
    body("descripcion").notEmpty().withMessage("La descripción es requerido"),
    validarCampos,
    handleErrors
]

export const buscarCategoriaValidator = [
    param("uid").isMongoId().withMessage("No es un Id valido"),
    param("uid").custom(categoriaExist),
    validarCampos,
    handleErrors
]

export const actualizarCategoriaValidator = [
    param("uid").isMongoId().withMessage("No es un Id valido"),
    param("uid").custom(categoriaExist),
    validarCampos,
    handleErrors
]


export const eliminarCategoriaValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(categoriaExist),
    validarCampos,
    handleErrors
]
