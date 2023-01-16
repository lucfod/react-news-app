/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useStore } from "../../contexts/StoreContext";
import PostCard from "./PostCard";

function PostList({ user }) {
  const { state, action } = useStore();
  const { posts, search } = state.post;
  const { getPosts } = action.post;

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts && posts.length != 0 ? (
        posts
          .filter(
            (p) =>
              ((user && p.user.id == user.id) || !user) &&
              (p.content.indexOf(search) != -1 ||
                p.tags.some((e) => e.tag.indexOf(search) != -1) ||
                search == "")
          )
          .map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="border-2 text-center rounded-md shadow-md w-full bg-white">
          <div className="m-5 px-4 py-1 text-red-500">No Posts</div>
        </div>
      )}
    </div>
  );
}

export default PostList;
