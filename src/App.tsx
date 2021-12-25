import { useState } from "react";
import { RecentRegistrations } from "./RecentRegistrations";
import { DomainCard } from "./DomainCard";

export const App = () => {
  const [name, setName] = useState("");

  return (
    <>
      <div className="w-screen min-h-screen flex flex-col bg-indigo-400 text-indigo-900 pb-40">
        <div className="container mx-auto sm:py-4 md:py-8 lg:py-12">
          <div className="px-4 space-y-8 sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto">
            <div className="space-y-4">
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

              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  event.currentTarget
                    .querySelector<HTMLAnchorElement>("a[href]")
                    ?.click();
                }}
              >
                <div className="-mx-2">
                  <input
                    className="w-full outline-none transition bg-white text-indigo-800 focus:ring-4 focus:ring-indigo-500 rounded-full px-6 py-3 text-2xl sm:text-3xl"
                    placeholder="Search .eth domains"
                    value={name}
                    onChange={(event) => {
                      event.preventDefault();
                      setName(event.currentTarget.value);
                    }}
                    autoFocus
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    minLength={3}
                  />
                </div>

                <DomainCard
                  // Add key to force re-rendering so the data-in-progress doesn't linger
                  key={name}
                  name={name}
                />
              </form>
            </div>

            <RecentRegistrations />
          </div>
        </div>
      </div>
    </>
  );
};
