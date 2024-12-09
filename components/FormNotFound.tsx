import React from "react";
import TopRightArrow from "./icons/TopRightArrow";

const FormNotFound = () => {
  return (
    <div className="w-full aspect-square rounded-lg overflow-hidden relative border-[1px] border-gray-200 select-none my-10">
      <div className="w-full h-10 flex items-center justify-between py-3 px-4">
        <p className="text-[#00aa45] text-sm font-semibold">Peerlist Forms</p>
        <TopRightArrow />
      </div>

      <div className="w-3/4 h-20 bg-gray-50 mx-auto mb-2 rounded-md"></div>
      <div className="w-3/4 h-10 bg-gray-50 mx-auto mb-2 rounded-md"></div>
      <div className="w-3/4 h-4 bg-gray-50 mx-auto mb-2 rounded-md"></div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-gray-50/40"></div>
      <div className="absolute bottom-0 left-0 flex items-center justify-center w-full pb-6 font-[500] font-instrument-serif italic font-serif">
        No Forms found
      </div>
    </div>
  );
};

export default FormNotFound;
