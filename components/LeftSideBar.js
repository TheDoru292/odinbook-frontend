import Link from "next/link";

export default function LeftSidebar() {
  return (
    <div className="flex flex-col p-4 w-3/12">
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
