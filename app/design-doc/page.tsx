import React from "react";

const page = () => {
  return (
    <div className="w-full h-full space-y-4  text-black relative">
      <div className="h-[var(--top-bar-height)] border-b border-gray-200 bg-white p-6 pt-4 sticky top-0  z-10 drop-shadow-sm">
        <h1 className="text-xl font-medium mark-effect">Design Doc</h1>
      </div>
      <div className="h-full w-full space-y-6 p-6 z-[-1]">
        <p className="">
          This page is a brief of the design choices I made while creating the
          Form Builder from the Figma File.
        </p>

        <p>
          The overall goal of the project was to build a{" "}
          <mark className="mark-effect">Functional Form Builder.</mark> It was
          an interesting thing to take up as I never had the chance to build one
          for myself.
        </p>

        <ul className="space-y-4 text-base">
          <li className="flex gap-3">
            <span className="text-black/80">-</span>
            <div>
              <span className="font-semibold">Form Builder: </span>
              <span className="">
                Lets us add, delete and reorder questions with some standard
                validation. One can save the form as{" "}
                <span className="mark-effect mark-yellow">
                  Draft or Published.
                </span>
              </span>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-black/80">-</span>
            <div>
              <span className="font-semibold ">Form Previewer: </span>
              <span className="">
                A quick preview of how the form should look for users.
              </span>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-black/80">-</span>
            <div>
              <span className="font-semibold ">Form Responses: </span>
              <span className="">
                Lets us check the responses recieved for any form created. We
                can also delete a response. This serves as the dashboard for
                admins.
              </span>
            </div>
          </li>
        </ul>

        <p>
          For the purposes of this assessment, I am using{" "}
          <mark className="mark-effect mark-pink font-semibold">
            Local Storage as my database.
          </mark>{" "}
          Local storage seemed like a nice fallback option as it prevents the
          need for authentication while also giving a personalised feel for the
          purposes of the demo. However, the same could be replaced easily with
          another database service by modifying the methods.
        </p>

        {/* <div className="space-y-3">
          <h2 className="font-semibold text-lg">Technical Details:</h2>
          <ul className="space-y-4 text-base">
            <li className="flex gap-3">
              <span className="text-black/80">-</span>
              <div>
                <span className="font-semibold">Stack: </span>
                <span className="">
                  The App is build using Nextjs 15 and the App Router
                </span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-black/80">-</span>
              <div>
                <span className="font-semibold ">Form Previewer: </span>
                <span className="">
                  A quick preview of how the form should look for users.
                </span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-black/80">-</span>
              <div>
                <span className="font-semibold ">Form Responses: </span>
                <span className="">
                  Lets us check the responses recieved for any form created. We
                  can also delete a response. This serves as the dashboard for
                  admins.
                </span>
              </div>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default page;
