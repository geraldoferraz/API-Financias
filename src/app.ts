import fastify from "fastify";
import { PrismaClient} from '@prisma/client'
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes"
// import cors from '@fastify/cors'

// app.register(cors, {
//     origin: ["http://localhost:3000"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"]
// });

const prisma = new PrismaClient();
export const app = fastify({ logger: true });

app.register(appRoutes);

app.setErrorHandler((error, request, response) => {
    if (error instanceof ZodError) {
        return response
            .status(400)
            .send({ message: 'Validation Error.', issues: error.format() });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    }

    return response.status(500).send({ message: 'Internal Server Error' });
});
