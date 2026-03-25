import Nav from '../../components/Nav/Nav';
import { User, Settings, Heart, Clock, Download, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const user = {
        name: currentUser?.displayName || 'User',
        email: currentUser?.email || 'user@example.com',
        avatar: currentUser?.photoURL || 'https://imgs.search.brave.com/9Sif716P2JZdFr0lCg1qTRpKQlUFl42lAG606LJ3eL0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzE5Lzc3LzAz/LzM2MF9GXzEyMTk3/NzAzNzZfSlhEWEla/OFZqb1VWNUNQR3RJ/NDZMeGMyRkQ4UUc5/aDUuanBn',
        memberSince: new Date(currentUser?.metadata?.creationTime || Date.now()).getFullYear().toString()
    };

    const menuItems = [
        { icon: User, label: 'Account Settings', description: 'Manage your account details' },
        { icon: Heart, label: 'My List', description: 'Your saved movies and shows' },
        { icon: Clock, label: 'Watch History', description: 'Recently watched content' },
        { icon: Download, label: 'Downloads', description: 'Offline content' },
        { icon: Settings, label: 'App Settings', description: 'Preferences and settings' },
    ];

    return (
        <div className="min-h-screen bg-netflix-dark-gray text-white">
            <Nav />
            <div className="pt-20 md:pt-24 pb-20 md:pb-0">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-netflix-red/20"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-netflix-red rounded-full p-2">
                                <User className="w-6 h-6" />
                            </div>
                        </div>
                        
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                            <p className="text-white/70 text-lg mb-2">{user.email}</p>
                            <p className="text-white/50">Member since {user.memberSince}</p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="grid gap-4">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className="flex items-center gap-4 p-6 bg-black/30 rounded-lg hover:bg-black/50 transition-all duration-200 group"
                            >
                                <div className="p-3 bg-netflix-red/20 rounded-full group-hover:bg-netflix-red/30 transition-colors">
                                    <item.icon className="w-6 h-6 text-netflix-red" />
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="text-xl font-semibold mb-1">{item.label}</h3>
                                    <p className="text-white/60">{item.description}</p>
                                </div>
                                <div className="text-white/40 group-hover:text-white/60 transition-colors">
                                    →
                                </div>
                            </button>
                        ))}
                        
                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-4 p-6 bg-red-900/20 rounded-lg hover:bg-red-900/30 transition-all duration-200 group mt-4"
                        >
                            <div className="p-3 bg-red-500/20 rounded-full group-hover:bg-red-500/30 transition-colors">
                                <LogOut className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="text-xl font-semibold mb-1 text-red-400">Sign Out</h3>
                                <p className="text-white/60">Sign out of your account</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;