// Base response type
export interface ApiResponse<T> {
  status: number
  message: string
  data?: T
  error?: string
}