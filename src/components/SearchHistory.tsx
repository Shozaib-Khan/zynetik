import React from 'react';
import { motion } from 'framer-motion';

interface SearchHistoryProps {
  history: string[];
  onSelect: (city: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => {
  return (
    <div className="mt-4">
      <div className="text-sm text-gray-400 mb-2">Recent Searches:</div>
      <div className="flex flex-wrap gap-2">
        {history.map((city, index) => (
          <motion.button
            key={`${city}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(city)}
            className="px-3 py-1 bg-gray-700 bg-opacity-50 rounded-full text-sm text-gray-200 hover:bg-opacity-70 transition-colors"
          >
            {city}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;