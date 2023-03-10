import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { userLogin } from "@/redux/auth/authActions";

Login.getInitialProps = ({ query }) => {
  return { query };
};

export default function Login({ query }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo]);

  async function logIn(e) {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    dispatch(userLogin(data));
  }

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Login - OdinBook</title>
      </Head>
      <main className="px-8 lg:mx-0 flex-grow bg-gray-100 flex-col flex lg:flex-row justify-center md:items-center gap-4 lg:gap-24">
        <div>
          <h1 className="text-center md:text-start text-5xl mb-2">Odin-book</h1>
          <p className="text-lg">
            Connect with friends and the world around you on Odin-book
          </p>
        </div>
        <div className="bg-white p-4 rounded-md w-full md:w-80 shadow-lg">
          {query ? (
            <p className="mb-2 text-center font-bold">
              {JSON.stringify(query.message)}
            </p>
          ) : (
            <></>
          )}
          {error == true ? (
            <p className="text-red-400 text-center mb-2 font-bold">
              {errorMessage}
            </p>
          ) : (
            <></>
          )}
          <form onSubmit={logIn}>
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
            <button
              type="submit"
              className="bg-sky-400 hover:bg-sky-500 w-full mb-2 py-2 rounded-md"
            >
              Log in
            </button>
          </form>
          <div className="flex flex-col gap-2">
            <button className="bg-green-400 hover:bg-green-500 py-2 rounded-md">
              I'm just looking around!
            </button>
            <button className="bg-violet-400 hover:bg-violet-500 py-2 mb-4 rounded-md">
              Log in with Facebook
            </button>
          </div>
          <hr />
          <div className="flex justify-center">
            <button className="w-1/2 mt-4 bg-green-400 hover:bg-green-500 py-2 rounded-md">
              <Link href={`/signup`}>Create account</Link>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
