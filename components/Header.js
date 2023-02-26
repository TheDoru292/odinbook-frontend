import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Header({ currentPage, setMenu }) {
  const [logged, setLogged] = useState();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      const bodyData = {
        token: token || "",
      };

      const data = await fetch("http://localhost:3000/api/auth/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }).then((res) => res.json());

      if (data.code == 400) {
        setLogged(false);
        router.push("/");
      } else {
        setLogged(true);
      }
    }

    fetchData();
  }, []);

  const homeSrc = currentPage == "home" ? "home-blue.svg" : "home.svg";
  const accountSrc =
    currentPage == "friends"
      ? "account-multiple-blue.svg"
      : "account-multiple.svg";

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
          <img src={homeSrc} alt="" width={32} />
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
          <div className="rounded-full w-11 h-11 bg-red-400"></div>
        </button>
      </div>
    </header>
  );
}
