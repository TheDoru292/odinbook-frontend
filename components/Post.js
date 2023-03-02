import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import { useState } from "react";
import Link from "next/link";

export default function Post({
  user,
  postUser,
  postData,
  likes,
  liked,
  comments,
}) {
  const [likedPost, setLikedPost] = useState(liked == true ? true : false);
  const [likesPost, setLikesPost] = useState(likes.count);
  const [postComments, setPostComments] = useState(comments);
  const [commentContent, setCommentContent] = useState("");

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

      if (data.success == true) {
        setCommentContent("");
      }
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
        <div className="flex w-full">
          <div className="flex-grow">
            <Link href={`/profile/${postUser.url_handle}`}>
              <p className="text-sm">{postUser.username}</p>
            </Link>
            <p className="text-sm text-stone-300">
              {format(new Date(postData.posted_on), "dd MMMM yyyy")}
            </p>
          </div>
          <div>
            <button>more</button>
          </div>
        </div>
      </div>
      <div>
        <p>{postData.content}</p>
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
            <div key={item._id} className="flex gap-2">
              <Link href={`/profile/${item.user.url_handle}`}>
                <img
                  src={`${item.user.profile_picture_url}`}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
              </Link>
              <div>
                <div className="flex flex-col bg-stone-700 px-3 py-1 rounded-2xl">
                  <Link href={`/profile/${item.user.url_handle}`}>
                    <p className="text-xs font-bold">{item.user.username}</p>
                  </Link>
                  <p className="text-sm">{item.content}</p>
                </div>
                <div className="flex gap-3">
                  <p className="text-xs">Like</p>
                  <p className="text-xs">Reply</p>
                  <p className="text-xs">
                    {formatDistance(new Date(item.commented_on), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
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
