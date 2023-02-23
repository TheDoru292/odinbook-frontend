import Header from "./Header";
import Link from "next/link";
import LeftSidebar from "./LeftSideBar";
import RightSidebar from "./RightSidebar";
import MainPagePost from "./PostDiv";
import Post from "./Post";

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

export default function Homepage() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header currentPage="home" />
      <main className="text-stone-200 flex flex-grow h-100 bg-stone-900">
        <LeftSidebar />
        <div className="flex flex-col gap-4 py-4 px-24 w-6/12 flex-grow ">
          <MainPagePost />
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
        </div>
        <div className="p-4 w-3/12 flex-grow">
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}
