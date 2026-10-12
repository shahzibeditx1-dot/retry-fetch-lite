export interface RetryOptions {
  retries?: number; minDelay?: number; maxDelay?: number;
  factor?: number; jitter?: boolean;
  onRetry?: (error: Error, attempt: number, delay: number) => void;
}
export declare function retry<T>(fn: (attempt: number) => Promise<T>, options?: RetryOptions): Promise<T>;
export declare function retryFetch(url: string, init?: RequestInit, options?: RetryOptions): Promise<Response>;
export default retry;
