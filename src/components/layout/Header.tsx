import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li><Link to="/announcements" className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-200">Duyurular</Link></li>
          <li><Link to="/lectures" className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-200">Dersler</Link></li>
          <li><Link to="/research" className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-200">Araştırmalar</Link></li>
          <li><Link to="/projects" className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-200">Projeler</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

