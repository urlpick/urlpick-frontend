// API Response Types
export interface UrlResponse {
  short_url: string
  original_url: string
  created_at: string
}

export interface ApiError {
  message: string
  status?: number
}

// Component Props Types
export interface UrlFormProps {
  onSubmit: (url: string, token: string) => Promise<boolean>
  isLoading: boolean
}

export interface UrlResultProps {
  result: UrlResponse
}

export interface CountdownCircleProps {
  countdown: number
  total: number
}

export interface RedirectContainerProps {
  hash: string
}

export interface LogoProps {
  size?: "default" | "small"
}

export interface HeaderProps {
  minimal?: boolean
}

export interface SocialSharePlatform {
  name: string
  url: string
}

// Theme Types
export type Theme = "light" | "dark" | "system"

