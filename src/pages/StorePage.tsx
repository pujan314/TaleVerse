import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, Sparkles, TrendingUp, Shield, Check, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/ui/Toaster';
import clsx from '../utils/clsx';

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  bonus: number;
  popular?: boolean;
  accent: string;
}

const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    tokens: 100,
    price: 4.99,
    bonus: 0,
    accent: 'from-sky-500 to-sky-600',
  },
  {
    id: 'reader',
    name: 'Reader Pack',
    tokens: 500,
    price: 19.99,
    bonus: 25,
    popular: true,
    accent: 'from-primary-500 to-primary-700',
  },
  {
    id: 'enthusiast',
    name: 'Enthusiast Pack',
    tokens: 1200,
    price: 39.99,
    bonus: 100,
    accent: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'patron',
    name: 'Patron Pack',
    tokens: 3000,
    price: 89.99,
    bonus: 400,
    accent: 'from-amber-500 to-amber-600',
  },
];

const FEATURE_LIST = [
  'Unlock premium novels and exclusive chapters',
  'Tip your favorite authors directly',
  'No hidden fees — tokens never expire',
  'Instant delivery to your account',
];

const StorePage = () => {
  const { user, isLoggedIn, updateUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [purchased, setPurchased] = useState<string | null>(null);

  const handlePurchase = async (pkg: TokenPackage) => {
    if (!isLoggedIn || !user) {
      addToast('Please sign in to buy tokens.', 'info');
      navigate('/login');
      return;
    }

    setPurchasing(pkg.id);
    try {
      const totalTokens = pkg.tokens + pkg.bonus;
      const newBalance = (user.tokens || 0) + totalTokens;

      const { error } = await supabase
        .from('profiles')
        .update({ tokens: newBalance })
        .eq('id', user.id);

      if (error) throw error;

      updateUser({ tokens: newBalance });
      setPurchased(pkg.id);
      addToast(`You bought ${totalTokens} TALE tokens.`, 'success');
      setTimeout(() => setPurchased(null), 2200);
    } catch (err) {
      console.error('Purchase failed:', err);
      addToast('Purchase failed. Please try again.', 'error');
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 mb-4">
          <Coins className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          Buy TALE Tokens
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Top up your wallet to unlock novels, tip writers, and support the Taleverse community.
        </p>
      </div>

      {/* Balance card */}
      {isLoggedIn && user && (
        <div className="card p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Your balance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.tokens || 0} <span className="text-primary-600 text-base font-medium">TALE</span>
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] text-center sm:text-right">
            Tokens are credited instantly after purchase.
          </p>
        </div>
      )}

      {/* Packages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {TOKEN_PACKAGES.map((pkg) => {
          const total = pkg.tokens + pkg.bonus;
          const isPurchased = purchased === pkg.id;
          const isPurchasing = purchasing === pkg.id;

          return (
            <div
              key={pkg.id}
              className={clsx(
                'relative card p-6 flex flex-col transition-all duration-300',
                pkg.popular
                  ? 'ring-2 ring-primary-500 shadow-lg scale-[1.02]'
                  : 'hover:shadow-lg hover:-translate-y-1',
                isPurchased && 'ring-2 ring-success-500'
              )}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-600 whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <div className={clsx('w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center mb-4', pkg.accent)}>
                <Coins className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{pkg.name}</h3>

              <div className="mt-3 mb-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{total.toLocaleString()}</span>
                <span className="ml-2 text-sm text-[var(--text-secondary)]">TALE</span>
              </div>

              {pkg.bonus > 0 && (
                <p className="text-sm text-success-600 dark:text-success-400 mb-2">
                  Includes {pkg.bonus} bonus tokens
                </p>
              )}

              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ${pkg.price.toFixed(2)}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                ${(pkg.price / total).toFixed(4)} per token
              </p>

              <button
                onClick={() => handlePurchase(pkg)}
                disabled={isPurchasing || isPurchased}
                className={clsx(
                  'mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all',
                  isPurchased
                    ? 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-200'
                    : pkg.popular
                      ? 'btn-primary'
                      : 'btn-secondary',
                  isPurchasing && 'opacity-70 cursor-wait'
                )}
              >
                {isPurchased ? (
                  <>
                    <Check className="h-4 w-4" /> Purchased
                  </>
                ) : isPurchasing ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    Processing
                  </>
                ) : !isLoggedIn ? (
                  <>
                    <Lock className="h-4 w-4" /> Sign in to buy
                  </>
                ) : (
                  <>
                    Buy now <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Why buy / features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="card p-6">
          <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Spend on novels</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Unlock premium stories, exclusive chapters, and bonus content from your favorite authors.
          </p>
        </div>
        <div className="card p-6">
          <Sparkles className="h-8 w-8 text-accent-600 dark:text-accent-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tip creators</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Show appreciation directly. Writers keep 100% of tips they receive from readers.
          </p>
        </div>
        <div className="card p-6">
          <Shield className="h-8 w-8 text-success-600 dark:text-success-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Safe & instant</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Tokens are credited to your account immediately and never expire.
          </p>
        </div>
      </div>

      {/* Feature checklist */}
      <div className="card p-8">
        <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-6 text-center">
          What you get
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {FEATURE_LIST.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-success-100 dark:bg-success-900 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-success-600 dark:text-success-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StorePage;
