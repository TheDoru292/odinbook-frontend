import format from "date-fns/format";
import { useState } from "react";
import Link from "next/link";
import Comment from "./Comment";
import he from "he";

export default function Post({
  user,
  postUser,
  postData,
  likes,
  liked,
  comments,
  setPosts,
}) {
  const [likedPost, setLikedPost] = useState(liked == true ? true : false);
  const [likesPost, setLikesPost] = useState(likes.count);
  const [postComments, setPostComments] = useState(comments);
  const [commentContent, setCommentContent] = useState("");
  const [options, setOptions] = useState(false);
  const [edit, setEdit] = useState(false);
  const [postContent, setPostContent] = useState(postData.content);

  async function like() {
    const token = localStorage.getItem("token");

    const data = await fetch(
      `http://localhost:3000/api/post/${postData._id}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    if (!data.like) {
      setLikedPost(false);
      setLikesPost(likesPost - 1);
    } else {
      setLikedPost(true);
      setLikesPost(likesPost + 1);
    }
  }

  function handleChangeComment(e) {
    setCommentContent(e.target.value);
  }

  async function comment(e) {
    if (e.code == "Enter") {
      const token = localStorage.getItem("token");

      const data = await fetch(
        `http://localhost:3000/api/post/${postData._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: commentContent }),
        }
      ).then((res) => res.json());

      console.log(user);

      const comment = {
        user: {
          profile_picture_url: user.profilePicture,
          username: user.username,
          url_handle: user.userhandle,
        },
        content: data.comment.content,
        commented_on: data.comment.commented_on,
      };

      if (data.success == true) {
        setCommentContent("");
        setPostComments([...postComments, comment]);
      }
    }
  }

  async function deletePost() {
    const token = localStorage.getItem("token");

    const data = await fetch(`http://localhost:3000/api/post/${postData._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    console.log(data);

    if (data.success == true) {
      setPosts((current) => current.filter((item) => item._id != postData._id));
    }
  }

  async function editPost() {
    const token = localStorage.getItem("token");

    const data = await fetch(`http://localhost:3000/api/post/${postData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: postContent }),
    }).then((res) => res.json());

    console.log(data);

    if (data.success == true) {
      setEdit(false);
    }
  }

  return (
    <div className="flex gap-2 flex-col rounded-xl bg-stone-800 px-4 py-3">
      <div className="flex gap-2 w-full">
        <Link href={`/profile/${postUser.url_handle}`}>
          <img
            src={`${postUser?.profile_picture_url}`}
            className="w-10 h-10 rounded-full"
            alt=""
          />
        </Link>
        <div className="relative flex w-full">
          {options == true ? (
            <div className="bg-stone-900 rounded-md p-2 mt-5 w-32 flex flex-col absolute right-0">
              <button
                onClick={() => {
                  setEdit(true);
                  setOptions(false);
                }}
                className="text-start rounded-md hover:bg-stone-800 p-1 px-2"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deletePost();
                  setOptions(false);
                }}
                className="text-start rounded-md hover:bg-stone-800 p-1 px-2"
              >
                Delete
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="flex-grow">
            <Link href={`/profile/${postUser.url_handle}`}>
              <p className="text-sm">{postUser.username}</p>
            </Link>
            <p className="text-sm text-stone-300">
              {format(new Date(postData.posted_on), "dd MMMM yyyy")}
            </p>
          </div>
          <div>
            {user?.id != postUser._id ? (
              <></>
            ) : (
              <button
                onClick={() => {
                  if (options == true) {
                    setOptions(false);
                  } else {
                    setOptions(true);
                  }
                }}
              >
                <img
                  className="w-6 h-6"
                  src="/dots-horizontal.svg"
                  alt="more"
                />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {edit == true ? (
          <>
            <textarea
              style={{ outline: "none" }}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full bg-inherit resize-none border border-stone-700 rounded-md p-2"
            ></textarea>
            <div className="flex w-full justify-center gap-4">
              <button
                disabled={postContent.length == 0 ? true : false}
                onClick={editPost}
                className="self-center disabled:bg-stone-600 bg-sky-600 hover:bg-sky-700 p-2 rounded-md"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEdit(false)}
                className="bg-stone-600 hover:bg-stone-700 p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <pre
            style={{
              fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
            }}
          >
            {he.decode(postContent)}
          </pre>
        )}
      </div>
      <div className="flex">
        {likesPost != 0 ? (
          <div className="flex flex-grow items-center gap-1">
            <img src="/thumb-up-blue.svg" className="w-5 h-5" alt="" />
            <p>{likesPost} likes</p>
          </div>
        ) : (
          <div></div>
        )}
        {comments.length != 0 ? (
          <div>{postComments.length} comments</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex border-y py-1 border-stone-700">
        <button
          onClick={like}
          className="flex justify-center gap-2 hover:bg-stone-600 py-1 rounded-md flex-basis flex-grow"
        >
          <img
            src={likedPost == true ? "/thumb-up-blue.svg" : "/thumb-up.svg"}
            className="w-6 h-6"
            alt=""
          />
          <p>Like</p>
        </button>
        <button className="flex justify-center gap-2 hover:bg-stone-600 py-1 rounded-md flex-basis flex-grow">
          <img src="/comment.svg" className="w-6 h-6" alt="" />
          <p>Comment</p>
        </button>
        <button className="flex justify-center gap-2 hover:bg-stone-600 py-1 rounded-md flex-basis flex-grow">
          <img src="/share.svg" className="w-6 h-6" alt="" />
          <p>Share</p>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {postComments.map((item) => {
          return (
            <Comment
              currentUser={user}
              user={item.user}
              comment={item}
              setComments={setPostComments}
              postComments={postComments}
            />
          );
        })}
        <div className="flex gap-2">
          <img
            src={`${user?.profilePicture}`}
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <input
            className="w-full bg-stone-700 px-3 rounded-2xl"
            type="text"
            placeholder="Write a comment..."
            onChange={handleChangeComment}
            value={commentContent}
            onKeyDown={(e) => comment(e)}
          />
        </div>
      </div>
    </div>
  );
}
