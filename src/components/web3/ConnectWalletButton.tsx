import React from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import WalletButton from './WalletButton';
import { useAuth } from '../../contexts/AuthContext';

const ConnectWalletButton = () => {
  const { isConnected } = useAccount();
  const { isLoggedIn } = useAuth();

  // If user is logged in, show wallet connection
  if (isLoggedIn) {
    return <WalletButton />;
  }

  // If not logged in, show sign in button
  return (
    <Link
      to="/login"
      className="btn-primary flex items-center space-x-2"
    >
      <span>Sign In</span>
    </Link>
  );
};

export default ConnectWalletButton;