import format from "date-fns/format";

export default function Post({ user, postData, likes, comments }) {
  return (
    <div className="flex gap-2 flex-col rounded-xl bg-stone-800 px-4 py-3">
      <div className="flex gap-2 w-full">
        <div className="w-10 h-10 bg-red-400 rounded-full"></div>
        <div className="flex w-full">
          <div className="flex-grow">
            <p className="text-sm">{user}</p>
            <p className="text-sm text-stone-300">
              {format(postData.posted_on, "dd MMMM yyyy")}
            </p>
          </div>
          <div>
            <button>more</button>
          </div>
        </div>
      </div>
      <div>
        <p>{postData.content}</p>
      </div>
      <div className="flex">
        {likes.count != 0 ? (
          <div className="flex flex-grow items-center gap-1">
            <div className="w-5 h-5 bg-red-400 rounded-full"></div>
            <p>{likes.count} likes</p>
          </div>
        ) : (
          <div></div>
        )}
        {comments.length != 0 ? (
          <div>{comments.length} comments</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex border-y py-1 border-stone-700">
        <button className="hover:bg-stone-600 py-1 rounded-md flex-basis flex-grow">
          Like
        </button>
        <button className="hover:bg-stone-600 py-1 rounded-md flex-basis flex-grow">
          Comment
        </button>
        <button className="hover:bg-stone-600 py-1 rounded-md flex-basis flex-grow">
          Share
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {comments.map((item) => {
          return (
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-red-400 rounded-full"></div>
              <div>
                <div className="flex flex-col bg-stone-700 px-3 py-1 rounded-2xl">
                  <p className="text-xs font-bold">{item.user}</p>
                  <p className="text-sm">{item.content}</p>
                </div>
                <div className="flex gap-3">
                  <p className="text-xs">Like</p>
                  <p className="text-xs">Reply</p>
                  <p className="text-xs">{format(item.commented_on, "mm")}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-red-400 rounded-full"></div>
          <input
            className="w-full bg-stone-700 px-3 rounded-2xl"
            type="text"
            placeholder="Write a comment..."
          />
        </div>
      </div>
    </div>
  );
}
