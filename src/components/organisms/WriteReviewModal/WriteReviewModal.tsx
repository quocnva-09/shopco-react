import { useState } from "react";
import { Modal } from "../Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import "./WriteReviewModal.scss";

export type WriteReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { rating: number; reviewText: string }) => void;
};

export const WriteReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
}: WriteReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (reviewText.trim().length === 0) {
      setError("Please write a review");
      return;
    }
    
    onSubmit({ rating, reviewText });
    
    // Reset state after submission
    setRating(0);
    setReviewText("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <Modal.Header title="Write a Review" />
      <Modal.Body>
        <div className="write-review-modal__form">
          <div>
            <Text className="write-review-modal__label">Rating</Text>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="write-review-modal__select"
            >
              <option value={0}>Select a rating...</option>
              <option value={5}>5 Stars - Excellent</option>
              <option value={4}>4 Stars - Good</option>
              <option value={3}>3 Stars - Average</option>
              <option value={2}>2 Stars - Poor</option>
              <option value={1}>1 Star - Terrible</option>
            </select>
          </div>
          
          <div>
            <Text className="write-review-modal__label">Your Review</Text>
            <Input
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us what you think..."
              className="write-review-modal__input"
            />
          </div>

          {error && <Text className="write-review-modal__error">{error}</Text>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
