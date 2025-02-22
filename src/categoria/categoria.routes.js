import { Router } from "express"
import { agregarCategoria , buscarCategoria, actualizarCategoria,eliminarCategoria} from "./categoria.controller.js"
import { agregarCategoriaValidator , buscarCategoriaValidator, actualizarCategoriaValidator, eliminarCategoriaValidator} from "../middlewares/categoria-validator.js"


const router = Router()

/**
 * @swagger
 * /agregarCategoria:
 *   post:
 *     summary: Agregar una nueva categoría
 *     description: Solo los administradores pueden agregar categorías. Requiere autenticación con token.
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría agregada correctamente.
 *       401:
 *         description: No autorizado. El usuario debe ser un administrador.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error en el servidor.
 */
router.post("/agregarCategoria", agregarCategoriaValidator, agregarCategoria);

/**
 * @swagger
 * /buscarCategoria/{uid}:
 *   get:
 *     summary: Buscar una categoría por ID
 *     description: Requiere autenticación con token. Todos los usuarios pueden acceder a esta ruta.
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la categoría a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría encontrada.
 *       404:
 *         description: Categoría no encontrada.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/buscarCategoria/:uid", buscarCategoriaValidator, buscarCategoria);

/**
 * @swagger
 * /actualizarCategoria/{uid}:
 *   patch:
 *     summary: Actualizar una categoría por ID
 *     description: Solo los administradores pueden actualizar categorías. Requiere autenticación con token.
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la categoría a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente.
 *       401:
 *         description: No autorizado. El usuario debe ser un administrador.
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.patch("/actualizarCategoria/:uid", actualizarCategoriaValidator, actualizarCategoria);

/**
 * @swagger
 * /borrarCategoria/{uid}:
 *   patch:
 *     summary: Eliminar una categoría por ID
 *     description: Solo los administradores pueden eliminar categorías. Requiere autenticación con token.
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la categoría a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente.
 *       401:
 *         description: No autorizado. El usuario debe ser un administrador.
 *       404:
 *         description: Categoría no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.patch("/borrarCategoria/:uid", eliminarCategoriaValidator, eliminarCategoria);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


export default router