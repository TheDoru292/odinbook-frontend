import Header from "@/components/Header";
import Head from "next/head";

export default function Friend() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Friends - Odin-Book</title>
      </Head>
      <Header currentPage="friends" />
      <main className="text-stone-200 flex flex-grow h-100 bg-stone-900">
        <div
          style={{ height: "100vh", top: "62px" }}
          className="sticky h-100 w-2/12 py-2 px-3 bg-stone-800 flex flex-col gap-2"
        >
          <div>
            <h2 className="text-xl font-bold">Friends</h2>
          </div>
          <div>
            <div className="bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <div className="w-9 h-9 bg-red-400 rounded-full"></div>
              <p className="self-center">Home</p>
            </div>
            <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <div className="w-9 h-9 bg-red-400 rounded-full"></div>
              <p className="self-center">Friend requests</p>
            </div>
            <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <div className="w-9 h-9 bg-red-400 rounded-full"></div>
              <p className="self-center">Suggestions</p>
            </div>
            <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <div className="w-9 h-9 bg-red-400 rounded-full"></div>
              <p className="self-center">All friends</p>
            </div>
            <div className="hover:bg-stone-700 px-2 py-2 rounded-lg flex gap-4">
              <div className="w-9 h-9 bg-red-400 rounded-full"></div>
              <p className="self-center">Birthdays</p>
            </div>
          </div>
        </div>
        <div className="w-9/12 flex flex-col gap-6 flex-grow px-6 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">Outgoing Friend Requests</h2>
            </div>
            <div className="flex">
              <div>
                <div className="border-x border-t border-stone-700 w-48 h-48 bg-red-400 rounded-t-xl "></div>
                <div className="border-x border-b border-stone-700 p-3 bg-stone-800 flex gap-4 flex-col rounded-b-xl">
                  <p className="font-bold">User2</p>
                  <div className="flex flex-col gap-2">
                    <button className="py-1 bg-sky-600 rounded-md">
                      Confirm
                    </button>
                    <button className="py-1 bg-stone-700 rounded-md">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold pt-6">Friend Requests</h2>
              <div className="flex">
                <div>
                  <div className="border-x border-t border-stone-700 w-48 h-48 bg-red-400 rounded-t-xl "></div>
                  <div className="border-x border-b border-stone-700 p-3 bg-stone-800 flex gap-4 flex-col rounded-b-xl">
                    <p className="font-bold">User2</p>
                    <div className="flex flex-col gap-2">
                      <button className="py-1 bg-sky-600 rounded-md">
                        Confirm
                      </button>
                      <button className="py-1 bg-stone-700 rounded-md">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl pt-6">You may know</h2>
              <div className="flex">
                <div>
                  <div className="border-x border-t border-stone-700 w-48 h-48 bg-red-400 rounded-t-xl "></div>
                  <div className="border-x border-b border-stone-700 p-3 bg-stone-800 flex gap-4 flex-col rounded-b-xl">
                    <p className="font-bold">User2</p>
                    <div className="flex flex-col gap-2">
                      <button className="py-1 bg-sky-600 rounded-md">
                        Confirm
                      </button>
                      <button className="py-1 bg-stone-700 rounded-md">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
