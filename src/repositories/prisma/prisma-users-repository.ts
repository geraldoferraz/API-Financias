import { Prisma, PrismaClient, User } from "@prisma/client";
import { UsersRepository } from './users-repository';
const prisma = new PrismaClient();

export class PrismaUsersRepository implements UsersRepository {

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data,
        });
        return user;
    } 

    // async findUser(email: string, password: string): Promise<User | null> {
    //     const user = await prisma.user.findUnique({
    //         where: { 
    //             email, 
    //             password_hash: password
    //         },
    //     });
        
    //     return user;
    // }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    }

    async findByCPF(cpf: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { cpf },
        });

        return user;
    }

    async findById(id: string): Promise<User | null> {
        console.log("Finding user by ID", id);
        const user = await prisma.user.findUnique({
            where: { id },
        });
        console.log("User found by ID", user);
        return user;
    }

    async delete(id: string): Promise<User> {
        console.log("Deleting user by ID", id);
        const user = await prisma.user.delete({
            where: { id },
        });
        console.log("User deleted", user);
        return user;
    }

    async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
        console.log("Updating user", where, data);
        const user = await prisma.user.update({
            where,
            data,
        });
        console.log("User updated", user);
        return user;
    }
}
