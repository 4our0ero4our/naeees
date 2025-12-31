/**
 * Interface for the user object
 * @interface AuthUser
 * @property {string} id - The id of the user
 * @property {string} email - The email of the user
 * @property {string} role - The role of the user
 * @property {string} membershipStatus - The membership status of the user
 */

export interface AuthUser {
    id: string;
    email: string;
    role: string;
    membershipStatus: string;
  }

export interface AuthCredentials {
  email: string;
  password: string;
}