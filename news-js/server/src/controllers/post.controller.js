import { Post } from "../database/models/post";
import { Tag } from "../database/models/tag";
import { Link } from "../database/models/link";

export const PostController = {
  getAll: async (p_req, p_res) => {
    try {
      console.log("PostController: getAll");

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
      });

      return p_res.json({ posts: _posts });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },
  get: async (p_req, p_res) => {
    try {
      console.log("PostController: get");

      const { id } = p_req.params;

      const _post = await Post.find({
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
        where: { id: id },
      });

      if (!_post) throw new Error("Post not exists");

      return p_res.json({ post: _post[0] });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },
  create: async (p_req, p_res) => {
    try {
      console.log("PostController: create");

      const { content, category, region, tags, links, user } = p_req.body;

      let newPost = new Post();
      newPost.content = content;
      newPost.category = category;
      if (region) newPost.region = region;
      newPost.user = user;

      await newPost.save();

      if (tags.length != 0) {
        tags.map(async (tag) => {
          const newTag = new Tag();
          newTag.tag = tag;
          newTag.post = newPost.id;

          await newTag.save();
        });
      }

      if (links.length != 0) {
        links.map(async (link) => {
          const newLink = new Link();
          newLink.name = link.name;
          newLink.url = link.url;
          newLink.post = newPost.id;

          await newLink.save();
        });
      }

      return p_res.json({ post: newPost, message: "Post created" });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },
  update: async (p_req, p_res) => {
    try {
      console.log("PostController: update");

      const { id } = p_req.params;

      const updatePost = await Post.findOneBy({ id: id });
      if (!updatePost) throw new Error("Post not exists");

      const { content, category, region, tags, links, user } = p_req.body;

      const existsTags = await Tag.findBy({ post: updatePost.id });

      if (tags.length != 0) {
        tags.map(async (t) => {
          const foundTag = await Tag.findOneBy({ tag: t });
          if (!foundTag) {
            const newTag = new Tag();
            newTag.tag = t;
            newTag.post = updatePost.id;

            await newTag.save();
          }
        });

        if (existsTags) {
          const deletedTags = existsTags.filter((e) => !tags.includes(e.tag));
          if (deletedTags) deletedTags.map(async (t) => await t.remove());
        }
      } else if (existsTags) {
        existsTags.map(async (t) => await t.remove());
      }

      const existsLinks = await Link.findBy({ post: updatePost.id });

      if (links.length != 0) {
        links.map(async (l) => {
          const foundLink = await Link.findOneBy({ name: l.name });
          if (!foundLink) {
            const newLink = new Link();
            newLink.name = l.name;
            newLink.url = l.url;
            newLink.post = updatePost.id;

            await newLink.save();
          }
        });

        if (existsLinks) {
          const deletedLinks = existsLinks.filter(
            (e) => !links.map((l) => l.name).includes(e.name)
          );
          if (deletedLinks) deletedLinks.map(async (l) => await l.remove());
        }
      } else if (existsLinks) {
        if (existsLinks) existsLinks.map(async (l) => await l.remove());
      }

      updatePost.content = content;
      updatePost.category = category;
      updatePost.region = region;
      updatePost.user = user;

      await updatePost.save();

      return p_res.json({ post: updatePost, message: "Post updated" });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },
  delete: async (p_req, p_res) => {
    try {
      console.log("PostController: delete");

      const { id } = p_req.params;

      const deletePost = await Post.findOneBy({ id: id });
      if (!deletePost) throw new Error("Post not exists");

      const tags = await Tag.findBy({ post: deletePost.id });
      if (tags) {
        tags.map(async (t) => await t.remove());
      }

      const links = await Link.findBy({ post: deletePost.id });
      if (links) {
        links.map(async (l) => await l.remove());
      }

      await deletePost.remove();

      return p_res.json({ message: "Deleted Post" });
    } catch (error) {
      return p_res.status(400).json({ error: error.message });
    }
  },
};
