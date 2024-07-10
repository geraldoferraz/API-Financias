import { Prisma, Transaction } from "@prisma/client";

export interface TransactionRepository {
    findById(id: string): Promise<Transaction | null>;
    findManyByUserId(userId: string): Promise<Transaction[]>;
    create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
    countByUserId(userId: string): Promise<number>;
    amountByUserId(userId: string): Promise<number>;
    getTransactionsByType(userId: string): Promise<Transaction[]>;
    countByType(userId: string, type: number): Promise<number>
}
