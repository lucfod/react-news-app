import { User } from "../database/models/user";
import { Post } from "../database/models/post";

export const UserController = {
  get: async (p_req, p_res) => {
    try {
      console.log("UserController: get");

      const { id } = p_req.params;

      const _user = await User.find({
        select: {
          password: false,
        },
        where: { id: id },
      });

      if (!_user) throw "User not exists";

      return p_res.json({ user: _user[0] });
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },

  getPostsUser: async (p_req, p_res) => {
    try {
      console.log("UserController: getPostsUser");

      const { id } = p_req.params;

      const _posts = await Post.find({
        select: {
          category: { id: true, name: true },
          region: { id: true, name: true },
          user: { id: true, firstName: true, lastName: true },
          tags: { tag: true },
          links: { name: true, url: true },
        },
        relations: {
          category: true,
          region: true,
          user: true,
          tags: true,
          links: true,
        },
        where: { user: { id: id } },
      });

      if (!_posts) throw new Error("User has no posts");

      return p_res.json({ posts: _posts });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },
};
