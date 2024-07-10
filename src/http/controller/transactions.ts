import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaTransactionsRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { CreateTransactionUseCase } from "../../use-cases/transactions/transaction-use-case";
import { makeTransactionUseCase, makeGetTransactionUseCase, makeAmountTransactionUseCase, makeGetTransactionByTypeUseCase } from "../../use-cases/factories/make-trasaction-use-case"


export async function createTransaction(request: FastifyRequest, response: FastifyReply) {
    
    const transactionBodySchema = z.object({
        label: z.string(),
        value: z.number(),
        type: z.number(),
        description: z.string().optional()
    });

    const userIdSchema = z.object({
        userId: z.string()
    });

    const { userId } = userIdSchema.parse(request.params);

    const { label, value, type, description } = transactionBodySchema.parse(request.body);

    try {
        const transactionUseCase = makeTransactionUseCase();

        const { transaction } = await transactionUseCase.execute({
            label,
            value,
            type,
            description,
            userId
        });

        response.status(200).send(transaction);
    } catch (err) {
        response.status(400).send({ message: 'Error: Invalid transaction creation' });
    }
}

export async function getTransaction(request: FastifyRequest, response: FastifyReply) {
    const transactionBodySchema = z.object({
        userId: z.string()
    });

    try {
        const { userId } = transactionBodySchema.parse(request.params);

        const transactionUseCase = makeGetTransactionUseCase();

        const { transactions } = await transactionUseCase.execute({ userId });

        response.status(200).send(transactions);
    } catch (err) {
        console.error("Error during transaction retrieval:", err);
        response.status(400).send('Internal server error.');
    }
}

export async function amountTransaction(request: FastifyRequest, response: FastifyReply) {
    const transactionParamsSchema = z.object({
        userId: z.string()
    });

    try {
        const { userId } = transactionParamsSchema.parse(request.params);

        const transactionUseCase = makeAmountTransactionUseCase();

        const { amountTransactions } = await transactionUseCase.execute({ userId });

        response.status(200).send(amountTransactions);
    } catch (err) {
        console.error("Error during transaction retrieval:", err);
        response.status(400).send({ message: 'Error: Internal server error.' });
    }
}

export async function getTransactionCounts(request: FastifyRequest, response: FastifyReply) {
    const userIdSchema = z.object({
        userId: z.string()
    });

    const { userId } = userIdSchema.parse(request.params);

    try {
        const transactionUseCase = makeAmountTransactionUseCase();

        const { saidas, entradas } = await transactionUseCase.countTransactions({ userId });

        response.status(200).send({ saidas, entradas });
    } catch (err) {
        response.status(400).send({ message: 'Error: Could not retrieve transaction counts' });
    }
}


export async function TransactionByTypeUseCase(request: FastifyRequest, response: FastifyReply){
    const transactionParamsSchema = z.object({
        userId: z.string()
    });

    try {
        const { userId } = transactionParamsSchema.parse(request.params);

        const transactionUseCase = makeGetTransactionByTypeUseCase();

        const { transactions } = await transactionUseCase.execute({ userId });

        response.status(200).send(transactions);
    } catch (err) {
        console.error("Error during transaction retrieval:", err);
        response.status(400).send({ message: 'Error: Internal server error.' });
    }
}