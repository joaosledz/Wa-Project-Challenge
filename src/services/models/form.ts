type formType = {
    response_code: number;
    results: [
        {
            category: string;
            type: 'multiple' | 'boolean';
            difficulty: 'easy' | 'medium' | 'hard';
            question: string;
            correct_answer: string;
            incorrect_answers: [string];
        }
    ];
};

export type { formType };
