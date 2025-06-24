// API Response Types for Resume Management

export interface DeleteResumeSuccessResponse {
  message: string;
  deleted: boolean;
}

export interface DeleteResumeErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface APIErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface APISuccessResponse<T = unknown> {
  message: string;
  data?: T;
}

// Type guard functions
export function isDeleteSuccessResponse(response: unknown): response is DeleteResumeSuccessResponse {
  return (
    response !== null &&
    typeof response === 'object' &&
    'deleted' in response &&
    (response as DeleteResumeSuccessResponse).deleted === true
  );
}

export function isErrorResponse(response: unknown): response is DeleteResumeErrorResponse | APIErrorResponse {
  return (
    response !== null &&
    typeof response === 'object' &&
    'error' in response &&
    'statusCode' in response
  );
}
