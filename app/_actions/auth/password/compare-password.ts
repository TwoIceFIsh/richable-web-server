import bcrypt from "bcryptjs";

/**
 *  비밀번호를 비교합니다.
 *
 *  @param {string} tempPassword
 *  @param {string} hashedPassword
 * */
export const comparePassword = async (
  tempPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(tempPassword, hashedPassword);
};