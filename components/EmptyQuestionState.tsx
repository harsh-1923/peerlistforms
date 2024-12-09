import React from "react";
import { motion } from "motion/react";

const EmptyQuestionState = () => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ y: 10, opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.3 }}
      className="outline-gray-100 outline-[1px] outline w-full p-6 rounded-lg bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/80 z-[1px]"></div>
      <div className="w-2/3 h-4 bg-gray-100 rounded-md mb-4"></div>
      <div className="w-full h-10 bg-gray-100 rounded-md"></div>

      <div className="absolute bottom-0 left-0 w-full p-2 text-center">
        <p className="font-medium text-sm font-serif italic text-brand">
          No questions added yet
        </p>
        <p className="font-medium text-xs font-serif italic text-gray-500">
          Create a form and share with the world
        </p>
      </div>
    </motion.div>
  );
};

export default EmptyQuestionState;
