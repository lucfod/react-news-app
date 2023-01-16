import { Region } from "../database/models/region";

export const RegionController = {
  getAll: async (p_req, p_res) => {
    try {
      console.log("RegionController: getAll");

      const _regions = await Region.find();

      return p_res.json({ regions: _regions });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },
};
