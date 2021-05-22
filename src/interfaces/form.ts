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
        incorrect_answers: string[];
        allAnswers: string[];
    }
];

type submitType = {
    answers: string[];
    questions: submitFormType;
};

type reportType = {
    correctAnswers: number;
    wrongAnswers: number;
    answers: string[];
    questions: submitFormType;
} | null;

export type { submitType, currentFormType, submitFormType, reportType };
