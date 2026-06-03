import { useCallback, useEffect, useRef, useState } from "react";
import { ReviewService } from "@/services/review.service";
import type { ReviewParams } from "@/types/api/review.api";
import type { ReviewData } from "@/types/review";
import type { MetaData } from "@/types/api/api";
import { isRetryableErrorKind } from "@/consts/errorKinds";
import { DEFAULT_ERROR_MESSAGE } from "@/consts/errorCodes";
import { isApiError } from "@/utils/ApiError";
import { mapReviewData } from "@/utils/mappers/review.mapper";

type UseReviewsOptions = {
  /**
   * Enables the "Load More" pattern.
   */
  enableLoadMore?: boolean;
};

export const useReviews = (
  params: ReviewParams,
  options: UseReviewsOptions = {},
) => {
  const { enableLoadMore = false } = options;

  /** Page size = initial limit. Used as the increment for each "load more". */
  const pageSize = params.limit ?? 10;

  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRetryable, setIsRetryable] = useState(false);

  /**
   * Tracks the current limit without causing extra re-renders.
   * Mutated by loadMore; reset when params change.
   */
  const limitRef = useRef(pageSize);

  // Stable key from filter/sort params (limit excluded — managed internally).
  // Changes trigger a full reset to page size and fresh fetch.
  const baseParamsKey = JSON.stringify({ ...params, limit: undefined });

  /**
   * Core fetch — always fetches from the beginning up to `limitRef.current`.
   * @param mode  'initial' → shows isLoading; 'more' → shows isLoadingMore.
   */
  const doFetch = useCallback(
    async (mode: "initial" | "more") => {
      if (mode === "more") {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await ReviewService.getReviews({
          ...params,
          limit: limitRef.current,
        });
        setReviews(response.data.map(mapReviewData));
        setMeta(response.meta);
      } catch (err) {
        if (isApiError(err)) {
          setError(err.uiMessage);
          setIsRetryable(isRetryableErrorKind(err.kind));
        } else {
          setError(DEFAULT_ERROR_MESSAGE);
          setIsRetryable(false);
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseParamsKey],
  );

  // When params change (sort / filter), reset limit and fetch fresh data.
  useEffect(() => {
    limitRef.current = pageSize;
    doFetch("initial");
  }, [doFetch, pageSize]);

  /** Loads the next batch by increasing the limit and re-fetching. */
  const loadMore = useCallback(() => {
    if (!enableLoadMore || !meta || reviews.length >= meta.total) return;
    limitRef.current += pageSize;
    doFetch("more");
  }, [enableLoadMore, meta, reviews.length, pageSize, doFetch]);

  /** Resets to initial limit and re-fetches. */
  const retry = useCallback(() => {
    limitRef.current = pageSize;
    doFetch("initial");
  }, [doFetch, pageSize]);

  const hasMore = enableLoadMore && meta ? reviews.length < meta.total : false;

  const totalCount = meta?.total ?? 0;

  return {
    reviews,
    totalCount,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    isRetryable,
    retry,
    loadMore,
  };
};
