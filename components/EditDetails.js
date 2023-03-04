import { useState } from "react";
import Router from "next/router";

export default function EditDetails({ user, close }) {
  const [username, setUsername] = useState(user.username);
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicture);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function editProfile() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const bodyObj = {
      username,
      profile_picture_url: profilePicUrl,
    };

    const data = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyObj),
    }).then((res) => res.json());

    console.log(data);

    if (data.success == true) {
      close();
      Router.reload();
    }
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50">
      <div
        style={{
          boxShadow: "0 0 0 50vmax rgba(0,0,0,0.7)",
          transform: "translate(-50%, -50%)",
        }}
        className="w-[300px] md:w-[420px] border border-stone-700 rounded-md absolute z-20 left-1/2 top-1/2 flex flex flex-col gap-3 bg-stone-800 text-white"
      >
        <div className="px-3 pt-3 flex w-full justify-center">
          <h2 className="text-lg font-bold">Edit Details</h2>
          <div
            className="mt-0.5 absolute w-7 h-7 right-0 bg-red-400 mr-4 align-self rounded-full cursor-pointer"
            onClick={() => {
              close(false, true);
            }}
          ></div>
        </div>
        <div className="py-2 px-3 border-t border-stone-700 flex flex-col gap-3">
          {error == true ? (
            <p className="self-center font-bold text-red-400">{errorMsg}</p>
          ) : (
            <></>
          )}
          <p className="self-center font-bold">Preview</p>
          <div className="self-center flex gap-2">
            <img
              src={`${profilePicUrl}`}
              className="w-10 h-10 rounded-full"
              alt=""
              onLoad={() => {
                setError(false);
                setErrorMsg("");
              }}
              onError={() => {
                setError(true);
                setErrorMsg("You entered an invalid image url!");
              }}
            />
            <p className="self-center font-bold">{username}</p>
          </div>
          <div>
            <label className="px-3 font-bold" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="rounded-md px-2 bg-inherit border border-stone-600 p-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="px-3 font-bold" htmlFor="profilePic">
              Profile Pic Url
            </label>
            <input
              type="text"
              id="profilePic"
              name="profilePic"
              className="rounded-md px-2 bg-inherit border border-stone-600 p-1"
              value={profilePicUrl}
              onChange={(e) => setProfilePicUrl(e.target.value)}
            />
          </div>
          <button
            disabled={
              error == true ? true : username.length != 0 ? false : true
            }
            onClick={editProfile}
            className="p-2 rounded-md bg-sky-600 self-center disabled:bg-stone-500"
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
}
