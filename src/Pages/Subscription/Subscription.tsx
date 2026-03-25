import { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Nav from '../../components/Nav/Nav';

const plans = [
  {
    name: 'Basic',
    price: '₹199',
    priceId: import.meta.env.VITE_STRIPE_BASIC_PRICE_ID,
    quality: '480p',
    features: ['Watch on 1 device', 'Mobile & Tablet', '480p quality', 'Cancel anytime'],
  },
  {
    name: 'Standard',
    price: '₹499',
    priceId: import.meta.env.VITE_STRIPE_STANDARD_PRICE_ID,
    quality: '1080p',
    popular: true,
    features: ['Watch on 2 devices', 'TV, Mobile & Tablet', '1080p Full HD', 'Cancel anytime'],
  },
  {
    name: 'Premium',
    price: '₹699',
    priceId: import.meta.env.VITE_STRIPE_PREMIUM_PRICE_ID,
    quality: '4K',
    features: ['Watch on 4 devices', 'All devices', '4K Ultra HD + HDR', 'Cancel anytime'],
  },
];

const Subscription = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planName: string) => {
    setLoadingPlan(planName);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const { url, error: apiError } = await response.json();
      if (apiError) throw new Error(apiError);
      window.location.href = url;
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-netflix-dark-gray text-white">
      <Nav />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-white/60 text-lg">Watch anywhere. Cancel anytime.</p>
          </div>

          {error && (
            <div className="bg-red-600/20 border border-red-600 text-white rounded-lg p-4 max-w-md mx-auto mb-8 text-center">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  plan.popular
                    ? 'border-netflix-red bg-netflix-red/10 scale-105'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-netflix-red text-white text-sm font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
                  <div className="text-4xl font-bold text-netflix-red">{plan.price}</div>
                  <div className="text-white/50 text-sm">per month</div>
                  <div className="text-white/60 mt-1">{plan.quality} quality</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3 text-white/80">
                      <Check className="size-4 text-netflix-red shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan.priceId, plan.name)}
                  disabled={loadingPlan !== null}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.popular
                      ? 'bg-netflix-red hover:bg-red-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {loadingPlan === plan.name ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    `Get ${plan.name}`
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/40 text-sm mt-10">
            Test mode — use card number <span className="text-white/60 font-mono">4242 4242 4242 4242</span>, any future date, any CVC.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
