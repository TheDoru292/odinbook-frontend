import { useEffect, useState } from "react";
import Link from "next/link";

export default function RightSidebar() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStuff() {
      const userId = localStorage.getItem("id");

      const data = await fetch(
        `https://odinbook-backend-iccv.onrender.com/api/user/${userId}/friend`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      if (data.success == true) {
        setLoading(false);
      }

      setFriends(data.friends);
    }
    fetchStuff();
  }, []);

  return (
    <div
      style={{ height: "calc(100vh - 64px)", top: "64px" }}
      className="hidden lg:block w-[320px] sticky flex flex-col pr-2"
    >
      <div className="p-2">
        <p className="font-bold text-lg">Contacts</p>
      </div>
      {loading == true ? (
        <p>Loading...</p>
      ) : friends.length === 0 ? (
        <p>You have no friends :(</p>
      ) : (
        friends.map((item) => {
          return (
            <Link
              key={item._id}
              href={`/profile/${item.second_user.url_handle}`}
            >
              <div className="px-2 py-2 rounded-lg flex items-center gap-3 hover:bg-stone-800">
                <img
                  src={item.second_user.profile_picture_url}
                  className="w-9 h-9 rounded-full"
                  alt=""
                />
                <p className="text-gray-300">{item.second_user.username}</p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
