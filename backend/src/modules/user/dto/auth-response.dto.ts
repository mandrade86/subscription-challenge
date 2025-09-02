export class AuthResponseDto {
  accessToken: string
  refreshToken: string
  user: {
    _id: string
    name: string
    email: string
  }
}

export class RefreshResponseDto {
  accessToken: string
  refreshToken: string
}
