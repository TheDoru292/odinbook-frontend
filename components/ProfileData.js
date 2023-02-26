import Link from "next/link";

export default function ProfileData({ currentPage }) {
  const postsStyling =
    currentPage == "posts"
      ? "border-b border-sky-400 rounded-t-md hover:bg-stone-600 px-2 py-3"
      : "hover:bg-stone-600 rounded-md px-2 py-3";

  const friendsStyling =
    currentPage == "friends"
      ? "border-b border-sky-400 rounded-t-md hover:bg-stone-600 px-2 py-3"
      : "hover:bg-stone-600 rounded-md px-2 py-3";

  return (
    <div className="flex flex-col gap-4 px-64 pt-4 bg-stone-800">
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-red-400 rounded-full"></div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">User</h2>
          <p className="text-stone-400 font-bold">69 friends</p>
        </div>
      </div>
      <div className="flex border-t border-stone-700 py-1">
        <button className={postsStyling}>Posts</button>
        <Link href={"/user/friends"}>
          <button className={friendsStyling}>Friends</button>
        </Link>
      </div>
    </div>
  );
}
