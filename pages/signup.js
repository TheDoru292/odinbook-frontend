import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/auth/authActions";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [urlHandle, setUrlHandle] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (success == true) router.push("/login");

    if (userInfo) router.push("/");
  });

  async function signUp(e) {
    e.preventDefault();

    const data = {
      email: email,
      username: username,
      password: password,
      profile_picture_url: profilePicUrl,
      url_handle: urlHandle,
    };

    dispatch(registerUser(data));
  }

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Signup - OdinBook</title>
      </Head>
      <main className="px-8 lg:mx-0 flex-grow bg-gray-100 flex-col flex lg:flex-row justify-center md:items-center gap-4 lg:gap-24">
        <div>
          <h1 className="text-center md:text-start text-5xl mb-2">Odin-book</h1>
          <p className="text-lg">
            Connect with friends and the world around you on Odin-book
          </p>
        </div>
        <div className="bg-white p-4 rounded-md w-full md:w-80 shadow-lg">
          {error == true ? (
            errorArray.length != 0 ? (
              <div>
                {errorArray.map((item) => {
                  return (
                    <p
                      key={item.param}
                      className="text-red-400 text-center mb-2 font-bold"
                    >
                      {item.msg}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-400 text-center mb-2 font-bold">
                {errorMessage}
              </p>
            )
          ) : (
            <></>
          )}
          <form onSubmit={signUp}>
            <div>
              <input
                className="w-full border rounded-md mb-3 p-2"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required={true}
              />
            </div>
            <div>
              <input
                className="w-full border rounded-md mb-3 p-2"
                type="text"
                name="url_handle"
                id="url_handle"
                value={urlHandle}
                onChange={(e) => setUrlHandle(e.target.value)}
                placeholder="Url handle"
                required={true}
              />
            </div>
            <div>
              <input
                className="w-full border rounded-md mb-3 p-2"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required={true}
              />
            </div>
            <div>
              <input
                className="w-full border rounded-md mb-3 p-2"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                required={true}
              />
            </div>
            <div>
              <input
                className="w-full border rounded-md mb-3 p-2"
                type="text"
                name="picture_url"
                id="picture_url"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
                placeholder="Profile pic url (optional)"
              />
            </div>
            <button
              type="submit"
              className="mb-4 bg-sky-400 hover:bg-sky-500 w-full mb-2 py-2 rounded-md"
            >
              Create account
            </button>
          </form>
          <hr />
          <div className="flex flex-col">
            <button className="mt-4 bg-green-400 hover:bg-green-500 py-2 rounded-md">
              <Link href="/login">Go back to log in</Link>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
