"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/aut.routes.js"
import userRoutes from "../src/usuario/usuario.routes.js"
import categoria from "../src/categoria/categoria.routes.js"
import comentarioRoutes from "../src/comentario/comentario.routes.js"
import publicacionRoutes from "../src/publicaciones/publicacion.routes.js"
import createAdmin from "../src/usuario/crearAdmin.js"
import { swaggerDocs, swaggerUi } from "./swagger.js";


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) =>{
    app.use("/gestorDeComentarios/v1/auth", authRoutes)
    app.use("/gestorDeComentarios/v1/user", userRoutes)
    app.use("/gestorDeComentarios/v1/categoria", categoria)
    app.use("/gestorDeComentarios/v1/comentario", comentarioRoutes)
    app.use("/gestorDeComentarios/v1/publicacion", publicacionRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () =>{
    try{
        await dbConnection()
        await createAdmin()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}