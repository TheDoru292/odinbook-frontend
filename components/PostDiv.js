export default function MainPagePost() {
  return (
    <div className="flex flex-col rounded-xl gap-3 bg-stone-800 px-4 py-3">
      <div className="flex gap-2">
        <div className="w-9 h-9 bg-red-400 rounded-full"></div>
        <input
          className="px-2 w-full bg-stone-700 rounded-2xl"
          type="text"
          name="text"
          id="text"
          placeholder="What's on your mind?"
        />
      </div>
      <div className="flex border-t border-stone-700">
        <div>a</div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
