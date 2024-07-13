import bcrypt from "bcryptjs";

/**
 *  비밀번호를 해싱합니다.
 *
 *  @param {string} tempPassword
 *  */
export const getHashedPassword = async (tempPassword: string) => {
  return await bcrypt.hash(tempPassword, 10);
};