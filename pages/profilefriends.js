import Head from "next/head";
import Header from "@/components/Header";
import ProfileData from "@/components/ProfileData";
import Profile from "./profile";

export default function ProfileFriends() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Profile - Odin-book</title>
      </Head>
      <Header />
      <main className="text-stone-200 flex flex-col w-100 flex-grow bg-stone-900">
        <ProfileData currentPage={"friends"} />
        <div className="flex px-64 gap-4 py-4 w-100">
          <div className="w-full flex flex-col gap-6 bg-stone-800 rounded-xl px-4 py-3">
            <div className="flex">
              <h2 className="flex-grow text-lg font-bold">Friends</h2>
              <div className="gap-2 flex items-center">
                <p>Friend requests</p>
                <p>Find friends</p>
              </div>
            </div>
            <div className="flex w-100 flex-wrap px-6">
              <div className="flex gap-4 w-6/12 mb-6 pr-6">
                <div className="w-20 h-20 bg-red-400 rounded-lg"></div>
                <p className="self-center flex-grow font-bold">Hii</p>
                <p className="self-center border-sky-400 text-sky-400 border p-2 rounded-lg">
                  <span>✓</span>Friends
                </p>
              </div>
              <div className="flex gap-4 w-6/12 mb-6 pr-6">
                <div className="w-20 h-20 bg-red-400 rounded-lg"></div>
                <p className="self-center flex-grow font-bold">Hii</p>
                <p className="self-center border-sky-400 text-sky-400 border p-2 rounded-lg">
                  <span>✓</span>Friends
                </p>
              </div>
              <div className="flex gap-4 w-6/12 mb-6 pr-6">
                <div className="w-20 h-20 bg-red-400 rounded-lg"></div>
                <p className="self-center flex-grow font-bold">Hii</p>
                <p className="self-center border-sky-400 text-sky-400 border p-2 rounded-lg">
                  <span>✓</span>Friends
                </p>
              </div>
              <div className="flex gap-4 w-6/12 mb-6 pr-6">
                <div className="w-20 h-20 bg-red-400 rounded-lg"></div>
                <p className="self-center flex-grow font-bold">Hii</p>
                <p className="self-center border-sky-400 text-sky-400 border p-2 rounded-lg">
                  <span>✓</span>Friends
                </p>
              </div>
              <div className="flex gap-4 w-6/12 mb-6 pr-6">
                <div className="w-20 h-20 bg-red-400 rounded-lg"></div>
                <p className="self-center flex-grow font-bold">Hii</p>
                <p className="self-center border-sky-400 text-sky-400 border p-2 rounded-lg">
                  <span>✓</span>Friends
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}