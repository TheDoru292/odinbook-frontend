import Header from "@/components/Header";
import MainPagePost from "@/components/PostDiv";
import Post from "@/components/Post";
import Menu from "@/components/Menu";
import CreatePost from "@/components/CreatePost";
import ProfileData from "@/components/ProfileData";
import { useState, useEffect } from "react";
import { getAllProfileUrl, getUserData, getUserFriends } from "@/lib/profile";
import { format } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import EditDetails from "@/components/EditDetails";

export default function Profile({ profileUser, friends }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDetailsModel, setOpenDetailsModel] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    async function fetchPosts() {
      const token = localStorage.getItem("token");

      const data = await fetch(
        `https://odinbook-backend-iccv.onrender.com/api/user/${profileUser._id}/post`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());

      const sortedPost = data.posts.sort((a, b) => {
        return new Date(b.post.posted_on) - new Date(a.post.posted_on);
      });

      setPosts(sortedPost);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  function handleOpenMenu() {
    if (openMenu == false) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }

  function handleOpenPost(post, detail) {
    if (post == true) {
      if (openPost == false) {
        setOpenPost(true);
        document.querySelector("body").classList.remove("overflow-visible");
        document.querySelector("body").classList.add("overflow-hidden");
      } else {
        setOpenPost(false);
        document.querySelector("body").classList.remove("overflow-hidden");
        document.querySelector("body").classList.add("overflow-visible");
      }
    } else if (detail == true) {
      if (openDetailsModel == false) {
        setOpenDetailsModel(true);
        document.querySelector("body").classList.remove("overflow-visible");
        document.querySelector("body").classList.add("overflow-hidden");
      } else {
        setOpenDetailsModel(false);
        document.querySelector("body").classList.remove("overflow-hidden");
        document.querySelector("body").classList.add("overflow-visible");
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{profileUser.username} - OdinBook</title>
      </Head>
      <Header
        setMenu={handleOpenMenu}
        profilePic={userInfo?.profile_picture_url}
      />
      {openPost == true ? (
        <CreatePost
          username={userInfo?.username}
          profilePic={userInfo?.profile_picture_url}
          closePost={handleOpenPost}
        />
      ) : (
        <></>
      )}
      {openDetailsModel == true ? (
        <EditDetails
          user={userInfo}
          openModal={setOpenDetailsModel}
          close={handleOpenPost}
        />
      ) : (
        <></>
      )}
      <main className="relative text-stone-200 flex flex-col flex-grow h-100 bg-stone-900">
        <ProfileData
          currentPage={"posts"}
          loggedUser={userInfo}
          user={profileUser}
          friends={friends}
          openDetailsModel={handleOpenPost}
        />
        {openMenu == true ? <Menu user={userInfo}></Menu> : <></>}
        <div className="px-2 xl:px-64 gap-4 flex">
          <aside className="hidden md:flex m-0 w-5/12 flex-col gap-4 py-4">
            <div className="bg-stone-800 rounded-xl px-4 py-3">
              <h2 className="text-lg font-bold">Intro</h2>
              <p>
                Registered on:{" "}
                {format(new Date(profileUser.registered_on), "MMMM, do yyyy")}
              </p>
            </div>
            <div
              style={{ top: "82px" }}
              className="sticky bg-stone-800 rounded-xl px-4 py-3"
            >
              <div className="flex">
                <h2 className="flex-grow text-lg font-bold">Friends</h2>
                <Link href={`/profile/${profileUser.url_handle}/friends`}>
                  <p className="text-lg ">See All Friends</p>
                </Link>
              </div>
              <p>{friends.length} friend(s)</p>
              <div className="mt-2 flex flex-wrap gap-4">
                {friends.map((friend, index) => {
                  if (index <= 9) {
                    return (
                      <div
                        key={friend.second_user._id}
                        className="flex-basis flex-grow"
                      >
                        <a
                          href={`/profile/${encodeURIComponent(
                            friend.second_user.url_handle
                          )}`}
                        >
                          <img
                            src={friend.second_user.profile_picture_url}
                            className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"
                            alt=""
                          />
                          <p>{friend.second_user.username}</p>
                        </a>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </aside>
          <div className="flex flex-col gap-4 py-4 flex-grow ">
            {profileUser._id !== userInfo?._id ? (
              <></>
            ) : (
              <MainPagePost openPost={handleOpenPost} user={userInfo} />
            )}
            {loading == true ? (
              <p>Loading....</p>
            ) : posts.length == 0 ? (
              <p className="flex gap-2 flex-col rounded-xl bg-stone-800 px-4 py-3">
                User has no posts.
              </p>
            ) : (
              posts.map((item) => (
                <Post
                  key={item.post._id}
                  user={userInfo}
                  postUser={item.post.user}
                  postData={item.post}
                  likes={item.likes}
                  comments={item.comments}
                  liked={item.liked}
                  setPosts={setPosts}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getAllProfileUrl();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const user = await getUserData(params.id);
  const friends = await getUserFriends(user._id);

  return {
    props: {
      profileUser: user,
      friends,
    },
  };
}
