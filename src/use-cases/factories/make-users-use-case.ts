import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetUserByIdUseCase } from "../users-authenticate/findbyid-use-cases";
import { UsersUseCase } from "../users-authenticate/register-use-case"
import { GetUsersUseCase } from "../users-authenticate/search-use-case";

export function makeUsersUseCase(){
        const prismaUsersRepository = new PrismaUsersRepository()
        const usersUseCase = new UsersUseCase(prismaUsersRepository)

        return usersUseCase
}

export function makeGetUsersUseCase(){
        const prismaUsersRepository = new PrismaUsersRepository()
        const usersUseCase = new GetUsersUseCase(prismaUsersRepository)

        return usersUseCase
}

export function makeGetUserByIdUseCase(){
        const prismaUsersRepository = new PrismaUsersRepository()
        const usersUseCase = new GetUserByIdUseCase(prismaUsersRepository)

        return usersUseCase
}



