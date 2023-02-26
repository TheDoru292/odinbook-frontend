import Header from "@/components/Header";
import MainPagePost from "@/components/PostDiv";
import Post from "@/components/Post";
import Menu from "@/components/Menu";
import ProfileData from "@/components/ProfileData";
import { useState } from "react";

export default function Profile() {
  const [openMenu, setOpenMenu] = useState(false);

  function handleOpenMenu() {
    if (openMenu == false) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header setMenu={handleOpenMenu} />
      <main className="relative text-stone-200 flex flex-col flex-grow h-100 bg-stone-900">
        <ProfileData currentPage={"posts"} />
        {openMenu == true ? <Menu></Menu> : <></>}
        <div className="px-2 xl:px-64 gap-4 flex">
          <aside className="hidden md:flex m-0 w-5/12 flex-col gap-4 py-4">
            <div className="bg-stone-800 rounded-xl px-4 py-3">
              <h2 className="text-lg font-bold">Intro</h2>
              <p>No information</p>
            </div>
            <div
              style={{ top: "66px" }}
              className="sticky bg-stone-800 rounded-xl px-4 py-3"
            >
              <div className="flex">
                <h2 className="flex-grow text-lg font-bold">Friends</h2>
                <p className="text-lg ">See All Friends</p>
              </div>
              <p>69 friends</p>
              <div className="mt-2 flex flex-wrap gap-4">
                <div className="flex-basis flex-grow">
                  <div className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"></div>
                  <p>User</p>
                </div>
                <div className="flex-basis flex-grow">
                  <div className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"></div>
                  <p>PowerPlay</p>
                </div>
                <div className="flex-basis flex-grow">
                  <div className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"></div>
                  <p>Ey</p>
                </div>
                <div className="flex-basis flex-grow">
                  <div className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"></div>
                  <p>Hey</p>
                </div>
                <div className="flex-basis flex-grow">
                  <div className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"></div>
                  <p>Test</p>
                </div>
                <div className="flex-basis flex-grow">
                  <div className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"></div>
                  <p>Aaaa</p>
                </div>
                <div className="flex-basis flex-grow">
                  <div className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"></div>
                  <p>O</p>
                </div>
                <div className="flex-basis flex-grow">
                  <div className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"></div>
                  <p>T</p>
                </div>
                <div className="flex-basis flex-grow">
                  <div className="w-16 h-16 xl:w-28 xl:h-28 bg-red-400 rounded-md"></div>
                  <p>Test 2</p>
                </div>
              </div>
            </div>
          </aside>
          <div className="flex flex-col gap-4 py-4 flex-grow ">
            <MainPagePost />
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
              user="PowerPlay"
              postData={{
                posted_on: new Date(),
                content:
                  "Did you know that there are monsters within our world? They are called--",
              }}
              likes={{ count: 690 }}
              comments={[]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
