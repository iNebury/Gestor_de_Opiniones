import { Router } from "express"
import { register, login} from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/usuario-validator.js"

const router = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Crea un nuevo usuario. No se requiere autenticación por token.
 *     tags: [Autenticación]
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
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente.
 *       400:
 *         description: Datos inválidos o mal formateados.
 *       500:
 *         description: Error en el servidor.
 */
router.post("/register", registerValidator, register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Inicia sesión de un usuario y devuelve un token. No se requiere autenticación por token.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Se devuelve un token JWT.
 *       401:
 *         description: Credenciales incorrectas.
 *       500:
 *         description: Error en el servidor.
 */
router.post("/login", loginValidator, login);


export default router