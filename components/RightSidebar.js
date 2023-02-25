export default function RightSidebar({ friends }) {
  return (
    <div
      style={{ height: "calc(100vh - 64px)", top: "62px" }}
      className="w-[320px] sticky flex flex-col pr-2"
    >
      <div className="p-2">
        <p className="font-bold text-lg">Contacts</p>
      </div>
      {friends.map((item) => {
        return (
          <div className="px-2 py-2 rounded-lg flex items-center gap-3 hover:bg-stone-800">
            <div className="w-9 h-9 bg-red-400 rounded-full"></div>
            <p className="text-gray-300">{item.user}</p>
          </div>
        );
      })}
    </div>
  );
}
