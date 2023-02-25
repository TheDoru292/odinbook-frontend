import Link from "next/link";

export default function LeftSidebar() {
  return (
    <div
      style={{ height: "calc(100vh - 64px)", top: "62px" }}
      className="py-4 pl-2 h-full w-[320px] m-0 sticky"
    >
      <Link href="/profile/test">
        <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
          <div className="w-9 h-9 bg-red-400 rounded-full"></div>
          <p className="self-center">Username</p>
        </div>
      </Link>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <div className="w-9 h-9 bg-red-400 rounded-full"></div>
        <p className="self-center">Friends</p>
      </div>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <div className="w-9 h-9 bg-red-400 rounded-full"></div>
        <p className="self-center">Most recent</p>
      </div>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <div className="w-9 h-9 bg-red-400 rounded-full"></div>
        <p className="self-center">Groups</p>
      </div>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <div className="w-9 h-9 bg-red-400 rounded-full"></div>
        <p className="self-center">Marketplace</p>
      </div>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <div className="w-9 h-9 bg-red-400 rounded-full"></div>
        <p className="self-center">Watch</p>
      </div>
      <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
        <div className="w-9 h-9 bg-red-400 rounded-full"></div>
        <p className="self-center">Liked Posts</p>
      </div>
    </div>
  );
}
