import { Router } from "express"
import { agregarPublicaciones, actualizarPublicacion, eliminarPublicacion , listarPublicacion} from "./publicaciones.controller.js"
import { agregarPublicacionValidator,actualizarPublicacionValidator,eliminarPublicacionValidator } from "../middlewares/publicacion-validator.js"

const router = Router()

router.post("/agregarPublicaicon", agregarPublicacionValidator ,agregarPublicaciones)

router.patch("/actualizarPublicacion/:uid", actualizarPublicacionValidator, actualizarPublicacion)

router.patch("/eliminarPublicacion/:uid", eliminarPublicacionValidator, eliminarPublicacion)

router.get("/buscarPublicacion/:uid", listarPublicacion)

export default router