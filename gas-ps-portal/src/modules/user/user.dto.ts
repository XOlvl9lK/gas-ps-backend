import { User } from '../../entities/User'

export class UserDto {
  id: number
  login: string
  email?: string
  firstName?: string
  lastName?: string
  surName?: string
  avatar?: string

  constructor(user: User) {
    this.id = user.id
    this.login = user.login
    this.email = user.email
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.surName = user.surName
    this.avatar = user.avatar
  }
}