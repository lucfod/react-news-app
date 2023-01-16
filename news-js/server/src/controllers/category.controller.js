import { Category } from "../database/models/category";

export const CategoryController = {
  getAll: async (p_req, p_res) => {
    try {
      console.log("CategoryController: getAll");

      const categories = await Category.find();

      return p_res.json({ categories: categories });
    } catch (error) {
      return p_res.status(400).json({ message: error });
    }
  },
};
