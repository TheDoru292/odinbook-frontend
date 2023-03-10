import Link from "next/link";

export default function MainPagePost({ openPost, user }) {
  return (
    <div className="flex flex-col rounded-xl gap-3 bg-stone-800 px-4 py-3">
      <div className="flex gap-2">
        <Link href={`/profile/${user?.url_handle}`}>
          <img
            src={`${user?.profile_picture_url}`}
            className="w-9 h-9 rounded-full"
            alt=""
          />
        </Link>
        <button
          onClick={() => openPost(true)}
          className="text-start px-4 w-full bg-stone-700 rounded-2xl"
        >
          What's on your mind, {user?.username}?
        </button>
      </div>
    </div>
  );
}
