import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          {isCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </button>
      </div>
      <div className={`transition-all duration-300 ${isCollapsed ? 'h-0 overflow-hidden' : 'h-auto'}`}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleCard;