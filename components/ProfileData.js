import Link from "next/link";

export default function ProfileData({ currentPage, user, friends }) {
  const postsStyling =
    currentPage == "posts"
      ? "border-b border-sky-400 rounded-t-md text-sky-400 hover:bg-stone-600 px-2 py-3"
      : "hover:bg-stone-600 rounded-md px-2 py-3";

  const friendsStyling =
    currentPage == "friends"
      ? "border-b border-sky-400 rounded-t-md text-sky-400 hover:bg-stone-600 px-2 py-3"
      : "hover:bg-stone-600 rounded-md px-2 py-3";

  return (
    <div className="flex flex-col gap-4 px-2 xl:px-64 pt-4 bg-stone-800">
      <div className="flex gap-4">
        <img
          src={`${user?.profile_picture_url}`}
          className="w-16 h-16 rounded-full"
          alt=""
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{user?.username}</h2>
          <p className="text-stone-400 font-bold">{friends.length} friends</p>
        </div>
      </div>
      <div className="flex border-t border-stone-700 py-1">
        <button className={postsStyling}>Posts</button>
        <Link href={`/profile/${user?.userhandle}/friends`}>
          <button className={friendsStyling}>Friends</button>
        </Link>
      </div>
    </div>
  );
}
