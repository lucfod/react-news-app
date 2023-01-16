import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import PostList from "../../components/post/PostList";

function ProfileDetail() {
  const { id } = useParams();

  const { state, action } = useStore();
  const { authData } = state.auth;
  const { user } = state.user;
  const { setOnLogin } = action.auth;
  const { getUser } = action.user;
  const { setOnPost } = action.post;

  useEffect(() => {
    if (authData && authData.token) {
      getUser(id, authData);
    } else {
      setOnLogin(true);
    }
  }, [authData, id]);

  const handleOnclick = () => {
    setOnPost(true);
  };

  return (
    <>
      {user && Object.keys(user).length !== 0 && (
        <div className="flex flex-col px-40 w-full h-full space-y-6">
          <div className="px-4 space-y-2">
            <h2 className="font-bold underline px-1 text-mkt-900">
              My Profile
            </h2>
            <div className="border-2 rounded-md shadow-md w-full bg-white">
              <div className="px-4 py-1 text-gray-500">
                <span className="font-bold">Name: </span>
                <span>{user.firstName + " " + user.lastName}</span>
              </div>
              <div className="px-4 py-1 text-gray-500">
                <span className="font-bold">Email: </span>
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          <div className="px-4 space-y-2">
            <h2 className="font-bold underline px-1 text-mkt-900">My Posts</h2>
            <div>
              <button
                onClick={handleOnclick}
                className="bg-white text-mkt-500 py-1 px-4 rounded-md border border-mkt-500 hover:bg-mkt-500 hover:text-white"
              >
                <h1 className="text-sm font-bold">Add Post</h1>
              </button>
            </div>
            <div className="space-y-4">
              <PostList user={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileDetail;
