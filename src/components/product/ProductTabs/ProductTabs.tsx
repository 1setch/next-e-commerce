// components/product/ProductTabs/ProductTabs.tsx
'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { useToastStore } from '@/store/toastStore';
import styles from './ProductTabs.module.css';

interface Review {
  _id: string;
  userId: string;
  userName: string;
  userImage?: string;
  productId: string;
  rating: number;
  text: string;
  createdAt: string;
}

interface ProductTabsProps {
  productId: string;
  description: string;
  rating: number;
  reviewCount: number;
  details?: string[];
}

const ProductTabs = ({ productId, description, rating, reviewCount, details }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'faq'>('details');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  // Данные текущего пользователя
  const [userName, setUserName] = useState('User');
  const [userImage, setUserImage] = useState('');

  // FAQ
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [anonName, setAnonName] = useState('');
  const [submittingQuestion, setSubmittingQuestion] = useState(false);

  // Загружаем профиль один раз
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user?.name) setUserName(data.user.name);
        if (data?.user?.image) setUserImage(data.user.image);
      })
      .catch(() => { });
  }, []);

  // Загружаем отзывы
  useEffect(() => {
    if (activeTab === 'reviews') {
      setLoadingReviews(true);
      fetch(`/api/reviews?productId=${productId}`)
        .then((res) => res.json())
        .then((data) => setReviews(Array.isArray(data) ? data : []))
        .finally(() => setLoadingReviews(false));
    }
  }, [activeTab, productId]);

  // Загружаем вопросы
  useEffect(() => {
    if (activeTab === 'faq') {
      setLoadingQuestions(true);
      fetch(`/api/questions?productId=${productId}`)
        .then((res) => res.json())
        .then((data) => setQuestions(Array.isArray(data) ? data : []))
        .finally(() => setLoadingQuestions(false));
    }
  }, [activeTab, productId]);

  const handleSubmitReview = async () => {
    if (!newText.trim()) return;

    setSubmitting(true);
    try {
      console.log('Submitting review with:', { userName, userImage });
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          rating: newRating,
          text: newText,
          userName,
          userImage,
        }),
      });

      if (res.ok) {
        const review = await res.json();
        setReviews((prev) => [review, ...prev]);
        setShowForm(false);
        setNewText('');
        setNewRating(5);
        addToast('Review submitted!', 'success');
      } else {
        const data = await res.json();
        addToast(data.error || 'Failed to submit review', 'error');
      }
    } catch {
      addToast('Something went wrong', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitQuestion = async () => {
    if (!newQuestion.trim()) return;
    const submitName = userName !== 'User' ? userName : anonName.trim() || 'Anonymous';

    setSubmittingQuestion(true);
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, question: newQuestion, userName: submitName }),
    });

    if (res.ok) {
      const q = await res.json();
      setQuestions((prev) => [q, ...prev]);
      setNewQuestion('');
      setAnonName('');
      setShowQuestionForm(false);
      addToast('Question submitted!', 'success');
    } else {
      addToast('Failed to submit question', 'error');
    }
    setSubmittingQuestion(false);
  };

  const tabs = [
    { key: 'details' as const, label: 'Product Details' },
    { key: 'reviews' as const, label: `Rating & Reviews (${reviewCount})` },
    { key: 'faq' as const, label: 'FAQs' },
  ];

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={styles.content}>
        {/* ====== DETAILS ====== */}
       
       
        {activeTab === 'details' && (
          <div className={styles.details}>
            
            {details && details.length > 0 && (
              <ul>
                {details.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ====== REVIEWS ====== */}
        {activeTab === 'reviews' && (
          <div className={styles.reviews}>
            <div className={styles.reviewsHeader}>
              <div>
                <span className={styles.reviewsRatingNum}>{rating}</span>
                <span className={styles.reviewsStars}>
                  {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
                </span>
                <span className={styles.reviewsCount}>{reviewCount} reviews</span>
              </div>
              <Button variant="outline" onClick={() => setShowForm(!showForm)}>
                Write a Review
              </Button>
            </div>

            {showForm && (
              <div className={styles.reviewForm}>
                <div className={styles.starsSelect}>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.starBtn} ${star <= newRating ? styles.starActive : ''}`}
                      onClick={() => setNewRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Share your experience..."
                  rows={4}
                  required
                />
                <div className={styles.reviewFormActions}>
                  <Button onClick={handleSubmitReview} disabled={submitting || !newText.trim()}>
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                  <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </div>
            )}

            {loadingReviews ? (
              <p className={styles.empty}>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className={styles.empty}>No reviews yet. Be the first!</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewUser}>
                      <div className={styles.reviewAvatar}>
                        {review.userImage ? (
                          <img src={review.userImage} alt="" />
                        ) : (
                          <span>{review.userName[0]?.toUpperCase()}</span>
                        )}
                      </div>
                      <span className={styles.reviewUserName}>{review.userName}</span>
                    </div>
                    <span className={styles.reviewRating}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p>{review.text}</p>
                  <span className={styles.reviewDate}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* ====== FAQ ====== */}
        {activeTab === 'faq' && (
          <div className={styles.faq}>
            <div className={styles.reviewsHeader}>
              <div>
                <span className={styles.reviewsRatingNum}>{questions.length}</span>
                <span className={styles.reviewsCount}>questions</span>
              </div>
              <Button variant="outline" onClick={() => setShowQuestionForm(!showQuestionForm)}>
                Ask a Question
              </Button>
            </div>

            {showQuestionForm && (
              <div className={styles.reviewForm}>
                {userName === 'User' && (
                  <Input
                    placeholder="Your name"
                    value={anonName}
                    onChange={(e) => setAnonName(e.target.value)}
                    fullWidth
                  />
                )}
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="What do you want to know?"
                  rows={3}
                  required
                />
                <div className={styles.reviewFormActions}>
                  <Button onClick={handleSubmitQuestion} disabled={submittingQuestion || !newQuestion.trim()}>
                    {submittingQuestion ? 'Sending...' : 'Ask Question'}
                  </Button>
                  <Button variant="ghost" onClick={() => setShowQuestionForm(false)}>Cancel</Button>
                </div>
              </div>
            )}

            {loadingQuestions ? (
              <p className={styles.empty}>Loading...</p>
            ) : questions.length === 0 ? (
              <p className={styles.empty}>No questions yet. Be the first!</p>
            ) : (
              questions.map((q) => (
                <details key={q._id} className={styles.faqItem}>
                  <summary>
                    <span>{q.question}</span>
                    <span className={styles.faqUser}>— {q.userName}</span>
                  </summary>
                  {q.answer ? (
                    <p>{q.answer}</p>
                  ) : (
                    <p className={styles.faqNoAnswer}>Waiting for an answer...</p>
                  )}
                </details>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;