'use client';

import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import styles from './QuestionsTab.module.css';

interface QuestionsTabProps {
    questions: any[];
    isLoading: boolean;
    onUpdateAnswer: (questionId: string, answer: string) => Promise<void>;
    onRefresh: () => Promise<void>;
}

export const QuestionsTab = ({ questions, isLoading, onUpdateAnswer, onRefresh }: QuestionsTabProps) => {
    const [answerText, setAnswerText] = useState<Record<string, string>>({});
    const [answeringId, setAnsweringId] = useState<string | null>(null);

    const handleAnswer = async (questionId: string) => {
        const answer = answerText[questionId];
        if (!answer?.trim()) return;
        
        setAnsweringId(questionId);
        await onUpdateAnswer(questionId, answer);
        setAnsweringId(null);
        setAnswerText((prev) => ({ ...prev, [questionId]: '' }));
    };

    const handleAnswerChange = (questionId: string, text: string) => {
        setAnswerText({ ...answerText, [questionId]: text });
    };

    if (isLoading && questions.length === 0) {
        return (
            <div className={styles.questionsSection}>
                <h3>Вопросы покупателей</h3>
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>Loading questions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.questionsSection}>
            <div className={styles.sectionHeader}>
                <h3>Вопросы покупателей</h3>
                <button onClick={onRefresh} className={styles.refreshBtn} disabled={isLoading}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={isLoading ? styles.spinning : ''}>
                        <path d="M14 2V6H10M2 14V10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M13 3C11.5 1.5 9 1 6.5 2C3.5 3 1.5 6 2 9.5M14 6.5C14.5 10 12.5 13 9.5 14C7 15 4.5 14.5 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Обновить
                </button>
            </div>
            
            {questions.length === 0 ? (
                <p className={styles.emptyText}>У матросов нет вопросов</p>
            ) : (
                questions.map((q) => (
                    <QuestionCard
                        key={q._id}
                        question={q}
                        answerText={answerText[q._id] || ''}
                        onAnswerChange={handleAnswerChange}
                        onAnswer={handleAnswer}
                        isAnswering={answeringId === q._id}
                    />
                ))
            )}
        </div>
    );
};