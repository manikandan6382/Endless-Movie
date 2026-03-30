import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/useAuth";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsEmailSent(true);
    } catch (error: unknown) {
      const firebaseError = error as { code?: string };
      let errorMessage = "Failed to send reset email. Please try again.";
      if (firebaseError.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address.";
      } else if (firebaseError.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await resetPassword(email);
    } catch (error: unknown) {
      console.error("Failed to resend email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Netflix Background */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-login" />

        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-netflix-dark-gray via-black to-netflix-dark-gray">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-netflix-red/5 rounded-full blur-3xl"></div>
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

        {/* Success Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-400" />
              </motion.div>

              <h1 className="text-2xl font-bold text-white mb-4">
                Check Your Email
              </h1>
              <p className="text-white/60 mb-2">
                We've sent a password reset link to:
              </p>
              <p className="text-netflix-red font-medium mb-6">{email}</p>

              <div className="space-y-4">
                <p className="text-white/50 text-sm">
                  Didn't receive the email? Check your spam folder or
                </p>

                <motion.button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                  ) : (
                    "Resend Email"
                  )}
                </motion.button>

                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 text-netflix-red hover:text-netflix-red/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Netflix Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd6/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg')`,
        }}
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
          {/* Forgot Password Card */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Forgot Password?
              </h1>
              <p className="text-white/60">
                No worries! Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      error
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-white/20 focus:border-netflix-red focus:ring-netflix-red/50"
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
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
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-8">
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-white font-medium mb-2">Need help?</h3>
              <p className="text-white/60 text-sm">
                If you're still having trouble, contact our support team at{" "}
                <a
                  href="mailto:support@manikandan.dev"
                  className="text-netflix-red hover:text-netflix-red/80 transition-colors"
                >
                  support@manikandan.dev
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
