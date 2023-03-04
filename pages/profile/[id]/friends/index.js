import ProfileData from "@/components/ProfileData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Link from "next/link";
import { getAllProfileUrl, getUserData, getUserFriends } from "@/lib/profile";

export default function Friends({ profileUser, friends }) {
  const [user, setUser] = useState();
  const [logged, setLogged] = useState();
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

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
        router.push("/login");
      } else {
        setLogged(true);
      }

      setUser(data.user);
      setLoading(false);
    }

    fetchData();
  }, []);

  function handleOpenMenu() {
    if (openMenu == false) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {loading == true ? (
        <p>Loading</p>
      ) : logged == true ? (
        <>
          <Head>
            <title>Profile - Odin-book</title>
          </Head>
          <Header setMenu={handleOpenMenu} profilePic={user?.profilePicture} />
          <main className="text-stone-200 flex flex-col w-100 flex-grow bg-stone-900">
            {openMenu == true ? <Menu user={user}></Menu> : <></>}
            <ProfileData
              loggedUser={user}
              user={profileUser}
              friends={friends}
              currentPage={"friends"}
            />
            <div className="flex px-2 xl:px-64 gap-4 py-4 w-100">
              <div className="w-full flex flex-col gap-6 bg-stone-800 rounded-xl px-4 py-3">
                <div className="flex">
                  <h2 className="flex-grow text-lg font-bold">Friends</h2>
                  <div className="gap-2 flex items-center">
                    {user.id != profileUser._id ? (
                      <></>
                    ) : (
                      <>
                        <Link href="/friend">
                          <p>Friend requests</p>
                        </Link>
                        <Link href="/friend">
                          <p>Find friends</p>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                {friends.length == 0 ? (
                  <p>User has no friends...</p>
                ) : (
                  <div className="flex flex-wrap w-full flex-wrap md:px-6">
                    {friends.map((item) => {
                      console.log(item);
                      return (
                        <div
                          key={item.second_user._id}
                          className="flex gap-4 w-full md:w-6/12 mb-6 md:pr-6"
                        >
                          <Link
                            href={`/profile/${item.second_user.url_handle}`}
                          >
                            <img
                              src={item.second_user.profile_picture_url}
                              className="w-14 h-14 md:w-20 md:h-20 rounded-lg"
                              alt=""
                            />
                          </Link>
                          <Link
                            className="self-center flex-grow font-bold"
                            href={`/profile/${item.second_user.url_handle}`}
                          >
                            <p>{item.second_user.username}</p>
                          </Link>
                          <p className="self-center border-sky-400 text-sky-400 border p-1 md:p-2 rounded-lg">
                            <span>✓</span>Friends
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getAllProfileUrl();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const user = await getUserData(params.id);
  const friends = await getUserFriends(user._id);

  return {
    props: {
      profileUser: user,
      friends,
    },
  };
}
