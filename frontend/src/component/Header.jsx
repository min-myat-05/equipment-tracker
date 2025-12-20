export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 shadow-md">
      <div className="max-w-full mx-auto flex items-center justify-between px-6 py-3">
        <div className="text-sm font-semibold text-gray-800">
          Department Equipment Tracker
        </div>

        <div>
          <button
            type="button"
            className="text-sm px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
