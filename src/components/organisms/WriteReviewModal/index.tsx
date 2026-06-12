import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import { Modal } from "../Modal";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { WRITE_REVIEW_MESSAGES } from "@/consts/messages";
import { writeReviewValidationRules } from "@/utils/writeReviewValidation";
import type { WriteReviewPayload } from "@/types/payload/write-review.payload";
import "./index.scss";

// Internal form shape — maps to the API payload on submit
type WriteReviewFormValues = {
  orderId: number | undefined;
  guestName: string;
  guestEmail: string;
  rating: number;
  comment: string;
};

export type WriteReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WriteReviewPayload) => void;
};

const STAR_COUNT = 5;

const DEFAULT_VALUES: WriteReviewFormValues = {
  orderId: undefined,
  guestName: "",
  guestEmail: "",
  rating: 0,
  comment: "",
};

export const WriteReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
}: WriteReviewModalProps) => {
  // Derive product ID from the URL — avoids prop drilling through multiple component layers
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<WriteReviewFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const currentRating = watch("rating");

  const handleFormSubmit = (values: WriteReviewFormValues) => {
    onSubmit({
      order_id: values.orderId,
      product_id: productId,
      rating: values.rating,
      comment: values.comment,
      guest_name: values.guestName,
      guest_email: values.guestEmail,
    });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Helper to render a standard labeled input field row
  const renderInputField = (
    id: keyof WriteReviewFormValues,
    label: string,
    registerResult: ReturnType<typeof register>,
    options: { type?: string; placeholder?: string } = {},
  ) => {
    const error = errors[id];
    return (
      <li className="write-review-modal__item">
        <label htmlFor={id} className="write-review-modal__label">
          {label}
        </label>
        <Input
          id={id}
          type={options.type}
          placeholder={options.placeholder}
          className={clsx(
            "write-review-modal__input",
            error && "write-review-modal__input--error",
          )}
          {...registerResult}
        />
        {error && (
          <Text as="span" className="write-review-modal__error">
            {error.message}
          </Text>
        )}
      </li>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} closeOnOverlayClick={false}>
      <Modal.Header title={WRITE_REVIEW_MESSAGES.TITLE} />
      <Modal.Body>
        <ul className="write-review-modal__list">
          {renderInputField(
            "orderId",
            WRITE_REVIEW_MESSAGES.LABELS.ORDER_ID,
            register("orderId", writeReviewValidationRules.orderId),
            {
              type: "number",
              placeholder: WRITE_REVIEW_MESSAGES.PLACEHOLDERS.ORDER_ID,
            },
          )}

          {renderInputField(
            "guestName",
            WRITE_REVIEW_MESSAGES.LABELS.GUEST_NAME,
            register("guestName", writeReviewValidationRules.guestName),
            { placeholder: WRITE_REVIEW_MESSAGES.PLACEHOLDERS.GUEST_NAME },
          )}

          {renderInputField(
            "guestEmail",
            WRITE_REVIEW_MESSAGES.LABELS.GUEST_EMAIL,
            register("guestEmail", writeReviewValidationRules.guestEmail),
            {
              type: "email",
              placeholder: WRITE_REVIEW_MESSAGES.PLACEHOLDERS.GUEST_EMAIL,
            },
          )}

          {/* Rating — inline star picker */}
          <li className="write-review-modal__item">
            <label className="write-review-modal__label">
              {WRITE_REVIEW_MESSAGES.LABELS.RATING}
            </label>
            <Controller
              name="rating"
              control={control}
              rules={{
                validate: (v) =>
                  v > 0 || WRITE_REVIEW_MESSAGES.ERRORS.RATING_REQUIRED,
              }}
              render={({ field: { onChange } }) => (
                <div className="write-review-modal__rating-wrapper">
                  <div
                    className={clsx(
                      "write-review-modal__stars",
                      errors.rating && "write-review-modal__stars--error",
                    )}
                    role="radiogroup"
                    aria-label={WRITE_REVIEW_MESSAGES.LABELS.RATING}
                  >
                    {Array.from({ length: STAR_COUNT }, (_, i) => {
                      const fullStarValue = i + 1;
                      const leftHalfValue = fullStarValue - 0.5;
                      const rightHalfValue = fullStarValue;

                      const effectiveRating = hoverRating || currentRating;
                      const isLeftFilled = leftHalfValue <= effectiveRating;
                      const isRightFilled = rightHalfValue <= effectiveRating;

                      return (
                        <div key={fullStarValue} className="write-review-modal__star-container">
                          <button
                            type="button"
                            role="radio"
                            aria-checked={leftHalfValue === currentRating}
                            aria-label={`${leftHalfValue} stars`}
                            className={clsx(
                              "write-review-modal__half-star",
                              isLeftFilled
                                ? "half-star--left"
                                : "half-star-left--empty",
                            )}
                            onClick={() => onChange(leftHalfValue)}
                            onMouseEnter={() => setHoverRating(leftHalfValue)}
                            onMouseLeave={() => setHoverRating(0)}
                          />
                          <button
                            type="button"
                            role="radio"
                            aria-checked={rightHalfValue === currentRating}
                            aria-label={`${rightHalfValue} stars`}
                            className={clsx(
                              "write-review-modal__half-star",
                              isRightFilled
                                ? "half-star--right"
                                : "half-star-right--empty",
                            )}
                            onClick={() => onChange(rightHalfValue)}
                            onMouseEnter={() => setHoverRating(rightHalfValue)}
                            onMouseLeave={() => setHoverRating(0)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <span className="write-review-modal__rating-text">
                    {currentRating > 0 || hoverRating > 0
                      ? `${(hoverRating || currentRating).toFixed(1)}/5`
                      : "0.0/5"}
                  </span>
                </div>
              )}
            />
            {errors.rating && (
              <Text as="span" className="write-review-modal__error">
                {errors.rating.message}
              </Text>
            )}
          </li>

          {/* Comment */}
          <li className="write-review-modal__item">
            <label htmlFor="comment" className="write-review-modal__label">
              {WRITE_REVIEW_MESSAGES.LABELS.REVIEW}
            </label>
            <textarea
              id="comment"
              placeholder={WRITE_REVIEW_MESSAGES.PLACEHOLDERS.REVIEW}
              className={clsx(
                "form-input",
                "write-review-modal__textarea",
                errors.comment && "write-review-modal__input--error",
              )}
              rows={4}
              {...register("comment", writeReviewValidationRules.comment)}
            />
            {errors.comment && (
              <Text as="span" className="write-review-modal__error">
                {errors.comment.message}
              </Text>
            )}
          </li>
        </ul>

        {/* Hidden product_id — supplied via props, not tracked by RHF */}
        <input type="hidden" value={productId} name="product_id" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" onClick={handleClose}>
          {WRITE_REVIEW_MESSAGES.BUTTONS.CANCEL}
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)}>
          {WRITE_REVIEW_MESSAGES.BUTTONS.SUBMIT}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
