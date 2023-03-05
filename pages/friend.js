import Header from "@/components/Header";
import Head from "next/head";
import Menu from "@/components/Menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  sendFriendReq,
  denyFriendReq as deleteFriendReq,
  acceptFriendReq as acceptFriendRequest,
} from "@/lib/friend";

export default function Friend() {
  const [openMenu, setOpenMenu] = useState(false);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState();
  const [youMayKnow, setYouMayKnow] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [outgoingFriendRequests, setOutgoingFriendRequests] = useState([]);
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      const bodyData = {
        token: token || "",
      };

      const data = await fetch("http://localhost:3000/api/auth/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }).then((res) => res.json());

      if (data.code == 400) {
        setLogged(false);
      } else {
        setLogged(true);
      }

      setUser(data.user);
    }

    async function fetchFriendStuff() {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      const friendRequests = await fetch(
        `http://localhost:3000/api/user/${id}/friend/request`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());

      const outgoingFriendRequests = await fetch(
        `http://localhost:3000/api/user/${id}/friend/request/outgoing`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());

      const users = await fetch("http://localhost:3000/api/user/friends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());

      console.log(users);
      const array = users.users.filter((item) => item._id != id);
      setYouMayKnow(array);
      setFriendRequests(friendRequests.friendReqs);
      setOutgoingFriendRequests(outgoingFriendRequests.friendReqs);
    }

    fetchData();
    fetchFriendStuff();
  }, []);

  function handleOpenMenu() {
    if (openMenu == false) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }

  async function sendFriendReqFunc(reqId) {
    const data = await sendFriendReq(reqId);

    if (data.success == true) {
      setNotification(true);
      setNotificationMessage("Friend request sent.");

      setTimeout(() => {
        setNotification(false);
        setNotificationMessage("");
      }, 5000);
    }

    setOutgoingFriendRequests([...outgoingFriendRequests, data.friendReq]);
  }

  async function removeOutgoingFriendReq(reqId) {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const friendRequest = await fetch(
      `http://localhost:3000/api/user/${id}/friend/request/outgoing/${reqId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    if (friendRequest.success == true) {
      setNotification(true);
      setNotificationMessage("Friend request deleted.");

      setTimeout(() => {
        setNotification(false);
        setNotificationMessage("");
      }, 5000);

      let requestUserId = outgoingFriendRequests.map((item) => {
        if (item._id == reqId) {
          return item.recipient._id;
        }
      });

      setOutgoingFriendRequests((current) =>
        current.filter((item) => item._id != reqId)
      );

      setYouMayKnow(
        youMayKnow.map((item) => {
          if (item._id == requestUserId) {
            return { ...item, friendReq: false };
          } else {
            return item;
          }
        })
      );
    }
  }

  async function denyFriendReq(reqId) {
    const data = await deleteFriendReq(reqId);

    if (data.success == true) {
      setNotification(true);
      setNotificationMessage("Friend request denied.");

      setTimeout(() => {
        setNotification(false);
        setNotificationMessage("");
      }, 5000);

      setFriendRequests((current) =>
        current.filter((item) => item._id != reqId)
      );
    }
  }

  async function acceptFriendReq(reqId) {
    const data = acceptFriendRequest(reqId);

    if (data.success == true) {
      setNotification(true);
      setNotificationMessage("Friend request accepted.");

      setTimeout(() => {
        setNotification(false);
        setNotificationMessage("");
      }, 5000);

      setFriendRequests((current) =>
        current.filter((item) => item._id != reqId)
      );
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Friends - Odin-Book</title>
      </Head>
      <Header
        currentPage="friends"
        setMenu={handleOpenMenu}
        profilePic={user?.profilePicture}
      />
      <main className="text-stone-200 flex flex-grow h-100 bg-stone-900">
        {notification == true ? (
          <p
            style={{ left: "50%", transform: "translateX(-50%)" }}
            className="mt-3 bg-stone-700 text-white fixed z-10 m-auto p-2 border rounded-md"
          >
            {notificationMessage}
          </p>
        ) : (
          <></>
        )}
        {openMenu == true ? <Menu user={user}></Menu> : <></>}
        <div
          style={{ height: "calc(100vh - 64px)", top: "62px" }}
          className="hidden lg:block sticky h-100 w-2/12 py-2 px-3 bg-stone-800 flex flex-col gap-2"
        >
          <div>
            <h2 className="text-xl font-bold">Friends</h2>
          </div>
          <div>
            <div className="bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <img src="account-multiple.svg" className="w-9 h-9" alt="" />
              <p className="self-center">Home</p>
            </div>
            <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <img src="account-multiple-plus.svg" className="w-9 h-9" alt="" />
              <p className="self-center">Friend requests</p>
            </div>
            <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <img src="account-multiple-plus.svg" className="w-9 h-9" alt="" />
              <p className="self-center">Suggestions</p>
            </div>
            <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <img
                src="account-multiple-outline.svg"
                className="w-9 h-9"
                alt=""
              />
              <p className="self-center">All friends</p>
            </div>
            <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <img src="gift.svg" className="w-9 h-9" alt="" />
              <p className="self-center">Birthdays</p>
            </div>
          </div>
        </div>
        <div className="w-9/12 flex flex-col gap-6 flex-grow px-6 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">Outgoing Friend Requests</h2>
            </div>
            <div className="justify-start flex flex-wrap gap-4">
              {outgoingFriendRequests.length == 0 ? (
                <p>You have no outgoing friend requests....</p>
              ) : (
                outgoingFriendRequests.map((item) => {
                  return (
                    <div key={item._id}>
                      <Link href={`/profile/${item.recipient.url_handle}`}>
                        <img
                          src={`${item.recipient.profile_picture_url}`}
                          className="border-x border-t border-stone-700 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-red-400 rounded-t-xl "
                          alt=""
                        />
                      </Link>
                      <div className="border-x border-b border-stone-700 p-3 bg-stone-800 flex gap-4 flex-col rounded-b-xl">
                        <Link href={`/profile/${item.recipient.url_handle}`}>
                          <p className="font-bold">{item.recipient.username}</p>
                        </Link>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => removeOutgoingFriendReq(item._id)}
                            className="py-1 bg-stone-600 hover:bg-stone-700 rounded-md"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="border-t border-stone-700">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold pt-6">Friend Requests</h2>
              <div className="justify-start flex flex-wrap gap-4">
                {friendRequests.length == 0 ? (
                  <p>You have no friend requests...</p>
                ) : (
                  friendRequests.map((item) => {
                    return (
                      <div key={item._id}>
                        <Link href={`/profile/${item.sender.url_handle}`}>
                          <img
                            src={`${item.sender.profile_picture_url}`}
                            className="border-x border-t border-stone-700 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-red-400 rounded-t-xl "
                            alt=""
                          />
                        </Link>
                        <div className="border-x border-b border-stone-700 p-3 bg-stone-800 flex gap-4 flex-col rounded-b-xl">
                          <Link href={`/profile/${item.sender.url_handle}`}>
                            <p className="font-bold">{item.sender.username}</p>
                          </Link>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => acceptFriendReq(item._id)}
                              className="py-1 bg-sky-600 hover:bg-sky-700 rounded-md"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => denyFriendReq(item._id)}
                              className="py-1 bg-stone-600 hover:bg-stone-700 rounded-md"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl pt-6">You may know</h2>
              <div className="justify-start flex flex-wrap gap-4">
                {youMayKnow.map((item) => {
                  return (
                    <div key={item._id}>
                      <Link href={`/profile/${item.url_handle}`}>
                        <img
                          src={`${item.profile_picture_url}`}
                          className="border-x border-t border-stone-700 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-red-400 rounded-t-xl "
                          alt=""
                        />
                      </Link>
                      <div className="border-x border-b border-stone-700 p-3 bg-stone-800 flex gap-4 flex-col rounded-b-xl">
                        <Link href={`/profile/${item.url_handle}`}>
                          <p className="font-bold">{item.username}</p>
                        </Link>
                        <div className="flex flex-col gap-2">
                          {item.friendReq == true ? (
                            <button
                              onClick={async () => {
                                await removeOutgoingFriendReq(item.friendReqId);
                                item.friendReq = false;
                              }}
                              className="py-1 bg-stone-600 hover:bg-stone-700 rounded-md"
                            >
                              Remove Request
                            </button>
                          ) : (
                            <button
                              onClick={async () => {
                                await sendFriendReqFunc(item._id);
                                item.friendReq = true;
                              }}
                              className="py-1 bg-sky-600 hover:bg-sky-700 rounded-md"
                            >
                              Send Request
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
