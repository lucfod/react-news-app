import { Crypt } from "../lib/crypt.lib";
import { Token } from "../lib/token.lib";
import { User } from "../database/models/user";

export const AuthController = {
  register: async (p_req, p_res) => {
    try {
      console.log("AuthController: register");

      const { firstName, lastName, email, password } = p_req.body;

      const _user = await User.findOneBy({ email: email });
      if (_user) throw new Error("User already exists");

      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = await Crypt.encrypt(password);

      await newUser.save();

      return p_res.json({
        message: "User saved succesfully",
      });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },

  signIn: async (p_req, p_res) => {
    try {
      console.log("AuthController: signIn");

      const { email, password } = p_req.body;

      const user = await User.findOneBy({ email: email });
      if (!user) throw new Error("Username is incorrect");

      const matchPassword = await Crypt.compare(password, user.password);

      if (!matchPassword) throw new Error("Password is incorrect");

      const token = await Token.createAccess({ id: user.id });
      const refresh_token = await Token.createRefresh({ id: user.id });

      p_res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh-token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      return p_res.json({
        user: { id: user.id },
        token: token,
      });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },

  signOut: async (p_req, p_res) => {
    try {
      console.log("AuthController: signOut");

      p_res.clearCookie("refreshtoken", { path: "/api/refresh-token" });

      return p_res.json({ message: "Logged out!" });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },

  generateAccessToken: async (p_req, p_res) => {
    try {
      console.log("AuthController: generateAccessToken");

      const rf_token = p_req.cookies.refreshtoken;

      if (!rf_token) throw new Error("Please login");

      const result = Token.verify(rf_token);

      const user = await User.findOneBy({ id: result.id });

      if (!user) throw new Error("This does not exist.");

      const access_token = createAccessToken({ id: result.id });

      return p_res.json({ user: { ...user.id }, token: access_token });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },
};
