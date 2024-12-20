// Generic ApiResponse type that will be used to define the response structure of all API calls
export interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T // The generic type that will be replaced with specific data types
  errors: string[] | null
}
