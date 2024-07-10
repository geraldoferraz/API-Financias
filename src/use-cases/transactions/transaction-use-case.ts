import { Transaction } from "@prisma/client";
import { TransactionRepository } from "../../repositories/prisma/transactions-repository";

interface CreateTransactionUseCaseRequest {
        label: string,
        value: number
        type: number
        userId: string 
        description?: string
}

interface CreateTransactionUseCaseResponse {
    transaction: Transaction
}

export class CreateTransactionUseCase {

    constructor(private transactionRepository: TransactionRepository){
    }

    async execute({label, value, type, description, userId }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {

        if (value === 0) {
            throw new Error('Error: Invalid transaction value.')
        }
      
        if (type !== 0 && type !== 1) {
            throw new Error('Error: Invalid transaction type. Must be 0 (outflow) or 1 (inflow).')
        }

        if (type === 0) {
            value = -Math.abs(value);
        }

        
    
       const transaction = await this.transactionRepository.create({
            label,
            value,
            type, 
            description, 
            userId
        })

        return { transaction }
    }
    
}
 
