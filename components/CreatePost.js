import Router from "next/router";
import { useState } from "react";

export default function CreatePost({ closePost, username, profilePic }) {
  const [postContent, setPostContent] = useState("");

  async function post() {
    const token = localStorage.getItem("token");

    const data = await fetch(
      "https://odinbook-backend-zoih.onrender.com/api/post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: postContent }),
      }
    ).then((res) => res.json());

    if (data.success == true) {
      Router.reload();
    }
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50">
      <div
        style={{
          boxShadow: "0 0 0 50vmax rgba(0,0,0,0.7)",
          transform: "translate(-50%, -50%)",
        }}
        className="w-[300px] md:w-[420px] border border-stone-700 rounded-md absolute z-20 left-1/2 top-1/2 flex flex flex-col gap-3 bg-stone-800 text-white"
      >
        <div className="px-3 pt-3 flex w-full justify-center">
          <h2 className="text-lg font-bold">Create Post</h2>
          <div
            className="mt-0.5 absolute justify-center w-7 h-7 right-0 hover:bg-stone-700 bg-stone-600 flex mr-4 align-self rounded-full cursor-pointer"
            onClick={() => closePost(true)}
          >
            <p className="align-center">X</p>
          </div>
        </div>
        <div className="py-2 px-3 border-t border-stone-700 flex flex-col gap-3">
          <div className="flex gap-2">
            <img
              src={`${profilePic}`}
              className="w-9 h-9 rounded-full"
              alt=""
            />
            <p className="self-center font-bold">{username}</p>
          </div>
          <textarea
            style={{ outline: "none" }}
            className="bg-inherit resize-none"
            name=""
            id=""
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows="3"
            placeholder="What's on your mind, User?"
          ></textarea>
          <button
            disabled={postContent.length == 0 ? true : false}
            onClick={() => post()}
            className="bg-sky-600 py-2 rounded-md disabled:bg-stone-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
