import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../../repositories/prisma/transactions-repository";

interface GetTransactionByTypeUseCaseRequest {
    userId: string;
}

interface GetTransactionByTypeUseCaseResponse {
    transactions: Transaction[];
}

export class GetTransactionByTypeUseCase {
    constructor(private transactionRepository: TransactionRepository) {}

    async execute({ userId }: GetTransactionByTypeUseCaseRequest): Promise<GetTransactionByTypeUseCaseResponse> {
        const transactions = await this.transactionRepository.getTransactionsByType(userId)

        if (transactions.length === 0) {
            throw new Error('Error: No transactions found.');
        }

        return { transactions };
    }
}
