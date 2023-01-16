import { React } from "react";
import PostList from "../components/post/PostList";

function Home() {
  return (
    <div className="flex flex-col px-40 w-full h-full space-y-4">
      <PostList />
    </div>
  );
}

export default Home;
