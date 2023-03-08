import formatDistance from "date-fns/formatDistance";
import Link from "next/link";
import he from "he";
import { useState } from "react";

export default function Comment({
  currentUser,
  user,
  comment,
  setComments,
  postComments,
}) {
  const [edit, setEdit] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);

  async function deleteComment() {
    const token = localStorage.getItem("token");

    const data = await fetch(
      `https://odinbook-backend-zoih.onrender.com/api/post/${comment.post}/comment/${comment._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    if (data.success == true) {
      setComments(postComments.filter((item) => item._id != comment._id));
    }
  }

  async function editComment(e) {
    if (e.key == "Enter") {
      if (commentContent.length != 0) {
        const token = localStorage.getItem("token");

        const data = await fetch(
          `https://odinbook-backend-zoih.onrender.com/api/post/${comment.post}/comment/${comment._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content: commentContent }),
          }
        ).then((res) => res.json());

        if (data.success == true) {
          setEdit(false);
        }
      }
    }
  }

  function handleEdit() {
    if (edit == true) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }

  return (
    <div className="flex gap-2">
      <Link href={`/profile/${user.url_handle}`}>
        <img
          src={`${user.profile_picture_url}`}
          className="w-10 h-10 rounded-full"
          alt=""
        />
      </Link>
      <div>
        <div className="flex flex-col bg-stone-700 px-3 py-1 rounded-2xl">
          <Link href={`/profile/${user.url_handle}`}>
            <p className="text-xs font-bold">{user.username}</p>
          </Link>
          {edit == true ? (
            <input
              type="text"
              className="bg-inherit border border-stone-500 rounded-md px-1 my-1"
              value={he.decode(commentContent)}
              onChange={(e) => setCommentContent(e.target.value)}
              onKeyDown={editComment}
            ></input>
          ) : (
            <p className="text-sm">{he.decode(commentContent)}</p>
          )}
        </div>
        <div className="flex gap-3">
          {user._id != currentUser.id ? (
            <></>
          ) : (
            <>
              <p onClick={handleEdit} className="text-xs cursor-pointer">
                Edit
              </p>
              <p onClick={deleteComment} className="text-xs cursor-pointer">
                Delete
              </p>
            </>
          )}
          <p className="text-xs">
            {formatDistance(new Date(comment.commented_on), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
