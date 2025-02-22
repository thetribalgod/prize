"use client";

import React, { useState, useCallback } from 'react';
import AlertDialog from "@/components/ui/alertdialog";
import Button from "@/components/ui/Button";
import { Wallet, Search, CreditCard, IndianRupee, Trophy, PlayCircle, Pizza, Coffee, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  category: 'money' | 'entertainment' | 'food' | 'shopping';
  brandLogo: string;
}

const RewardsPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'money' | 'entertainment' | 'food' | 'shopping'>('all');

  const rewards: Reward[] = [
    {
      id: 1,
      name: "₹1000 Paytm Cash",
      points: 1000,
      description: "Instant transfer to your Paytm wallet",
      details: "Redeem your points for real cash. Transfer will be processed within 24 hours.",
      icon: Wallet,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      category: 'money',
      brandLogo: "/logos/paytm.svg"
    },
    {
      id: 2,
      name: "₹500 Bank Transfer",
      points: 500,
      description: "Direct bank transfer to your account",
      details: "Instant money transfer to your linked bank account.",
      icon: CreditCard,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      category: 'money',
      brandLogo: "/logos/paytm.svg"
    },
    {
      id: 3,
      name: "₹2000 Paytm Cash",
      points: 2000,
      description: "Maximum value Paytm transfer",
      details: "Get maximum value for your points with this reward.",
      icon: IndianRupee,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      category: 'money',
      brandLogo: "/logos/paytm.svg"
    },
    {
      id: 4,
      name: "Netflix 3 Months 50% Off",
      points: 800,
      description: "Half price Netflix subscription",
      details: "Get 50% off on 3 months of Netflix Premium subscription.",
      icon: PlayCircle,
      color: "bg-gradient-to-br from-red-400 to-red-600",
      category: 'entertainment',
      brandLogo: "/logos/netflix.svg"
    },
    {
      id: 5,
      name: "Hotstar Annual 40% Off",
      points: 600,
      description: "Discount on Hotstar Premium",
      details: "Save 40% on annual Hotstar Premium subscription.",
      icon: PlayCircle,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      category: 'entertainment',
      brandLogo: "/logos/hotstar.svg"
    },
    {
      id: 6,
      name: "Prime Video 6 Months",
      points: 1000,
      description: "Free Amazon Prime Video access",
      details: "6 months of Prime Video streaming service.",
      icon: PlayCircle,
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      category: 'entertainment',
      brandLogo: "/logos/amazon-prime-video.svg"
    },
    {
      id: 7,
      name: "Domino's ₹500 Off",
      points: 400,
      description: "Discount on pizza orders",
      details: "Get ₹500 off on orders above ₹999 at Domino's Pizza.",
      icon: Pizza,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      category: 'food',
      brandLogo: "/logos/dominos.svg"
    },
    {
      id: 8,
      name: "Pizza Hut Buy 1 Get 1",
      points: 500,
      description: "Free pizza with your order",
      details: "Buy any medium pizza and get one free at Pizza Hut.",
      icon: Pizza,
      color: "bg-gradient-to-br from-red-400 to-red-600",
      category: 'food',
      brandLogo: "/logos/pizza.svg"
    },
    {
      id: 9,
      name: "Starbucks ₹300 Gift Card",
      points: 300,
      description: "Coffee rewards card",
      details: "Redeem at any Starbucks outlet in India.",
      icon: Coffee,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      category: 'food',
      brandLogo: "/logos/starbucks.svg"
    },
    {
      id: 10,
      name: "Amazon ₹1000 Voucher",
      points: 900,
      description: "Shopping voucher for Amazon",
      details: "Gift card valid for all products on Amazon India.",
      icon: ShoppingBag,
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      category: 'shopping',
      brandLogo: "/logos/amazon.svg"
    },
  ];

  const handleClaim = useCallback((reward: Reward) => {
    setSelectedReward(reward);
    setShowSuccess(true);
  }, []);

  const filteredRewards = rewards.filter(reward =>
    (activeCategory === 'all' || reward.category === activeCategory) &&
    reward.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RewardCard = useCallback(({ reward }: { reward: Reward }) => {
    const Icon = reward.icon;
    return (
      <div className="group relative bg-white rounded-3xl p-8 hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-2xl border border-gray-100">
        <div className={`absolute top-0 left-0 w-full h-full ${reward.color} opacity-0 rounded-3xl group-hover:opacity-5 transition-opacity duration-300`}></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <Icon className="h-12 w-12 text-green-500 transform group-hover:scale-110 transition-transform duration-300" />
            <div className="h-12 w-12 relative">
              <Image
                src={reward.brandLogo}
                alt={`${reward.name} logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-800">{reward.name}</h3>
          <p className="text-gray-600 mb-4">{reward.description}</p>
          <p className="text-sm text-gray-500 mb-6">{reward.details}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">{reward.points} Points</span>
            <Button
              onClick={() => handleClaim(reward)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transform hover:scale-110 transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
            >
              <span>Redeem Now</span>
              <Trophy className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }, [handleClaim]);

  const CategoryButton = ({ category, label }: { category: typeof activeCategory, label: string }) => (
    <button
      onClick={() => setActiveCategory(category)}
      className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
        activeCategory === category
          ? 'bg-green-500 text-white shadow-lg transform scale-105'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[60vh] overflow-hidden bg-gradient-to-b from-green-50 to-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.15),rgba(255,255,255,0))]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-400 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
        </div>
        <div className="relative max-w-6xl mx-auto pt-20 px-4 flex flex-col items-center text-center">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text animate-fade-in">
            Cash & Premium Rewards
          </h1>
          <p className="text-2xl text-gray-600 mb-8 animate-slide-up">
            Convert your points into real money and exclusive brand offers
          </p>
          <div className="flex gap-4 animate-bounce-in">
            <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6 rounded-full transition-transform hover:scale-105">
              Check Your Points Balance
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <CategoryButton category="all" label="All Rewards" />
          <CategoryButton category="money" label="Cash Rewards" />
          <CategoryButton category="entertainment" label="Entertainment" />
          <CategoryButton category="food" label="Food & Drinks" />
          <CategoryButton category="shopping" label="Shopping" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <main className="max-w-6xl mx-auto py-4 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </main>

      <AlertDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Redemption Successful! 🎉"
        message={
          selectedReward
            ? `You've successfully redeemed ${selectedReward.name} for ${selectedReward.points} points. Check your email for redemption instructions and codes.`
            : ""
        }
      />

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
        .animate-bounce-in {
          animation: bounce-in 1s cubic-bezier(0.36, 0, 0.66, 1) 0.6s both;
        }
      `}</style>
    </div>
  );
};

export default RewardsPage;
