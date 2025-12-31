import { ROLES } from "../constants/auth";
import { MEMBERSHIP_STATUS } from "../constants/auth";

/**
 * Validate the email to be a valid email from futminna
 * @param email - The email to validate
 * @returns true if the email is valid (has @st.futminna.edu.ng), false otherwise
 * @throws {Error} if the email is not a valid futminna email
 */

export function isValidFutminnaEmail(email: string) {
  if (!/^[^\s@]+@st\.futminna\.edu\.ng$/.test(email)) {
    throw new Error("Invalid futminna email");
  }
  return true;
}

/** 
Validate the register input
@param fullName - The full name of the user
@param email - The email of the user
@param matricNumber - The matric number of the user
@param password - The password of the user
@param confirmPassword - The confirm password of the user
@param role - The role of the user
@param membershipStatus - The membership status of the user
@returns true if the data is valid, throws an error if the data is invalid
@throws {Error} if the full name is not a valid full name
@throws {Error} if the email is not a valid email
@throws {Error} if the matric number is not a valid matric number
@throws {Error} if the password is less than 8 characters
@throws {Error} if the confirm password is not a valid confirm password
@throws {Error} if the role is not a valid role
@throws {Error} if the membership status is not a valid membership status
*/
export function validateRegisterInput(data: {
    fullName: string;
    email: string;
    matricNumber: string;
    password: string;
    confirmPassword: string;
    role: string;
    membershipStatus: string;
    // isActive: boolean;
  }) {
    if (!data.fullName || !data.email || !data.matricNumber || !data.password || !data.confirmPassword || !data.role || !data.membershipStatus) {
      throw new Error("All fields are required");
    }
  
    if (data.password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
  
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match");
    }
  
    if (data.role !== ROLES.STUDENT && data.role !== ROLES.ADMIN) {
      throw new Error("Invalid role");
    }
  
    if (data.membershipStatus !== MEMBERSHIP_STATUS.MEMBER && data.membershipStatus !== MEMBERSHIP_STATUS.NON_MEMBER && data.membershipStatus !== MEMBERSHIP_STATUS.PENDING) {
      throw new Error("Invalid membership status");
    }
  
    // if (data.isActive !== true && data.isActive !== false) {
    //   throw new Error("Invalid is active");
    // }
  
    return true;
  }
  
/**
Validate the login input
@param email - The email of the user
@param password - The password of the user
@returns true if the data is valid, throws an error if the data is invalid
@throws {Error} if the email is not a valid email
@throws {Error} if the password is not a valid password
@throws {Error} if the email is not a valid futminna email
*/
export function validateLoginInput(data: {
  email: string;
  password: string;
}) { 
  if (!data.email || !data.password) {
    throw new Error("All fields are required");
  }

  if (!isValidFutminnaEmail(data.email)) {
    throw new Error("Invalid futminna email");
  }

  if (data.password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  return true;
} 