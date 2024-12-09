import React from "react";
import { Drawer } from "vaul";
import FormList from "./FormList";
import Menu from "./icons/Menu";

const IslandTrigger = () => {
  return (
    <div className="t">
      <Drawer.Root direction="left">
        <Drawer.Trigger className="" asChild>
          <button className="p-0 rounded-sm text-gray-500">
            <Menu />
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[5]" />
          <Drawer.Content
            className="left-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="bg-white h-full w-full grow p-4 flex flex-col rounded-[16px]">
              <FormList />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default IslandTrigger;
