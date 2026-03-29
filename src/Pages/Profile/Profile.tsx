import Nav from "../../components/Nav/Nav";
import { User, Settings, Heart, Clock, Download, LogOut, CreditCard, Camera } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useWatchlist } from "../../hooks/useWatchlist";

const DEFAULT_AVATAR = "https://imgs.search.brave.com/9Sif716P2JZdFr0lCg1qTRpKQlUFl42lAG606LJ3eL0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzE5Lzc3LzAz/LzM2MF9GXzEyMTk3/NzAzNzZfSlhEWEla/OFZqb1VWNUNQR3RJ/NDZMeGMyRkQ4UUc5/aDUuanBn";

const Profile = () => {
  const { currentUser, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { watchlist } = useWatchlist();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setUploading(true);

    try {
      // Resize to 200x200 before uploading
      const img = new Image();
      img.src = localUrl;
      await new Promise(res => { img.onload = res; });

      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      canvas.getContext('2d')!.drawImage(img, 0, 0, 200, 200);

      const blob = await new Promise<Blob>(res =>
        canvas.toBlob(b => res(b!), 'image/jpeg', 0.8)
      );

      const formData = new FormData();
      formData.append('file', blob, 'avatar.jpg');
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'netflix-avatars');

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      if (!data.secure_url || !data.secure_url.startsWith('https://res.cloudinary.com/')) 
        throw new Error('Invalid upload response');

      await updateUserProfile(data.secure_url);
      setPreviewUrl(null);
    } catch {
      console.error('Failed to update photo:');
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const avatar = previewUrl || currentUser?.photoURL || DEFAULT_AVATAR;
  const name = currentUser?.displayName || "User";
  const email = currentUser?.email || "";
  const memberSince = new Date(currentUser?.metadata?.creationTime || Date.now()).getFullYear();

  const menuItems = [
    { icon: CreditCard, label: "Subscription", description: "Manage your plan", onClick: () => navigate("/subscription") },
    { icon: User, label: "Account Settings", description: "Manage your account details", onClick: () => {} },
    { icon: Heart, label: `My List (${watchlist.length})`, description: "Your saved movies and shows", onClick: () => navigate('/my-list') },
    { icon: Clock, label: "Watch History", description: "Recently watched content", onClick: () => {} },
    { icon: Download, label: "Downloads", description: "Offline content", onClick: () => {} },
    { icon: Settings, label: "App Settings", description: "Preferences and settings", onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-netflix-dark-gray text-white">
      <Nav />
      <div className="pt-20 md:pt-24 pb-20 lg:pb-5">
        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
            <div className="relative">
              <img
                src={avatar}
                alt={name}
                className="w-32 h-32 rounded-full object-cover border-4 border-netflix-red/20"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-2 -right-2 bg-netflix-red rounded-full p-2 hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {uploading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Camera className="w-5 h-5" />
                }
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{name}</h1>
              <p className="text-white/70 text-lg mb-2">{email}</p>
              <p className="text-white/50">Member since {memberSince}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="flex items-center gap-4 p-6 bg-black/30 rounded-lg hover:bg-black/50 transition-all duration-200 group"
              >
                <div className="p-3 bg-netflix-red/20 rounded-full group-hover:bg-netflix-red/30 transition-colors">
                  <item.icon className="w-6 h-6 text-netflix-red" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-semibold mb-1">{item.label}</h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
                <div className="text-white/40 group-hover:text-white/60 transition-colors">→</div>
              </button>
            ))}

            {/* Logout */}<button
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
