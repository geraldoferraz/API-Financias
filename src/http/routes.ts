import { FastifyInstance } from "fastify";
import { findUser, findUserById, register } from "./controller/users";
import { createTransaction, getTransaction, amountTransaction, TransactionByTypeUseCase, getTransactionCounts } from "./controller/transactions";

export async function appRoutes(app: FastifyInstance) {
    // Users
    app.post('/users', register);
    app.post('/user', findUser);
    app.get('/user/:userId', findUserById)

    // Transactions 
    app.post('/transaction/:userId', createTransaction);
    app.get('/transactions/:userId', getTransaction);
    app.get('/amount/transactions/:userId', amountTransaction);
    app.get('/transactions/type/:userId', TransactionByTypeUseCase);
    app.get('/transactions/count/:userId', getTransactionCounts);
}
