import Link from "next/link";

export default function Menu({ user }) {
  return (
    <div className="fixed shadow-[0_0_6px] shadow-stone-900 gap-4 rounded-b-md flex flex-col right-0 w-[320px] px-4 py-2 z-10 bg-stone-800 mr-4">
      <Link href={`/profile/${user?.userhandle}`}>
        <div className="hover:bg-stone-700 flex shadow-[0_0_12px] shadow-stone-900 rounded-md drop-shadow-2xl gap-2 p-3">
          <img
            src={`${user?.profilePicture}`}
            className="w-9 h-9 rounded-full"
            alt=""
          />
          <p className="self-center font-bold">{user?.username}</p>
        </div>
      </Link>
      <div className="p-2 rounded-lg hover:bg-stone-700">
        <Link href="/signout" className="flex gap-3">
          <img
            src="/logout-variant.svg"
            alt=""
            className="w-9 h-9 rounded-full"
          />
          <p className="text-white self-center">Log Out</p>
        </Link>
      </div>
    </div>
  );
}
