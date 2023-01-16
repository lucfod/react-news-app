import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";

const Post = () => {
  const { id } = useParams();

  const { state, action } = useStore();
  const { authData } = state.auth;
  const { post } = state.post;
  const { setOnLogin } = action.auth;
  const { getPost, deletePost, setIsEdit, setOnPost } = action.post;

  const navigate = useNavigate();

  useEffect(() => {
    if (authData && authData.token) {
      getPost(id, authData);
    } else {
      setOnLogin(true);
    }
  }, [authData]);

  const handleEdit = () => {
    setIsEdit(true);
    setOnPost(true);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure want to delete this post?")) {
      deletePost(post.id, authData);
      navigate(-1);
    }
  };

  return (
    <>
      {authData && post && Object.keys(post).length != 0 && (
        <div className="mx-auto w-1/2 border-2 rounded-md shadow-md space-y-4 bg-white p-6">
          <div className="space-y-2 rounded-md">
            <span>Text:</span>
            <span
              id="content"
              name="content"
              disabled
              className="relative block w-full h-1/5 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              {post.content}
            </span>
          </div>

          <div className="space-y-2 rounded-md">
            <span>Category:</span>
            <span
              id="category"
              name="category"
              disabled
              className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              {post.category.name}
            </span>
          </div>

          <div className="space-y-2 rounded-md">
            <span>Region:</span>
            {post.region && (
              <span
                id="region"
                name="region"
                disabled
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {post.region.name}
              </span>
            )}
          </div>

          <div className="space-y-2 rounded-md">
            <span>Tags:</span>

            {post.tags.length !== 0 &&
              post.tags.length != undefined &&
              post.tags.map((t, i) => (
                <div
                  className="inline-block bg-green-100 text-sm rounded-full ml-2 py-1 px-2"
                  key={i}
                >
                  {t.tag}
                </div>
              ))}
          </div>

          <div className="space-y-2 rounded-md">
            <span>References:</span>

            <div className="pt-2 space-x-2 text-sm">
              {post.links.length !== 0 && post.links.length != undefined && (
                <table className="border">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr className="border-b">
                      <th className="px-6 py-2">References</th>
                    </tr>
                  </thead>
                  <tbody>
                    {post.links.map((link, i) => (
                      <tr className="bg-white border-b" key={i}>
                        <td className="px-6">
                          {link.name} ({link.url})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {post.user.id == authData.user.id && (
            <div className="flex justify-end space-x-2">
              <div>
                <button
                  onClick={handleEdit}
                  className="group relative flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Edit
                </button>
              </div>
              <div>
                <button
                  onClick={handleDelete}
                  className="group relative flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
