import { PrismaTransactionsRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { CreateTransactionUseCase } from "../transactions/transaction-use-case"
import { AmountTransactionUseCase } from "../transactions/amount-transactions-use-case"
import { GetTransactionUseCase } from "../transactions/get-transactions-use-case"
import { GetTransactionByTypeUseCase } from "../transactions/get-transactions-by-type-use-cases";

export function makeTransactionUseCase(){
        const prismaTransactionsRepository = new PrismaTransactionsRepository()
        const createTransactionUseCase = new CreateTransactionUseCase(prismaTransactionsRepository)

        return createTransactionUseCase
}

export function makeAmountTransactionUseCase(){
    const prismaTransactionsRepository = new PrismaTransactionsRepository()
    const amountTransactionUseCase = new AmountTransactionUseCase(prismaTransactionsRepository)

    return amountTransactionUseCase
}

export function makeGetTransactionUseCase(){
    const prismaTransactionsRepository = new PrismaTransactionsRepository()
    const getTransactionUseCase = new GetTransactionUseCase(prismaTransactionsRepository)

    return getTransactionUseCase
}

export function makeGetTransactionByTypeUseCase(){
    const prismaTransactionsRepository = new PrismaTransactionsRepository()
    const getTransactionByTypeUseCase = new GetTransactionByTypeUseCase(prismaTransactionsRepository)

    return getTransactionByTypeUseCase
}

