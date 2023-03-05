import Header from "./Header";
import Link from "next/link";
import LeftSidebar from "./LeftSideBar";
import RightSidebar from "./RightSidebar";
import MainPagePost from "./PostDiv";
import Post from "./Post";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";

export default function Homepage({ user }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      const data = await fetch(`http://localhost:3000/api/post/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());

      if (data.posts) {
        const sortedPost = data.posts.sort((a, b) => {
          return new Date(b.post.posted_on) - new Date(a.post.posted_on);
        });

        setPosts(sortedPost);
      }
    }

    fetchData();
  }, []);

  function handleOpenMenu() {
    if (openMenu == false) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }

  function handleOpenPost() {
    if (openPost == false) {
      setOpenPost(true);
      document.querySelector("body").classList.remove("overflow-visible");
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      setOpenPost(false);
      document.querySelector("body").classList.remove("overflow-hidden");
      document.querySelector("body").classList.add("overflow-visible");
    }
  }

  return (
    <>
      <Header
        currentPage="home"
        setMenu={handleOpenMenu}
        profilePic={user?.profilePicture}
      />
      {openPost == true ? (
        <CreatePost
          closePost={handleOpenPost}
          username={user?.username}
          profilePic={user?.profilePicture}
        />
      ) : (
        <></>
      )}
      <div className="relative text-stone-200 flex bg-stone-900">
        {openMenu == true ? <Menu user={user}></Menu> : <></>}
        <LeftSidebar user={user} />
        <main className="flex-grow z-1 flex flex-col gap-4 py-4 px-2 md:px-6 lg:px-28 w-6/12">
          <MainPagePost openPost={handleOpenPost} user={user} />
          {posts.map((item) => (
            <Post
              key={item.post._id}
              user={user}
              postUser={item.post.user}
              postData={item.post}
              likes={item.likes}
              comments={item.comments}
              liked={item.liked}
              setPosts={setPosts}
            />
          ))}
        </main>
        <RightSidebar />
      </div>
    </>
  );
}
