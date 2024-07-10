import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../../repositories/prisma/transactions-repository";

interface GetTransactionUseCaseRequest {
    userId: string;
}

interface GetTransactionUseCaseResponse {
    transactions: Transaction[];
}

export class GetTransactionUseCase {
    constructor(private transactionRepository: TransactionRepository) {}

    async execute({ userId }: GetTransactionUseCaseRequest): Promise<GetTransactionUseCaseResponse> {
        const transactions = await this.transactionRepository.findManyByUserId(userId);

        if (transactions.length === 0) {
            throw new Error('Error: No transactions found for this user.');
        }

        return { transactions };
    }
}
