import { useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, User, Mail, Calendar } from 'lucide-react';

const AuthTest = () => {
    const { currentUser, login, signup, logout, resetPassword } = useAuth();
    const [testResults, setTestResults] = useState<{[key: string]: 'pass' | 'fail' | 'pending'}>({});
    const [testEmail] = useState('test@example.com');
    const [testPassword] = useState('testpassword123');
    const [testName] = useState('Test User');

    const runTest = async (testName: string, testFunction: () => Promise<void>) => {
        setTestResults(prev => ({ ...prev, [testName]: 'pending' }));
        try {
            await testFunction();
            setTestResults(prev => ({ ...prev, [testName]: 'pass' }));
        } catch (error) {
            console.error(`${testName} failed:`, error);
            setTestResults(prev => ({ ...prev, [testName]: 'fail' }));
        }
    };

    const tests = [
        {
            name: 'Context Available',
            description: 'Check if AuthContext is properly initialized',
            test: async () => {
                if (!useAuth) throw new Error('AuthContext not available');
                if (typeof login !== 'function') throw new Error('Login function not available');
                if (typeof signup !== 'function') throw new Error('Signup function not available');
                if (typeof logout !== 'function') throw new Error('Logout function not available');
            }
        },
        {
            name: 'Firebase Config',
            description: 'Verify Firebase configuration is loaded',
            test: async () => {
                const { auth } = await import('../../config/firebase');
                if (!auth) throw new Error('Firebase auth not initialized');
                if (!auth.app) throw new Error('Firebase app not initialized');
            }
        },
        {
            name: 'Email Signup',
            description: 'Test email/password signup functionality',
            test: async () => {
                try {
                    await signup(testEmail, testPassword, testName);
                } catch (error: any) {
                    if (error.code === 'auth/invalid-api-key' || error.message.includes('API key')) {
                        throw new Error('Demo config detected - replace with real Firebase credentials');
                    }
                    throw error;
                }
            }
        },
        {
            name: 'Password Reset',
            description: 'Test password reset email functionality',
            test: async () => {
                try {
                    await resetPassword(testEmail);
                } catch (error: any) {
                    if (error.code === 'auth/invalid-api-key' || error.message.includes('API key')) {
                        throw new Error('Demo config detected - replace with real Firebase credentials');
                    }
                    throw error;
                }
            }
        },
        {
            name: 'Google Provider',
            description: 'Test Google authentication provider setup',
            test: async () => {
                const { googleProvider } = await import('../../config/firebase');
                if (!googleProvider) throw new Error('Google provider not initialized');
                if (googleProvider.providerId !== 'google.com') throw new Error('Invalid Google provider');
            }
        },
        {
            name: 'GitHub Provider',
            description: 'Test GitHub authentication provider setup',
            test: async () => {
                const { githubProvider } = await import('../../config/firebase');
                if (!githubProvider) throw new Error('GitHub provider not initialized');
                if (githubProvider.providerId !== 'github.com') throw new Error('Invalid GitHub provider');
            }
        }
    ];

    const runAllTests = async () => {
        for (const test of tests) {
            await runTest(test.name, test.test);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    const getStatusIcon = (status: 'pass' | 'fail' | 'pending' | undefined) => {
        switch (status) {
            case 'pass': return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'fail': return <XCircle className="w-5 h-5 text-red-400" />;
            case 'pending': return <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />;
            default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusColor = (status: 'pass' | 'fail' | 'pending' | undefined) => {
        switch (status) {
            case 'pass': return 'border-green-500/20 bg-green-500/10';
            case 'fail': return 'border-red-500/20 bg-red-500/10';
            case 'pending': return 'border-yellow-500/20 bg-yellow-500/10';
            default: return 'border-white/10 bg-white/5';
        }
    };

    return (
        <div className="min-h-screen bg-netflix-dark-gray text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">Firebase Auth Test Suite</h1>
                    <p className="text-white/60 mb-6">Verify your Firebase authentication implementation</p>
                    
                    {currentUser ? (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-6">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <User className="w-8 h-8 text-green-400" />
                                <h2 className="text-2xl font-semibold text-green-400">User Authenticated</h2>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{currentUser.displayName || 'No display name'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>{currentUser.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Since {currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime).getFullYear() : 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-semibold text-red-400">No User Authenticated</h2>
                            <p className="text-white/60 mt-2">User should be redirected to login page</p>
                        </div>
                    )}

                    <button
                        onClick={runAllTests}
                        className="bg-netflix-red hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                    >
                        Run All Tests
                    </button>
                </div>

                <div className="grid gap-4">
                    {tests.map((test, index) => (
                        <motion.div
                            key={test.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 rounded-xl border transition-all duration-200 ${
                                getStatusColor(testResults[test.name])
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-semibold">{test.name}</h3>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(testResults[test.name])}
                                    <button
                                        onClick={() => runTest(test.name, test.test)}
                                        className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors"
                                    >
                                        Test
                                    </button>
                                </div>
                            </div>
                            <p className="text-white/60">{test.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Setup Instructions</h3>
                    <div className="space-y-2 text-sm text-white/80">
                        <p>1. Create a Firebase project at <a href="https://console.firebase.google.com" className="text-netflix-red hover:underline">console.firebase.google.com</a></p>
                        <p>2. Enable Authentication with Email/Password, Google, and GitHub providers</p>
                        <p>3. Replace the demo config in <code className="bg-white/10 px-2 py-1 rounded">src/config/firebase.ts</code> with your project credentials</p>
                        <p>4. Update your domain in Firebase Auth settings for production</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthTest;