export default function MainPagePost({ openPost }) {
  return (
    <div className="flex flex-col rounded-xl gap-3 bg-stone-800 px-4 py-3">
      <div className="flex gap-2">
        <div className="w-9 h-9 bg-red-400 rounded-full"></div>
        <button
          onClick={openPost}
          className="text-start px-4 w-full bg-stone-700 rounded-2xl"
        >
          What's on your mind?
        </button>
      </div>
    </div>
  );
}
