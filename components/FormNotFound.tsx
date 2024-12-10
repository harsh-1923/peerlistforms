"use client";

import React from "react";
import { ArrowUpRight, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const FormNotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden relative border border-gray-200 shadow-sm bg-white my-10"
    >
      <div className="w-full h-12 flex items-center justify-between py-3 px-4 ">
        <p className="text-emerald-600 text-sm font-semibold">Peerlist Forms</p>
        <ArrowUpRight className="w-4 h-4 text-gray-400" />
      </div>

      <div className="p-6 space-y-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full h-20 bg-gray-50 rounded-md origin-left"
        ></motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-3/4 h-10 bg-gray-50 rounded-md origin-left"
        ></motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-1/2 h-4 bg-gray-50 rounded-md origin-left"
        ></motion.div>
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-white/90"></div>

      <div className="absolute bottom-0 left-0 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center justify-end"
        >
          <ClipboardList className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2 italic font-instrumentserif">
            No Forms Found
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            It looks like you haven't created any forms yet.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FormNotFound;
