'use client';

import Button from '@/components/ui/Button/Button';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
    question: any;
    answerText: string;
    onAnswerChange: (questionId: string, text: string) => void;
    onAnswer: (questionId: string) => void;
    isAnswering?: boolean;
}

export const QuestionCard = ({ 
    question, 
    answerText, 
    onAnswerChange, 
    onAnswer,
    isAnswering = false
}: QuestionCardProps) => {
    return (
        <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
                <div>
                    <span className={styles.questionProduct}>{question.productName}</span>
                    <span className={styles.questionUser}>— {question.userName}</span>
                </div>
                <span className={`${styles.questionStatus} ${question.answer ? styles.statusAnswered : styles.statusPending}`}>
                    {question.answer ? 'Answered' : 'Pending'}
                </span>
            </div>
            <p className={styles.questionText}>{question.question}</p>
            {question.answer ? (
                <div className={styles.answerBlock}>
                    <span className={styles.answerLabel}>Answer:</span>
                    <p>{question.answer}</p>
                </div>
            ) : (
                <div className={styles.answerForm}>
                    <textarea
                        value={answerText}
                        onChange={(e) => onAnswerChange(question._id, e.target.value)}
                        placeholder="Write an answer..."
                        rows={3}
                        disabled={isAnswering}
                    />
                    <Button 
                        onClick={() => onAnswer(question._id)} 
                        disabled={!answerText?.trim() || isAnswering}
                    >
                        {isAnswering ? 'Sending...' : 'Answer'}
                    </Button>
                </div>
            )}
        </div>
    );
};