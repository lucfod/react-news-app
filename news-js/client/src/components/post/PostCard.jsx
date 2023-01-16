/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";

function PostCard({ post }) {
  const formatDate = (date) => {
    const newDate = new Date(date);
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const day =
      newDate.getDate() == today.getDate()
        ? "Hoy"
        : newDate.getDate() == tomorrow.getDate() + 1
        ? "Mañana"
        : newDate.getDate() == yesterday.getDate() - 1
        ? "Ayer"
        : newDate.getDate() + "-" + newDate.getMonth() + 1;
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();

    return day + ", " + hours + ":" + minutes;
  };

  return (
    <div className="border-2 rounded-md shadow-md w-full bg-white">
      <div className="px-4 py-2 border-b-2 text-gray-500 font-bold">
        <div className="flex">
          <span className="flex justify-start items-center w-full">
            {post.category.name}
          </span>
          <span className="flex justify-end items-center w-full">
            {post.region && post.region.name}
          </span>
        </div>
      </div>
      <NavLink to={`/posts/${post.id}`}>
        <div className="px-4 py-6 text-gray-500 ">{post.content}</div>
      </NavLink>
      <div className="p-4 py-2 border-t-2 text-gray-500 font-bold">
        <div className="flex">
          <span className="flex justify-start items-center w-full">
            {formatDate(post.createAt)}
          </span>
          <span className="flex justify-end items-center w-full">
            {post.links &&
              post.links.length !== 0 &&
              post.links.length != undefined && (
                <span>
                  Leer más en
                  {post.links.map((link, i) => (
                    <span key={i}>
                      {i > 0 ? " y " : " "}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {link.name}
                      </a>
                    </span>
                  ))}
                </span>
              )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
