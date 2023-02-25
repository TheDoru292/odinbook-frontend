import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

export default function NotLoggedMainPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function logIn(e) {
    e.preventDefault();

    const bodyData = {
      email: email,
      password: password,
    };

    const data = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }).then((res) => res.json());

    if (data.code == 400) {
      setError(true);
      setErrorMessage(data.status);
    } else {
      setError(false);
    }

    localStorage.setItem("token", data.token);
    router.push("/");
  }

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow bg-gray-100 flex justify-center items-center gap-24">
        <div>
          <h1 className="text-5xl mb-2">Odin-book</h1>
          <p className="text-lg">
            Connect with friends and the world around you on Odin-book
          </p>
        </div>
        <div className="bg-white p-4 rounded-md w-80 shadow-lg">
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
              className="bg-sky-400 w-full mb-2 py-2 rounded-md"
            >
              Log in
            </button>
          </form>
          <div className="flex flex-col gap-2">
            <button className="bg-green-400 py-2 rounded-md">
              I'm just looking around!
            </button>
            <button className="bg-sky-700 py-2 mb-4 rounded-md">
              Log in with Facebook
            </button>
          </div>
          <hr />
          <div className="flex justify-center">
            <button className="w-1/2 mt-4 bg-green-500 py-2 rounded-md">
              Create account
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
