import { useEffect, useRef, useState } from "react";
import "./Nav.css";
import SearchBar from "./SearchBar";
import { Home, MonitorSmartphone, Plus, Popcorn, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

const DEFAULT_AVATAR = "https://imgs.search.brave.com/9Sif716P2JZdFr0lCg1qTRpKQlUFl42lAG606LJ3eL0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzE5Lzc3LzAz/LzM2MF9GXzEyMTk3/NzAzNzZfSlhEWEla/OFZqb1VWNUNQR3RJ/NDZMeGMyRkQ4UUc5/aDUuanBn";

const Nav = () => {
  const [bgScroll, setBgScroll] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const { currentUser } = useAuth();
  const avatar = currentUser?.photoURL || DEFAULT_AVATAR;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 30) {
        setBgScroll(true);
      } else {
        setBgScroll(false);
      }
      if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
        setHidden(true); // scrolling down → hide
      } else {
        setHidden(false); // scrolling up → show
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isSearchActive = location.pathname === "/search";

  return (
    <div className="">
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-250 ease-linear  ${hidden ? "-translate-y-full" : "translate-y-0"} ${bgScroll ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent"}`}
      >
        <div className="flex lg:gap-25 md:gap-15 gap-5 text-white px-6 py-4 text-xl items-center">
          <Link to="/" className="shrink-0">
            <span className="text-netflix-red font-black text-2xl md:text-3xl tracking-widest">ENDLESS</span>
          </Link>

          {/* Desktop Menu */}
          <div className="gap-20 text-[16px] lg:flex hidden">
            <Link
              to="/"
              className={`hover:text-netflix-red transition-colors font-medium ${
                isActive("/") ? "text-white" : "text-white/70"
              }`}
            >
              Home
            </Link>
            <Link
              to="/movie"
              className={`hover:text-netflix-red transition-colors font-medium ${
                isActive("/movie") ? "text-white" : "text-white/70"
              }`}
            >
              Movies
            </Link>
            <Link
              to="/tv"
              className={`hover:text-netflix-red transition-colors font-medium ${
                isActive("/tv") ? "text-white" : "text-white/70"
              }`}
            >
              TV Shows
            </Link>
            <Link
              to="/my-list"
              className={`hover:text-netflix-red transition-colors font-medium flex gap-2 items-center ${
                isActive("/my-list") ? "text-white" : "text-white/70"
              }`}
            >
              My List <Plus className="size-5"/>
            </Link>
          </div>

          {/* Desktop Search & Profile */}
          <div className="flex items-center gap-4 md:ml-auto justify-end grow">
            <div className="hidden md:block flex-1 max-w-md">
              <SearchBar bgScroll={bgScroll} />
            </div>
            <Link to="/profile" className="hidden md:block">
              <img
                src={avatar}
                alt="Profile"
                className="object-cover rounded-full w-8 h-8 hover:ring-2 hover:ring-netflix-red transition-all"
              />
            </Link>
          </div>

          {/* Mobile Profile - Only show on mobile */}
          <Link to="/profile" className="md:hidden ml-auto">
            <img
              src={avatar}
              alt="Profile"
              className={`object-cover rounded-full w-10 h-10 transition-all duration-200 ${
                isActive("/profile")
                  ? "ring-2 ring-netflix-red"
                  : "hover:ring-2 hover:ring-white/30"
              }`}
            />
          </Link>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm lg:hidden">
          <div className="p-4 pt-6">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setShowMobileSearch(false)}
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                ✕
              </button>
              <div className="flex-1">
                <SearchBar bgScroll={true} isMobile={true} onSearch={() => setShowMobileSearch(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="bg-black/95 backdrop-blur-md border-t border-white/10">
          <div className="flex items-center justify-around py-2">
            <Link
              to="/"
              className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
                isActive("/") ? "text-netflix-red" : "text-white/70"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </Link>

            <Link
              to="/movie"
              className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
                isActive("/movie") ? "text-netflix-red" : "text-white/70"
              }`}
            >
              <Popcorn className="w-6 h-6" />
              <span className="text-xs font-medium">Movies</span>
            </Link>

            <Link
              to="/tv"
              className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
                isActive("/tv") ? "text-netflix-red" : "text-white/70"
              }`}
            >
              <MonitorSmartphone className="w-6 h-6" />
              <span className="text-xs font-medium text-nowrap">TV Shows</span>
            </Link>

            <button
              onClick={() => setShowMobileSearch(true)}
              className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
                isSearchActive ? "text-netflix-red" : "text-white/70"
              }`}
            >
              <Search className="w-6 h-6" />
              <span className="text-xs font-medium">Search</span>
            </button>

            <Link
              to="/profile"
              className={`flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
                isActive("/profile") ? "text-netflix-red" : "text-white/70"
              }`}
            >
              <div className="relative">
                <img
                  src={avatar}
                  alt="Profile"
                  className={`w-6 h-6 rounded-full object-cover transition-all ${
                    isActive("/profile") ? "ring-2 ring-netflix-red" : ""
                  }`}
                />
              </div>
              <span className="text-xs font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
