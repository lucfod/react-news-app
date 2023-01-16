import React, { useState, useEffect } from "react";
import { useStore } from "../../contexts/StoreContext";
import validatePost from "../../utils/validatePost";

function PostForm() {
  const [postData, setPostData] = useState({
    content: "",
    category: "",
    region: "",
    tags: [],
    links: [],
  });

  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [error, setError] = useState({});

  const { state, action } = useStore();
  const { authData } = state.auth;
  const { post, isEdit } = state.post;
  const { categories } = state.category;
  const { regions } = state.region;
  const { getCategories } = action.category;
  const { getRegions } = action.region;
  const { createPost, updatePost, setOnPost, setIsEdit } = action.post;

  useEffect(() => {
    getCategories(authData);
    getRegions(authData);
  }, []);

  useEffect(() => {
    if (isEdit) {
      setPostData({
        content: post.content,
        category: post.category.id,
        region: post.region ? post.region.id : "",
        tags: post.tags.map((t) => t.tag),
        links: post.links,
      });
    }
  }, [isEdit]);

  const handleClose = (e) => {
    e.preventDefault();
    setIsEdit(false);
    setOnPost(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "linkName") {
      setLinkName(value);
    } else if (name == "linkUrl") {
      setLinkUrl(value);
    } else {
      setPostData({ ...postData, [name]: value });
      setError(validatePost(name, value));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const { value } = e.target;

    if (!value.trim()) return;

    setPostData({ ...postData, tags: [...postData.tags, value] });

    e.target.value = "";
  };

  const handleAddLink = (e) => {
    e.preventDefault();

    let error = validatePost("linkName", linkName);
    if (error.linkName) return setError(error);

    error = validatePost("linkUrl", linkUrl);
    if (error.linkUrl) return setError(error);

    setPostData({
      ...postData,
      links: [...postData.links, { name: linkName, url: linkUrl }],
    });

    setError({});
    setLinkName("");
    setLinkUrl("");
  };

  const handleRemoveTag = (e, index) => {
    e.preventDefault();
    setPostData({
      ...postData,
      tags: postData.tags.filter((el, i) => i !== index),
    });
  };

  const handleRemoveLink = (e, index) => {
    e.preventDefault();
    setPostData({
      ...postData,
      links: postData.links.filter((el, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      postData["id"] = post.id;
      postData["user"] = post.user.id;
      updatePost(postData, authData);
    } else {
      postData["user"] = authData.user.id;
      createPost(postData, authData);
    }
    setIsEdit(false);
    setOnPost(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end bg-gray-800 bg-opacity-50 sm:items-center sm:justify-center">
      <div className="flex h-full w-full items-center justify-center p-8 overflow-auto">
        <form
          className="w-full max-w-xl m-auto rounded-md shadow-md shadow-gray-500"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="relative bg-mkt-500 rounded-t-md">
            <button
              type="button"
              className="absolute right-0 m-2 rounded-full border-2 border-white hover:bg-white"
              onClick={handleClose}
            >
              <span className="w-6 h-6 p-2 text-white hover:text-mkt-500">
                X
              </span>
            </button>
            <h2 className="p-6 text-center text-3xl font-bold tracking-tight text-white">
              {isEdit ? "Edit Post" : "Create Post"}
            </h2>
          </div>
          <div className="bg-white py-6 px-4 space-y-4 rounded-b-md">
            <div className="-space-y-px rounded-md">
              <div>
                <span>Text:</span>
                <textarea
                  id="content"
                  name="content"
                  value={postData.content}
                  onChange={handleChange}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {error.content && (
                  <span className="text-red-500 text-sm">{error.content}</span>
                )}
              </div>
            </div>

            <div className="-space-y-px rounded-md">
              <div className="relative">
                <span>Category:</span>
                <select
                  id="category"
                  name="category"
                  onChange={handleChange}
                  value={postData.category}
                  required
                  className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value=""></option>
                  {categories.length === 0 || categories.length == undefined
                    ? ""
                    : categories.map((cat) => (
                        <option value={cat.id} key={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                </select>
                {error.category && (
                  <span className="text-red-500 text-sm">{error.category}</span>
                )}
              </div>
            </div>

            <div className="-space-y-px rounded-md">
              <div className="relative">
                <span>Region:</span>
                <select
                  id="region"
                  name="region"
                  value={postData.region}
                  onChange={handleChange}
                  className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value=""></option>
                  {regions.length === 0 || regions.length == undefined
                    ? ""
                    : regions.map((reg) => (
                        <option value={reg.id} key={reg.id}>
                          {reg.name}
                        </option>
                      ))}
                </select>
              </div>
            </div>

            <div className="-space-y-px rounded-md">
              <div className="relative">
                <span>Tags:</span>
                <input
                  id="tag"
                  name="tag"
                  onKeyDown={handleKeyDown}
                  className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="pt-2 space-x-2 text-sm">
                {postData.tags.length !== 0 &&
                  postData.tags.length != undefined &&
                  postData.tags.map((tag, i) => (
                    <div
                      className="inline-block bg-green-100 rounded-full py-1 px-2"
                      key={i}
                    >
                      {tag}
                      <button
                        type="button"
                        className="inline-flex justify-center items-center ml-2 h-4 w-4 px-2 pb-1 cursor-pointer bg-gray-500 rounded-full text-white"
                        onClick={(e) => handleRemoveTag(e, i)}
                      >
                        x
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="-space-y-px rounded-md">
              <div className="relative">
                <span>References:</span>
                <div className="pt-2">
                  <span className="px-2">Name:</span>
                  <input
                    id="linkName"
                    name="linkName"
                    value={linkName}
                    onChange={handleChange}
                    className="inline-block rounded-md border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <span className="px-2">Url:</span>
                  <input
                    id="linkUrl"
                    name="linkUrl"
                    value={linkUrl}
                    onChange={handleChange}
                    className="inline-block rounded-md border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    className="inline-flex justify-center items-center ml-2 px-2 cursor-pointer text-blue-600 hover:underline"
                    onClick={handleAddLink}
                  >
                    Add +
                  </button>
                  {error.linkName && (
                    <span className="text-red-500 text-sm">
                      {error.linkName}
                    </span>
                  )}
                  {error.linkUrl && (
                    <span className="text-red-500 text-sm">
                      {error.linkUrl}
                    </span>
                  )}
                </div>
              </div>
              <div className="pt-2 space-x-2 text-sm">
                {postData.links.length !== 0 &&
                  postData.links.length != undefined && (
                    <table className="mx-auto border">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className="border-b">
                          <th className="px-6 py-2">References</th>
                          <th className="px-6 py-2">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {postData.links.map((link, i) => (
                          <tr className="bg-white border-b" key={i}>
                            <td className="px-6">
                              {link.name} ({link.url})
                            </td>
                            <td className="px-6 text-center">
                              <button
                                type="button"
                                className="inline-flex justify-center items-center text-lg cursor-pointer text-red-500 hover:underline hover:font-bold"
                                onClick={(e) => handleRemoveLink(e, i)}
                              >
                                x
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={postData.content && postData.category ? false : true}
                className={
                  "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white " +
                  (postData.content && postData.category
                    ? " cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    : " cursor-not-allowed bg-indigo-200")
                }
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
