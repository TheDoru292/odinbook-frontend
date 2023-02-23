import Head from "next/head";
import NotLoggedMainPage from "@/components/MainPageUnlogged";
import { useEffect, useState } from "react";
import Homepage from "@/components/Homepage";

export default function Home() {
  const [logged, setLogged] = useState();

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
      } else {
        setLogged(true);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <Head>
        <title>Odin-book - Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {logged == false ? <NotLoggedMainPage /> : <Homepage />}
    </div>
  );
}