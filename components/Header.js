import Link from "next/link";

export default function Header({ currentPage, setMenu, profilePic }) {
  const homeSrc = currentPage == "home" ? "/home-blue.svg" : "/home.svg";
  const accountSrc =
    currentPage == "friends"
      ? "/account-multiple-blue.svg"
      : "/account-multiple.svg";

  return (
    <header className="z-10 sticky h-[64px] top-0 flex py-2 px-3 bg-stone-800 border-b-2 border-stone-700">
      <div className="flex flex-grow basis-px">
        <div className="rounded-full w-11 h-11 bg-red-400 mr-2"></div>
        <input
          className="hidden md:block border rounded-3xl px-4 bg-stone-700 border border-stone-700"
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center justify-center flex-grow gap-2 basis-px">
        <Link
          className="w-20 rounded-md flex justify-center h-full items-center hover:bg-stone-700"
          href="/"
        >
          <img src={homeSrc} alt="" width={32} height={32} />
        </Link>
        <Link
          className="w-20 rounded-md flex justify-center h-full items-center hover:bg-stone-700"
          href="/friend"
        >
          <img src={accountSrc} alt="" width={32} />
        </Link>
      </div>
      <div className="flex justify-end flex-grow basis-px">
        <button onClick={setMenu}>
          <img src={`${profilePic}`} className="w-9 h-9 rounded-full" alt="" />
        </button>
      </div>
    </header>
  );
}
