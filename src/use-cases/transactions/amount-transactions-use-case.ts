import { TransactionRepository } from "../../repositories/prisma/transactions-repository";

interface AmountTransactionUseCaseRequest {
    userId: string;
}

interface AmountTransactionUseCaseResponse {
    amountTransactions: number;
}

interface countTransactionUseCaseRequest {
    userId: string;
}

interface countTransactionUseCaseResponse {
    saidas: number;
    entradas: number;
}

export class AmountTransactionUseCase {
    constructor(private transactionRepository: TransactionRepository) {}

    async execute({ userId }: AmountTransactionUseCaseRequest): Promise<AmountTransactionUseCaseResponse> {
        const amountTransactions = await this.transactionRepository.amountByUserId(userId);

        return { amountTransactions };
    }

    async countTransactions({ userId }: countTransactionUseCaseRequest): Promise<countTransactionUseCaseResponse> {
        const saidas = await this.transactionRepository.countByType(userId, 0);
        const entradas = await this.transactionRepository.countByType(userId, 1);

        return { saidas, entradas };
    }
}
