export interface Meta {
    code: number;
    currentPage: number;
    message: string;
    pageCount: number;
    perPage: number;
    rateLimit: {
      limit: number,
      remaining: number,
      reset: number
    };
    success: boolean;
    totalCount: number;
}
