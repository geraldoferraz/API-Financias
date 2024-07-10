import { compare } from "bcryptjs";
import { UsersRepository } from "../../repositories/prisma/users-repository";
import { User } from "@prisma/client";

interface UsersUseCaseRequest {
    email: string;
    password: string;
}

interface UsersUseCaseResponse {
    id: string;
}

export class GetUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: UsersUseCaseRequest): Promise<UsersUseCaseResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await compare(password, user.password_hash);

        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        return { id: user.id };
    }
}
