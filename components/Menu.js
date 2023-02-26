import Link from "next/link";

export default function Menu() {
  return (
    <div className="fixed shadow-[0_0_6px] shadow-stone-900 gap-4 rounded-b-md flex flex-col right-0 w-[320px] px-4 py-2 z-10 bg-stone-800 mr-4">
      <div className="flex shadow-[0_0_12px] shadow-stone-900 rounded-md drop-shadow-2xl gap-2 p-3">
        <div className="rounded-full w-9 h-9 bg-red-400"></div>
        <p className="self-center font-bold">User</p>
      </div>
      <div className="p-2 rounded-lg hover:bg-stone-700">
        <Link href="/logout" className="flex gap-3">
          <div className="w-9 h-9 bg-red-400 rounded-full"></div>
          <p className="text-white self-center">Log Out</p>
        </Link>
      </div>
    </div>
  );
}
