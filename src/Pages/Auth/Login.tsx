import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/useAuth';

const Login = () => {
    const { login, loginWithGoogle, loginWithGithub, handleRedirectResult } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [rememberMe, setRememberMe] = useState(false);

    // Handle redirect result on mount
    useEffect(() => {
        const checkRedirect = async () => {
            try {
                const result = await handleRedirectResult();
                if (result?.user) navigate('/');
            } catch {
                setErrors({ general: 'Failed to sign in. Please try again.' });
            }
        };
        checkRedirect();
    }, [handleRedirectResult, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        setErrors({});
        
        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (error: unknown) {
            const firebaseError = error as { code?: string };
            setErrors({ 
                general: firebaseError.code === 'auth/invalid-credential' 
                    ? 'Invalid email or password' 
                    : 'Failed to sign in. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: string) => {
        setIsLoading(true);
        try {
            if (provider === 'google') {
                await loginWithGoogle();
            } else if (provider === 'github') {
                await loginWithGithub();
            }
            navigate('/');
        } catch {
            setErrors({ 
                general: `Failed to sign in with ${provider}. Please try again.`
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Netflix Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-login"
            />
            
            {/* Fallback gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-netflix-dark-gray via-black to-netflix-dark-gray">
                <div className="absolute top-20 left-10 w-72 h-72 bg-netflix-red/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-netflix-red/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-netflix-red/5 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 p-6">
                <Link to="/" className="inline-block">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="Netflix Logo"
                        className="h-8 md:h-10"
                    />
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Login Card */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                            <p className="text-white/60">Sign in to continue your journey</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* General Error */}
                            {errors.general && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                                >
                                    <p className="text-red-400 text-sm text-center">{errors.general}</p>
                                </motion.div>
                            )}
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-white/80 text-sm font-medium">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                            errors.email 
                                                ? 'border-red-500 focus:ring-red-500/50' 
                                                : 'border-white/20 focus:border-netflix-red focus:ring-netflix-red/50'
                                        }`}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-sm"
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-white/80 text-sm font-medium">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-12 py-4 bg-white/5 border rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                            errors.password 
                                                ? 'border-red-500 focus:ring-red-500/50' 
                                                : 'border-white/20 focus:border-netflix-red focus:ring-netflix-red/50'
                                        }`}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-sm"
                                    >
                                        {errors.password}
                                    </motion.p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                            rememberMe 
                                                ? 'bg-netflix-red border-netflix-red' 
                                                : 'border-white/20 bg-white/5'
                                        }`}>
                                            {rememberMe && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                    </div>
                                    <span className="text-white/60 text-sm">Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="text-netflix-red hover:text-netflix-red/80 text-sm font-medium transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-netflix-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-netflix-red/25"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-8">
                            <div className="flex-1 h-px bg-white/10"></div>
                            <span className="px-4 text-white/40 text-sm">or continue with</span>
                            <div className="flex-1 h-px bg-white/10"></div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSocialLogin('google')}
                                className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="text-white/80 text-sm font-medium">Google</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSocialLogin('github')}
                                className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200"
                            >
                                <Github className="w-5 h-5 text-white/60" />
                                <span className="text-white/80 text-sm font-medium">GitHub</span>
                            </motion.button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center mt-8">
                            <p className="text-white/60">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-netflix-red hover:text-netflix-red/80 font-medium transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;