import { Prisma, PrismaClient, Transaction } from "@prisma/client";
import { TransactionRepository } from "./transactions-repository";

const prisma = new PrismaClient();

export class PrismaTransactionsRepository implements TransactionRepository {

    async countByType(userId: string, type: number): Promise<number> {
        const count = await prisma.transaction.count({
            where: {
                userId,
                type
            }
        });
        return count;
    }

    async getTransactionsByType(userId: string) {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: userId,
                type: 0
            }
        });
        return transactions;
    }

    async findById(id: string) {
        const transaction = await prisma.transaction.findUnique({
            where: { id }
        });
        return transaction;
    }

    async findManyByUserId(userId: string) {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            orderBy: {
                date: 'desc'
            }
        });
        console.log(transactions)
        return transactions;
    }


    async countByUserId(userId: string) {
        const count = await prisma.transaction.count({
            where: { userId }
        });
        return count;
    }

    async amountByUserId(userId: string) {
        const result = await prisma.transaction.aggregate({
            _sum: { value: true },
            where: { userId }
        });
        return result._sum.value ?? 0;
    }

    async create(data: Prisma.TransactionUncheckedCreateInput) {
        const transaction = await prisma.transaction.create({ data });
        return transaction;
    }
}
