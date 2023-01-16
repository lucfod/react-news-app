import bcrypt from "bcryptjs";

export const Crypt = {
  encrypt: async (p_password) => {
    const _salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(p_password, _salt);
  },
  compare: async (p_password, p_hash) => {
    return await bcrypt.compare(p_password, p_hash);
  },
};
