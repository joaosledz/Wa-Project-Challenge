type currentFormType = [
    {
        category: string;
        type: 'multiple' | 'boolean';
        difficulty: 'easy' | 'medium' | 'hard';
        question: string;
        correct_answer: string;
        incorrect_answers: [string];
    }
];

type submitFormType = [
    {
        category: string;
        type: 'multiple' | 'boolean';
        difficulty: 'easy' | 'medium' | 'hard';
        question: string;
        correct_answer: string;
        incorrect_answers: [string];
        allAnswers: string[];
    }
];

export type { currentFormType, submitFormType };
