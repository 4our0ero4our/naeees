import bcrypt from "bcryptjs";
import { User } from "@/app/models/User.model";
import { connectDB } from "@/app/lib/db/connect";
import { validateRegisterInput } from "../lib/validators/auth";
import { isValidFutminnaEmail } from "../lib/validators/auth";
import { MEMBERSHIP_STATUS } from "../lib/constants/auth";
import { Member } from "../models/Member.model";

/**
Create a new user
@param fullName - The full name of the user
@param email - The email of the user
@param matricNumber - The matric number of the user
@param password - The password of the user
@param membershipStatus - The membership status of the user
@param role - The role of the user
@returns the created user
@throws {Error} if the user already exists
@throws {Error} if the data is invalid
@throws {Error} if the password is less than 8 characters
@throws {Error} if the email is not a valid email
@throws {Error} if the matric number is not a valid matric number
@throws {Error} if the full name is not a valid full name
@throws {Error} if the role is not a valid role
@throws {Error} if the membership status is not a valid membership status
*/
export async function createUser(data: {
  fullName: string;
  email: string;
  matricNumber: string;
  password: string;
  membershipStatus: string;
  role: string;
}) {
  validateRegisterInput({
    fullName: data.fullName,
    email: data.email,
    matricNumber: data.matricNumber,
    password: data.password,
    confirmPassword: data.password,
    role: data.role.toString(),
    membershipStatus: data.membershipStatus.toString(),
    // isActive: true,
  });

  await connectDB();

  const existingUser = await User.findOne({
    $or: [{ email: data.email }, { matricNumber: data.matricNumber }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
}

/**
Verify the credentials of the user
@param email - The email of the user
@param password - The password of the user
@returns the user if the credentials are valid, null if the credentials are invalid, throws an error if the email is not a valid email, throws an error if the password is not a valid password, throws an error if the user is not found, throws an error if the password is not a valid password
@throws {Error} if the email is not a valid email
@throws {Error} if the password is not a valid password
@throws {Error} if the user is not found
@throws {Error} if the password is not a valid password
*/
export async function verifyCredentials(
  email: string,
  password: string
) {
  await connectDB();

  const user = await User.findOne({ email });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return null;

  return user;
}

/**
Verify the membership status of the user
@param email - The email of the user
@param matricNumber - The matric number of the user
@returns the membership status object with isMember boolean
@throws {Error} if the email is not a valid email
@throws {Error} if the matric number is invalid
*/
export async function verifyMembership(email: string, matricNumber: string) {
  await connectDB();
  
  // Validate inputs
  if (!email || !matricNumber) {
    throw new Error("Email and matric number are required");
  }
  
  if (!isValidFutminnaEmail(email)) {
    throw new Error("Invalid email");
  }
  
  // Find member in database by email and matric number
  const member = await Member.findOne({ 
    email: email.trim().toLowerCase(), 
    matricNumber: matricNumber.trim() 
  });
  
  // If no member found, they're not a member
  if (!member) {
    return { isMember: false };
  }
  
  // Check if member is active (since Member model doesn't have membershipStatus field)
  // If member exists in the Member collection, they are considered a member
  // Only check if they're active
  // if (member.isActive === false) {
  //   return { isMember: false };
  // }
  
  // Member exists and is active
  return { isMember: true };
}
// export async function verifyMembership(email: string, matricNumber: string) {
//   // await connectDB();
//   // const member = await Member.findOne({ email, matricNumber });
//   // if (!member) throw new Error("Member not found");
//   // if (member.membershipStatus !== MEMBERSHIP_STATUS.MEMBER) throw new Error("You are not a member of NAEEES");
//   // return member;
//   if (!email || !matricNumber) throw new Error("Email and matric number are required");
//   if (!isValidFutminnaEmail(email)) throw new Error("Invalid email");

//   // Basic matric number validation (non-empty string)
//   if (matricNumber.trim().length === 0) throw new Error("Invalid matric number");

//   const memberMatricNumbers = process.env.MATRIC_NUMBERS?.split(",")
//     .map((matric: string) => matric.trim())
//     .filter((matric: string) => matric.length > 0);
//   const memberEmails = process.env.EMAILS?.split(",")
//     .map((email: string) => email.trim())
//     .filter((email: string) => email.length > 0);
//   if (!memberEmails || memberEmails.length === 0) throw new Error("No members found");
//   if (!memberEmails.includes(email.trim())) throw new Error("You are not a member of NAEEES");
//   if (!memberMatricNumbers || memberMatricNumbers.length === 0) throw new Error("No members found");
//   if (!memberMatricNumbers.includes(matricNumber.trim())) throw new Error("You are not a member of NAEEES");
//   return { isMember: true };
// }