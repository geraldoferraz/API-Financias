import { PrismaClient, User, Prisma } from "@prisma/client";

export interface UsersRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByCPF(cpf: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    delete(id: string): Promise<User>;
    update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User>;
    // findUser(email: string, password: string): Promise<User | null>;
}
 