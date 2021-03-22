export class Multiplication {
    factorA: number;
    factorB: number;
}

export class User {
    alias: string;
}

export class MultiplicationResultAttempt {
    user: User;
    multiplication: Multiplication;
    resultAttempt: number;
    correct: boolean;
}