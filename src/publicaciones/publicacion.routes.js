import { Router } from "express"
import { agregarPublicaciones, actualizarPublicacion, eliminarPublicacion , listarPublicacion} from "./publicaciones.controller.js"
import { agregarPublicacionValidator,actualizarPublicacionValidator,eliminarPublicacionValidator } from "../middlewares/publicacion-validator.js"

const router = Router()

/**
 * @swagger
 * /agregarPublicaicon:
 *   post:
 *     summary: Agregar una nueva publicación
 *     description: Requiere autenticación con token. Solo los usuarios autenticados pueden agregar publicaciones.
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación agregada correctamente.
 *       401:
 *         description: No autorizado. Se requiere token válido.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error en el servidor.
 */
router.post("/agregarPublicaicon", agregarPublicacionValidator ,agregarPublicaciones);

/**
 * @swagger
 * /actualizarPublicacion/{uid}:
 *   patch:
 *     summary: Actualizar una publicación por ID
 *     description: Requiere autenticación con token. Solo los usuarios autenticados pueden actualizar publicaciones.
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la publicación a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación actualizada correctamente.
 *       401:
 *         description: No autorizado. Se requiere token válido.
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.patch("/actualizarPublicacion/:uid", actualizarPublicacionValidator, actualizarPublicacion);

/**
 * @swagger
 * /eliminarPublicacion/{uid}:
 *   patch:
 *     summary: Eliminar una publicación por ID
 *     description: Requiere autenticación con token. Solo los usuarios autenticados pueden eliminar publicaciones.
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la publicación a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación eliminada correctamente.
 *       401:
 *         description: No autorizado. Se requiere token válido.
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.patch("/eliminarPublicacion/:uid", eliminarPublicacionValidator, eliminarPublicacion);

/**
 * @swagger
 * /buscarPublicacion/{uid}:
 *   get:
 *     summary: Buscar una publicación por ID
 *     description: Requiere autenticación con token. Todos los usuarios autenticados pueden acceder a esta ruta.
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la publicación a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación encontrada.
 *       401:
 *         description: No autorizado. Se requiere token válido.
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/buscarPublicacion/:uid", listarPublicacion);


export default router