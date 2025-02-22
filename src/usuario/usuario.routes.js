import { Router } from "express"
import { getUserById, getUsers,   updateUser } from "./usuario.controller.js"
import {updateUserValidator} from "../middlewares/usuario-validator.js"

const router = Router()

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Todos los usuarios pueden acceder a esta ruta sin autenticación.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/findUser/:uid", getUserById);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Todos los usuarios pueden acceder a esta ruta sin autenticación.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/", getUsers);

/**
 * @swagger
 * /updateUser/{uid}:
 *   patch:
 *     summary: Update a user's information by ID
 *     description: Requiere autenticación con token. Solo los usuarios autenticados pueden actualizar la información de un usuario.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *       401:
 *         description: No autorizado. Se requiere token válido.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.patch("/updateUser/:uid", updateUserValidator, updateUser);

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