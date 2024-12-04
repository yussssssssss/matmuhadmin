import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, FlaskConical, FolderKanban, GraduationCap, Settings, LogOut, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ytuLogo from '../../assets/ytu-logo.png'; // Logonun doğru yolu olduğundan emin olun

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Duyurular', href: '/admin/announcements', icon: FileText },
    { name: 'Araştırmalar', href: '/admin/researches', icon: FlaskConical },
    { name: 'Projeler', href: '/admin/projects', icon: FolderKanban },
    { name: 'Dersler', href: '/admin/lectures', icon: GraduationCap },
    { name: 'Kullanıcılar', href: '/admin/users', icon: Users },
    { name: 'Ayarlar', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 bg-white text-gray-800 flex flex-col items-center rounded-lg">
        <img src={ytuLogo} alt="YTU Logo" className="w-72 h-auto mb-4" />
        <h2 className="text-xl font-bold text-center">
          MATEMATİK MÜHENDİSLİĞİ TOPLULUĞU YÖNETİM PANELİ
        </h2>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium rounded hover:bg-gray-600"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
