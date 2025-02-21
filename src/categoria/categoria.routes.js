import { Router } from "express"
import { agregarCategoria , buscarCategoria, actualizarCategoria,eliminarCategoria} from "./categoria.controller.js"
import { agregarCategoriaValidator , buscarCategoriaValidator, actualizarCategoriaValidator, eliminarCategoriaValidator} from "../middlewares/categoria-validator.js"


const router = Router()

router.post("/agregarCategoria", agregarCategoriaValidator ,agregarCategoria)

router.get("/buscarCategoria/:uid", buscarCategoriaValidator, buscarCategoria)

router.patch("/actualizarCategoria/:uid", actualizarCategoriaValidator, actualizarCategoria)

router.patch("/borrarCategoria/:uid", eliminarCategoriaValidator, eliminarCategoria)

export default router