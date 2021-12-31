export const Header = () => (
  <div className="flex flex-wrap justify-between items-end">
    <div className="text-xl text-white font-semibold bg-indigo-500 px-3 py-1 rounded-b-xl sm:rounded-t-xl">
      ENS Ideas 🤔
    </div>
    <div className="text-indigo-700">
      by{" "}
      <a
        href="https://twitter.com/frolic"
        target="_blank"
        rel="noreferrer"
        className="font-bold text-indigo-900 hover:underline"
      >
        frolic.eth
      </a>
    </div>
  </div>
);
