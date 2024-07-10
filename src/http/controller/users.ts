import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserByIdUseCase, makeGetUsersUseCase, makeUsersUseCase } from "../../use-cases/factories/make-users-use-case";

export async function register(request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        cpf: z.string(),
        age: z.number(),
        password: z.string().min(5),
    });

    try {
        const { name, email, cpf, age, password } = registerBodySchema.parse(request.body);

        const usersUseCase = makeUsersUseCase();

        const user = await usersUseCase.execute({
            name,
            email,
            cpf,
            password,
            age,
        });

        response.status(200).send({ userId: user.user.id });

    } catch (err) {
        console.error("Error during user registration:", err);
        if (err instanceof z.ZodError) {
            response.status(400).send({
                message: "Validation Error.",
                issues: err.errors,
            });
        } else {
            response.status(500).send({ message: 'Internal server error.' });
        }
    }
}

export async function findUser(request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(5),
    });

    try {
        const { email, password } = registerBodySchema.parse(request.body);

        const usersUseCase = makeGetUsersUseCase();

        const { id } = await usersUseCase.execute({
            email,
            password,
        });

        response.status(200).send({ id });

    } catch (err) {
        console.error("Error during user login:", err);
        if (err instanceof z.ZodError) {
            response.status(400).send({
                message: "Validation Error.",
                issues: err.errors,
            });
        } else {
            response.status(500).send({ message: 'Internal server error.' });
        }
    }
}


export async function findUserById(request: FastifyRequest, response: FastifyReply) {
    
    const userIdSchema = z.object({
        userId: z.string()
    });

    try {
        const { userId } = userIdSchema.parse(request.params);

        const usersUseCase = makeGetUserByIdUseCase();

        const { user } = await usersUseCase.execute({
            id: userId
        });

        response.status(200).send(user);

    } catch (err) {
        console.error("Error during user login:", err);
        if (err instanceof z.ZodError) {
            response.status(400).send({
                message: "Validation Error.",
                issues: err.errors,
            });
        } else {
            response.status(500).send({ message: 'Internal server error.' });
        }
    }
}
