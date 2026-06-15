import { useCallback, useState } from "react";
import { isApiError } from "@/utils/ApiError";
import { DEFAULT_ERROR_MESSAGE } from "@/consts/errorCodes";
import { isRetryableErrorKind } from "@/consts/errorKinds";

interface AsyncState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  isRetryable: boolean;
}

/**
 * Generic async execution hook.
 * Handles the standard loading/error/data state quartet and the isApiError
 * branching that was previously duplicated in useProduct and useProductCollection.
 *
 * @param asyncFn - A stable (memoized) async function. Wrap in `useCallback` at the call site.
 *
 * @example
 * const fetcher = useCallback(() => ProductService.getById(id).then(r => r.data), [id]);
 * const { data, isLoading, error, isRetryable, execute } = useAsync(fetcher);
 */
export const useAsync = <T>(asyncFn: () => Promise<T>) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    isLoading: true,
    error: null,
    isRetryable: false,
  });

  const execute = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const data = await asyncFn();
      setState({ data, isLoading: false, error: null, isRetryable: false });
    } catch (err) {
      const error = isApiError(err) ? err.uiMessage : DEFAULT_ERROR_MESSAGE;
      const isRetryable = isApiError(err)
        ? isRetryableErrorKind(err.kind)
        : false;
      setState((s) => ({ ...s, isLoading: false, error, isRetryable }));
    }
  }, [asyncFn]);

  return { ...state, execute };
};
