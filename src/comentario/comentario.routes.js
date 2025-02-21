import { Router } from "express"
import { agregarComentario , actualizarComentario, eliminarComentario } from "./comentario.controller.js"
import { agregarComentarioValidator, actualizarComentarioValidator , eliminarComentarioValidaror} from "../middlewares/comentario-validator.js"

const router = Router()

router.post("/agregarComentario", agregarComentarioValidator ,agregarComentario)

router.patch("/actualizarComentario/:uid", actualizarComentarioValidator, actualizarComentario)

router.patch("/eliminarComentario/:uid", eliminarComentarioValidaror, eliminarComentario)

export default router