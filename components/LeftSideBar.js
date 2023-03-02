import Link from "next/link";

export default function LeftSidebar({ user }) {
  return (
    <div
      style={{ height: "calc(100vh - 64px)", top: "64px" }}
      className="hidden xl:block py-4 pl-2 h-full w-[320px] m-0 sticky"
    >
      <Link href={`/profile/${user?.userhandle}`}>
        <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
          <img
            src={`${user?.profilePicture}`}
            className="w-9 h-9 rounded-full"
            alt=""
          />
          <p className="self-center">{user?.username}</p>
        </div>
      </Link>
      <Link href={"/friend"}>
        <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
          <img src="account-multiple.svg" className="w-9 h-9 " alt="" />
          <p className="self-center">Friends</p>
        </div>
      </Link>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <img src="history.svg" className="w-9 h-9 " alt="" />
        <p className="self-center">Most recent</p>
      </div>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <img src="account-group.svg" className="w-9 h-9 " alt="" />
        <p className="self-center">Groups</p>
      </div>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <img src="shopping.svg" className="w-9 h-9 " alt="" />
        <p className="self-center">Marketplace</p>
      </div>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <img src="video.svg" className="w-9 h-9 " alt="" />
        <p className="self-center">Watch</p>
      </div>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <img src="thumb-up.svg" className="w-9 h-9 " alt="" />
        <p className="self-center">Liked Posts</p>
      </div>
    </div>
  );
}
