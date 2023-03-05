import Link from "next/link";
import { useEffect, useState } from "react";
import _ from "lodash";
import {
  removeFriend,
  acceptFriendReq,
  denyFriendReq,
  sendFriendReq,
  removeOutgoingFriendReq,
} from "@/lib/friend";

export default function ProfileData({
  currentPage,
  loggedUser,
  user,
  friends,
  openDetailsModel,
}) {
  const [areFriends, setAreFriends] = useState(false);
  const [friendReq, setFriendReq] = useState({});

  useEffect(() => {
    async function getFetchData() {
      const token = localStorage.getItem("token");

      const data = await fetch(
        `https://odinbook-backend-iccv.onrender.com/api/user/check/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());

      setFriendReq(data);
    }

    const value = friends.some((item) => {
      return _.isEqual(item.second_user, {
        _id: loggedUser?._id,
        username: loggedUser?.username,
        url_handle: loggedUser?.url_handle,
        profile_picture_url: loggedUser?.profile_picture_url,
      });
    });

    setAreFriends(value);
    getFetchData();
  }, [loggedUser]);

  async function removeFriendFunc() {
    const data = await removeFriend(user._id);

    console.log(data);

    if (data.success == true) {
      setAreFriends(false);
    }
  }

  async function acceptFriendReqFunc(reqId) {
    const data = await acceptFriendReq(reqId);

    if (data.success == true) {
      setFriendReq({});
      setAreFriends(true);
    }
  }

  async function denyFriendReqFunc(reqId) {
    const data = await denyFriendReq(reqId);

    if (data.success == true) {
      setFriendReq({});
      setAreFriends(false);
    }
  }

  async function sendFriendReqFunc() {
    const data = await sendFriendReq(user._id);

    if (data.success == true) {
      setFriendReq({ sentFriendReq: data.friendReq });
    }
  }

  async function removeOutgoingFriendReqFunc() {
    const data = await removeOutgoingFriendReq(friendReq.sentFriendReq._id);

    if (data.success == true) {
      setFriendReq({});
      setAreFriends(false);
    }
  }

  const postsStyling =
    currentPage == "posts"
      ? "border-b border-sky-400 rounded-t-md text-sky-400 px-2 py-3"
      : "hover:bg-stone-600 rounded-md px-2 py-3";

  const friendsStyling =
    currentPage == "friends"
      ? "border-b border-sky-400 rounded-t-md text-sky-400 px-2 py-3"
      : "hover:bg-stone-600 rounded-md px-2 py-3";

  return (
    <div className="flex flex-col gap-4 px-2 xl:px-64 pt-4 bg-stone-800">
      <div className="flex gap-4">
        <img
          src={`${user?.profile_picture_url}`}
          className="w-16 h-16 rounded-full"
          alt=""
        />
        <div className="flex flex-col flex-grow">
          <h2 className="text-xl font-bold">{user?.username}</h2>
          <p className="text-stone-400 font-bold">{friends.length} friends</p>
        </div>
        <div className="self-center">
          {_.isEqual(user, loggedUser) ? (
            <button
              onClick={() => {
                openDetailsModel(false, true);
              }}
              className="p-2 bg-sky-600 hover:bg-sky-700 rounded-md"
            >
              Change Details
            </button>
          ) : areFriends == true ? (
            <button
              onClick={removeFriendFunc}
              className="p-2 bg-stone-600 hover:bg-stone-700 rounded-md"
            >
              Unfriend
            </button>
          ) : friendReq.outgoingFriendReq ? (
            <button className="p-2 bg-sky-600 hover:bg-sky-700 rounded-md">
              Respond
            </button>
          ) : friendReq.sentFriendReq ? (
            <button
              onClick={removeOutgoingFriendReqFunc}
              className="p-2 bg-sky-600 hover:bg-sky-700 rounded-md"
            >
              Cancel Request
            </button>
          ) : (
            <button
              onClick={sendFriendReqFunc}
              className="p-2 bg-sky-600 hover:bg-sky-700 rounded-md"
            >
              Add Friend
            </button>
          )}
        </div>
      </div>
      {friendReq.outgoingFriendReq ? (
        <div className="flex px-3 py-3 bg-stone-700 rounded-lg">
          <p className="self-center font-bold flex-grow">
            {user?.username} sent you a friend request
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                acceptFriendReqFunc(friendReq.outgoingFriendReq._id);
              }}
              className="py-1 px-2 bg-sky-600 hover:bg-sky-700 rounded-md"
            >
              Confirm Request
            </button>
            <button
              onClick={() => denyFriendReqFunc(friendReq.outgoingFriendReq._id)}
              className="py-1 px-2 bg-stone-600 hover:bg-stone-700 rounded-md"
            >
              Remove Request
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex border-t border-stone-700 py-1">
        <Link href={`/profile/${user?.url_handle}`}>
          <button className={postsStyling}>Posts</button>
        </Link>
        <Link href={`/profile/${user?.url_handle}/friends`}>
          <button className={friendsStyling}>Friends</button>
        </Link>
      </div>
    </div>
  );
}
