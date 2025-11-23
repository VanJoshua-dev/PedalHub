import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const zoomVariants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.7, opacity: 0 }
};

function AddProductModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute z-[99999] top-0 left-0 w-full h-full flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-96 h-60 bg-gray-800 text-white text-2xl p-5 rounded-lg flex flex-col"
            variants={zoomVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex-1">Hello</div>

            <button
              onClick={onClose}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 mt-auto"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddProductModal;
