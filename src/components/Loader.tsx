import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <motion.div
        className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default Loader;