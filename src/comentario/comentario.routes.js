import { Router } from "express"
import { agregarComentario , actualizarComentario, eliminarComentario } from "./comentario.controller.js"
import { agregarComentarioValidator, actualizarComentarioValidator , eliminarComentarioValidaror} from "../middlewares/comentario-validator.js"

const router = Router()

/**
 * @swagger
 * /agregarComentario:
 *   post:
 *     summary: Add a new comment
 *     description: Requiere autenticación con token. Solo los usuarios autenticados pueden agregar comentarios.
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *               userId:
 *                 type: string
 *               postId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario agregado correctamente.
 *       401:
 *         description: No autorizado. Se requiere token válido.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error en el servidor.
 */
router.post("/agregarComentario", agregarComentarioValidator ,agregarComentario);

/**
 * @swagger
 * /actualizarComentario/{uid}:
 *   patch:
 *     summary: Update a comment by ID
 *     description: Requiere autenticación con token. Solo los usuarios autenticados pueden actualizar un comentario.
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del comentario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado correctamente.
 *       401:
 *         description: No autorizado. Se requiere token válido.
 *       404:
 *         description: Comentario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.patch("/actualizarComentario/:uid", actualizarComentarioValidator, actualizarComentario);

/**
 * @swagger
 * /eliminarComentario/{uid}:
 *   patch:
 *     summary: Delete a comment by ID
 *     description: Requiere autenticación con token. Solo los usuarios autenticados pueden eliminar un comentario.
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del comentario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado correctamente.
 *       401:
 *         description: No autorizado. Se requiere token válido.
 *       404:
 *         description: Comentario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.patch("/eliminarComentario/:uid", eliminarComentarioValidaror, eliminarComentario);


export default router