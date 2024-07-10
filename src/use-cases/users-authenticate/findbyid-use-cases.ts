import { compare } from "bcryptjs";
import { UsersRepository } from "../../repositories/prisma/users-repository";
import { User } from "@prisma/client";

interface UserUseCaseRequest {
    id: string
}

interface UserUseCaseResponse {
    user: User;
}

export class GetUserByIdUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ id }: UserUseCaseRequest): Promise<UserUseCaseResponse> {

        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return { user };
    }
}
