import Header from "./Header";
import Link from "next/link";
import LeftSidebar from "./LeftSideBar";
import RightSidebar from "./RightSidebar";
import MainPagePost from "./PostDiv";
import Post from "./Post";
import Menu from "./Menu";
import { useState } from "react";
import CreatePost from "./CreatePost";

const data = {
  posted_on: new Date(),
  content: "Heyyy",
};

const likes = {
  count: 23,
};

const comments = [
  {
    user: "test 1",
    content: "Nice!",
    commented_on: new Date(),
  },
];

const friends = [
  {
    user: "Ey",
  },
  {
    user: "PowerPlay",
  },
  { user: "Hey" },
  { user: "Test" },
];

export default function Homepage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openPost, setOpenPost] = useState(false);

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
      <Header currentPage="home" setMenu={handleOpenMenu} />
      {openPost == true ? <CreatePost closePost={handleOpenPost} /> : <></>}
      <div className="relative text-stone-200 flex bg-stone-900">
        {openMenu == true ? <Menu></Menu> : <></>}
        <LeftSidebar />
        <main className="flex-grow z-1 flex flex-col gap-4 py-4 px-2 md:px-6 lg:px-28 w-6/12">
          <MainPagePost openPost={handleOpenPost} />
          <Post user="test" postData={data} likes={likes} comments={comments} />
          <Post
            user="PowerPlay"
            postData={{
              posted_on: new Date(),
              content:
                "Did you know that there are monsters within our world? They are called--",
            }}
            likes={{ count: 690 }}
            comments={[]}
          />
          <Post
            user="User"
            postData={{
              posted_on: new Date(),
              content: "i am currently watching Black Clover",
            }}
            likes={{ count: 874555 }}
            comments={[
              {
                user: "PowerPlay",
                content: "Hope you enjoy it!",
                commented_on: new Date(),
              },
              {
                user: "Naruto Fan 69",
                content: "Watch Naruto instead smh",
                commented_on: new Date(),
              },
            ]}
          />
        </main>
        <RightSidebar friends={friends} menuOpen={openMenu} />
      </div>
    </>
  );
}
