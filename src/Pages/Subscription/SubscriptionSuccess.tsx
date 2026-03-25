import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SubscriptionSuccess = () => (
  <div className="min-h-screen bg-netflix-dark-gray text-white flex items-center justify-center px-6">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-md"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-12 h-12 text-green-400" />
      </motion.div>
      <h1 className="text-3xl font-bold mb-4">You're all set!</h1>
      <p className="text-white/60 mb-8">Your subscription is now active. Enjoy watching!</p>
      <Link
        to="/"
        className="bg-netflix-red hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
      >
        Start Watching
      </Link>
    </motion.div>
  </div>
);

export default SubscriptionSuccess;
