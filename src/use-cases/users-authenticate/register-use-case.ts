import { hash } from "bcryptjs";
import { UsersRepository } from "../../repositories/prisma/users-repository";
import { User } from "@prisma/client";

interface UsersUseCaseRequest {
    name: string;
    email: string;
    cpf: string;
    age: number;
    password: string;
}

interface UsersUseCaseResponse {
    user: User;
}

export class UsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, cpf, age, password }: UsersUseCaseRequest): Promise<UsersUseCaseResponse> {

        const password_hash = await hash(password, 6);

        const EmailExisting = await this.usersRepository.findByEmail(email);
        const cpfExisting = await this.usersRepository.findByCPF(cpf);

        if (EmailExisting) {
            throw new Error('Email Already in use');
        }

        if (cpfExisting) {
            throw new Error('CPF already in use');
        }

        const user = await this.usersRepository.create({
            name,
            email,
            cpf,
            age,
            password_hash
        });

        return { user };
    }
}
