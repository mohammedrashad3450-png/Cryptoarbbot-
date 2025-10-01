```jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState('');
  const [uploadedProof, setUploadedProof] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [stats, setStats] = useState({ investors: 0, activePlans: 0, payouts: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [showFullAddress, setShowFullAddress] = useState({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Animated counter effect
  useEffect(() => {
    let investorsCount = 0;
    let activePlansCount = 0;
    let payoutsCount = 0;
    
    const timer = setInterval(() => {
      if (investorsCount < 12847) investorsCount += 50;
      if (activePlansCount < 5892) activePlansCount += 20;
      if (payoutsCount < 8.7) payoutsCount += 0.05;
      
      setStats({
        investors: Math.min(investorsCount, 12847),
        activePlans: Math.min(activePlansCount, 5892),
        payouts: Math.min(payoutsCount, 8.7)
      });
      
      if (investorsCount >= 12847 && activePlansCount >= 5892 && payoutsCount >= 8.7) {
        clearInterval(timer);
      }
    }, 20);
    
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text, addressType) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(addressType);
    setTimeout(() => setCopiedAddress(''), 2000);
  };

  const toggleAddressVisibility = (addressType) => {
    setShowFullAddress(prev => ({
      ...prev,
      [addressType]: !prev[addressType]
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      setUploadedFile(file);
      setPaymentStatus('pending');
      setUploadedProof(true);
      
      // Simulate verification process
      setTimeout(() => {
        setPaymentStatus('verified');
        setTimeout(() => {
          setPaymentStatus('completed');
        }, 3000);
      }, 5000);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Message sent! Our support team will contact you within 1 hour.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const investmentPlans = [
    {
      id: 1,
      name: 'Base Plan',
      duration: '45 min â€“ 1 hr',
      returnMultiplier: '3Ã—',
      tiers: [
        { amount: 50, return: 150 },
        { amount: 100, return: 300 },
        { amount: 200, return: 600 },
        { amount: 350, return: 1050 },
        { amount: 500, return: 1500 }
      ],
      notes: 'Fastest returns, perfect for beginners. Minimum deposit: $50. Processing time: Under 1 hour.',
      bonus: '',
      color: 'from-blue-500 to-cyan-500',
      minDeposit: 50
    },
    {
      id: 2,
      name: 'Silver Plan',
      duration: '6 â€“ 8 hrs',
      returnMultiplier: '5Ã—',
      tiers: [
        { amount: 500, return: 2500 },
        { amount: 1000, return: 5000 },
        { amount: 2500, return: 12500 },
        { amount: 5000, return: 25000 },
        { amount: 10000, return: 50000 }
      ],
      notes: 'Minimum deposit: $500. Processing time: 6-8 hours.',
      bonus: '15% bonus after 3 purchases',
      color: 'from-gray-400 to-gray-600',
      minDeposit: 500
    },
    {
      id: 3,
      name: 'Golden Plan',
      duration: '20 â€“ 30 days',
      returnMultiplier: '10Ã—',
      tiers: [
        { amount: 50000, return: 500000 },
        { amount: 100000, return: 1000000 }
      ],
      notes: 'Minimum deposit: $50,000. Processing time: 20-30 days.',
      bonus: '25% bonus after 1 purchase',
      color: 'from-yellow-400 to-yellow-600',
      minDeposit: 50000
    }
  ];

  const paymentMethods = [
    {
      name: 'USDT (TRC20)',
      address: 'TKNUswMU6iK9H8Y7txxJaEVP6WtMi8AJi4',
      qrCode: 'https://placehold.co/150x150/1e293b/ffffff?text=USDT+TRC20+QR',
      type: 'usdt_trc20'
    },
    {
      name: 'USDT (ERC20)',
      address: '0xe89e7b4307904be7b00202741733ffa0f478a7c1',
      qrCode: 'https://placehold.co/150x150/1e293b/ffffff?text=USDT+ERC20+QR',
      type: 'usdt_erc20'
    },
    {
      name: 'USDT (BEP20)',
      address: '0xe89e7b4307904be7b00202741733ffa0f478a7c1',
      qrCode: 'https://placehold.co/150x150/1e293b/ffffff?text=USDT+BEP20+QR',
      type: 'usdt_bep20'
    },
    {
      name: 'BNB (Smart Chain)',
      address: '0xe89e7b4307904be7b00202741733ffa0f478a7c1',
      qrCode: 'https://placehold.co/150x150/1e293b/ffffff?text=BNB+QR',
      type: 'bnb'
    },
    {
      name: 'Bitcoin (BTC)',
      address: '1JEEicvwaD9LZy92DkHZt4NR4ESZucfKrn',
      qrCode: 'https://placehold.co/150x150/1e293b/ffffff?text=BTC+QR',
      type: 'btc'
    }
  ];

  const faqs = [
    {
      question: 'How long until I get paid?',
      answer: 'Base Plan: 45 min - 1 hour, Silver Plan: 6-8 hours, Golden Plan: 20-30 days after investment confirmation. All payments are processed automatically upon completion of the investment period.'
    },
    {
      question: 'How are bonuses applied?',
      answer: 'Bonuses are automatically calculated and added to your account balance. For the Silver Plan, you receive a 15% bonus after completing 3 purchases. For the Golden Plan, you receive a 25% bonus after your first purchase. Bonus amounts are paid out with your returns.'
    },
    {
      question: 'What if I send the wrong chain?',
      answer: 'Always double-check you are sending to the correct chain (TRC20 vs ERC20 vs BEP20). Transactions sent on the wrong chain may result in permanent loss of funds. If you make this mistake, contact our support team immediately with your transaction details. We will do our best to assist, but recovery is not guaranteed.'
    },
    {
      question: 'What are the withdrawal rules?',
      answer: 'Withdrawals are processed automatically once your investment period ends. Minimum withdrawal amount is $50. There are no withdrawal fees. Processing time is typically under 1 hour for Base and Silver Plans, and within 24 hours for Golden Plan returns.'
    },
    {
      question: 'Are there KYC requirements?',
      answer: 'No KYC is required for investments under $10,000. For investments of $10,000 or more, basic identity verification is required for security and compliance purposes. This helps protect your account and ensures regulatory compliance.'
    },
    {
      question: 'What is your refund policy?',
      answer: 'Due to the nature of crypto arbitrage trading, all investments are final and non-refundable once confirmed and processed. The arbitrage bot begins executing trades immediately upon receiving your investment, making refunds impossible. Please invest only what you can afford to lose.'
    },
    {
      question: 'Is my investment secure?',
      answer: 'Yes, we employ military-grade security measures including multi-signature cold storage wallets, regular security audits, and advanced encryption protocols. 95% of funds are kept in cold storage, and all transactions require multiple approvals.'
    },
    {
      question: 'Can I reinvest my returns?',
      answer: 'Absolutely! You can reinvest your returns immediately after they are credited to your account. Many of our successful investors compound their returns by reinvesting in higher-tier plans.'
    }
  ];

  const Navigation = () => (
    <nav className="bg-gray-900 dark:bg-gray-800 shadow-lg fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold text-white">CryptoArbBot</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {['home', 'dashboard', 'payment', 'contact', 'about', 'faq'].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 ${
                  activePage === page
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              {darkMode ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            {['home', 'dashboard', 'payment', 'contact', 'about', 'faq'].map((page) => (
              <button
                key={page}
                onClick={() => {
                  setActivePage(page);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 ${
                  activePage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-800 dark:via-blue-800 dark:to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full mb-4 animate-pulse">TRUSTED SINCE 2021</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Invest in Our Trusted 24/7 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Crypto Arbitrage Bot</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8 font-light">Fast. Secure. Transparent.</p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
            Our advanced arbitrage bot operates 24/7 across multiple exchanges to capture price differences and generate consistent returns for our investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => setActivePage('dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              View Investment Plans
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-all hover:scale-105"
            >
              Contact Support
            </button>
          </div>
          
          {/* Stats Strip */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Total Investors', value: stats.investors, suffix: '+', icon: 'ðŸ‘¥' },
                { label: 'Active Plans', value: stats.activePlans, suffix: '+', icon: 'ðŸ“ˆ' },
                { label: 'Total Payouts', value: stats.payouts, suffix: 'M+', icon: 'ðŸ’°' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex justify-center">
                    <span className="mr-2">{stat.icon}</span>
                    <span>{typeof stat.value === 'number' ? stat.value.toLocaleString(undefined, {maximumFractionDigits: 1}) : stat.value}</span>
                    <span className="text-blue-400 ml-1">{stat.suffix}</span>
                  </div>
                  <div className="text-blue-200 font-medium text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Our Arbitrage Bot?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of automated crypto trading with our advanced, secure, and profitable arbitrage system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '24/7 Automated Trading',
                description: 'Our bot never sleeps, constantly scanning 50+ exchanges for profitable arbitrage opportunities.',
                icon: (
                  <svg className="h-12 w-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Military-Grade Security',
                description: 'Your funds are protected with multi-signature wallets, cold storage, and regular security audits.',
                icon: (
                  <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: 'Transparent & Verifiable',
                description: 'Track every trade and profit in real-time with our transparent dashboard and transaction history.',
                icon: (
                  <svg className="h-12 w-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const DashboardPage = () => (
    <div className="pt-16 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Investment Plans</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Choose the plan that fits your investment goals</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {investmentPlans.map((plan) => (
            <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {plan.returnMultiplier} Return
                  </span>
                </div>
                
                <div className="flex items-center mb-4">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{plan.duration}</span>
                </div>
                
                {plan.bonus && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg mb-6">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">âœ¨ {plan.bonus}</p>
                  </div>
                )}
                
                <div className="space-y-4 mb-8">
                  {plan.tiers.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <span className="font-semibold text-gray-900 dark:text-white">${tier.amount.toLocaleString()}</span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">â†’ ${tier.return.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl mb-8">
                  <p className="text-sm text-blue-700 dark:text-blue-300">{plan.notes}</p>
                </div>
                
                <button
                  onClick={() => {
                    setCurrentPlan(plan);
                    setActivePage('payment');
                  }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  Select {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-2xl">
          <div className="flex items-start">
            <svg className="h-8 w-8 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-xl font-bold mb-3">Important Risk Disclaimer</h3>
              <p className="text-lg">
                Crypto investments are high-risk. Past returns are not guarantees of future performance. 
                Only invest what you can afford to lose. Our arbitrage bot aims to minimize risk through diversification and automated risk management, 
                but market conditions can change rapidly. Please read our full Terms & Conditions before investing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentPage = () => (
    <div className="pt-16 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Payment Methods</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Securely fund your investment</p>
        </div>
        
        {currentPlan && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl mb-12 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Selected Plan: {currentPlan.name}</h3>
                <p className="text-blue-100">Duration: {currentPlan.duration} â€¢ Return: {currentPlan.returnMultiplier}</p>
                <p className="text-blue-100">Minimum Deposit: ${currentPlan.minDeposit.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold">Active Selection</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {paymentMethods.map((method, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{method.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(method.address, method.type)}
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedAddress === method.type ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => toggleAddressVisibility(method.type)}
                    className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    title={showFullAddress[method.type] ? "Hide address" : "Show full address"}
                  >
                    {showFullAddress[method.type] ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mb-6 font-mono text-sm break-all">
                {showFullAddress[method.type] ? method.address : `${method.address.slice(0, 10)}...${method.address.slice(-8)}`}
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <img src={method.qrCode} alt={`${method.name} QR Code`} className="w-40 h-40" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-8 rounded-2xl mb-12 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Payment Instructions</h3>
          <ol className="list-decimal list-inside space-y-3 text-lg">
            <li>Make payment to the selected address above (ensure you select the correct chain).</li>
            <li>Take a screenshot of the transaction receipt with transaction hash visible.</li>
            <li>Upload the screenshot via the form below or email it to <strong>support@cryptoarb-bot.com</strong>.</li>
          </ol>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-2xl mb-12 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Security Tips</h3>
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li><strong>Always confirm you're using the correct chain</strong> (TRC20 vs ERC20 vs BEP20). Sending on the wrong chain may result in permanent loss of funds.</li>
            <li><strong>Ensure you have sufficient funds to cover transaction fees.</strong> Network congestion can increase fees unexpectedly.</li>
            <li><strong>Double-check addresses before sending</strong> - crypto transactions are irreversible. Verify at least the first and last 5 characters.</li>
            <li><strong>Never share your private keys or passwords</strong> with anyone, including our support team.</li>
            <li><strong>Bookmark our official website</strong> to avoid phishing sites. Official domain: cryptoarb-bot.com</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Upload Transaction Proof</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Transaction Screenshot (JPG, PNG, GIF - Max 5MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-base text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-xl file:border-0
                  file:text-base file:font-semibold
                  file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white
                  hover:file:from-blue-600 hover:file:to-purple-700
                  transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Email Address (for confirmation)
              </label>
              <input
                type="email"
                required
                className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                placeholder="your-email@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              Submit Payment Proof
            </button>
          </form>

          {uploadedProof && (
            <div className="mt-8 p-6 rounded-xl shadow-lg">
              {paymentStatus === 'pending' && (
                <div className="bg-yellow-500 text-white p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 mr-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <div>
                      <h4 className="text-xl font-bold">Payment Verification in Progress</h4>
                      <p className="text-lg">Please wait while we verify your transaction. This typically takes 5-15 minutes.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {paymentStatus === 'verified' && (
                <div className="bg-green-500 text-white p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="text-xl font-bold">Payment Verified!</h4>
                      <p className="text-lg">Your investment has been confirmed. Your returns will be processed according to your selected plan terms.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {paymentStatus === 'completed' && (
                <div className="bg-blue-500 text-white p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-xl font-bold">Investment Activated!</h4>
                      <p className="text-lg">Your arbitrage bot is now actively working on your investment. You can track progress in your dashboard.</p>
                      <p className="text-lg mt-2 font-bold">Next steps: Returns will be automatically sent to your wallet when your investment period ends.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-start">
            <svg className="h-8 w-8 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-2xl font-bold mb-3">Important Risk Disclaimer</h3>
              <p className="text-lg">
                Crypto investments are high-risk. Past returns are not guarantees of future performance. 
                Only invest what you can afford to lose. Our arbitrage bot aims to minimize risk through diversification and automated risk management, 
                but market conditions can change rapidly. Please read our full Terms & Conditions before investing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="pt-16 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Contact Support</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Our team is here to help you 24/7</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a message</h2>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Message *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                ></textarea>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Attachment (optional, Max 5MB)</label>
                <input
                  type="file"
                  className="block w-full text-base text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-3 file:px-6
                    file:rounded-xl file:border-0
                    file:text-base file:font-semibold
                    file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white
                    hover:file:from-blue-600 hover:file:to-purple-700
                    transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">24/7 Live Chat Support</h3>
              <p className="text-lg mb-6">Chat with our support team anytime for immediate assistance.</p>
              <button className="w-full py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg">
                Start Live Chat Now
              </button>
              <p className="text-green-100 text-sm mt-4">Average response time: 2 minutes</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Email Support</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">support@cryptoarb-bot.com</p>
                  <p className="text-gray-600 dark:text-gray-300">For account and investment inquiries</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Response time: Within 1 hour, 24/7</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">business@cryptoarb-bot.com</p>
                  <p className="text-gray-600 dark:text-gray-300">For partnership and business inquiries</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Response time: Within 24 hours</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Join Our Community</h3>
              <div className="space-y-4">
                {[
                  { name: 'Telegram', icon: 'ðŸ“±', members: '15,842 members', link: '#' },
                  { name: 'WhatsApp', icon: 'ðŸ’¬', members: '8,927 members', link: '#' },
                  { name: 'Discord', icon: 'ðŸŽ®', members: '23,561 members', link: '#' },
                  { name: 'Twitter', icon: 'ðŸ¦', members: '42,389 followers', link: '#' }
                ].map((channel, index) => (
                  <a
                    key={index}
                    href={channel.link}
                    className="block w-full text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">{channel.icon}</span>
                        <div className="text-left">
                          <span className="font-bold text-gray-900 dark:text-white">{channel.name}</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{channel.members}</p>
                        </div>
                      </div>
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Security Notice</h3>
              <p className="text-lg mb-4">
                Our support team will NEVER ask for your private keys, passwords, or seed phrases. 
                Be cautious of phishing attempts and always verify official communication channels.
              </p>
              <div className="bg-red-700 p-4 rounded-lg">
                <p className="font-bold text-lg">Official domains:</p>
                <p className="text-white">â€¢ cryptoarb-bot.com</p>
                <p className="text-white">â€¢ app.cryptoarb-bot.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="pt-16 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">About Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Learn about our mission, technology, and team</p>
        </div>
        
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-2xl shadow-xl mb-8">
            <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
            <p className="text-xl mb-6">
              To democratize access to sophisticated crypto arbitrage strategies, making them available to everyone regardless of technical expertise or investment size.
            </p>
            <p className="text-xl">
              We believe in transparency, security, and consistent returns through advanced algorithmic trading that operates 24/7 without human emotion or error.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Transparency',
                description: 'Every trade and profit is recorded and available for you to verify.',
                icon: 'ðŸ”'
              },
              {
                title: 'Security',
                description: 'Military-grade encryption and multi-signature wallets protect your funds.',
                icon: 'ðŸ”’'
              },
              {
                title: 'Reliability',
                description: '99.9% uptime with redundant systems ensuring continuous operation.',
                icon: 'âš¡'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center border border-gray-100 dark:border-gray-700">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">How Our Arbitrage Bot Works</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                Crypto arbitrage involves buying an asset on one exchange where the price is lower and simultaneously selling it on another exchange where the price is higher. Our bot automates this process across dozens of exchanges and trading pairs.
              </p>
              <p className="text-lg mb-6">
                The bot uses sophisticated algorithms to identify profitable opportunities while accounting for transaction fees, slippage, and market depth. Risk management is built into every trade with stop-loss mechanisms and position sizing based on market volatility.
              </p>
              <p className="text-lg mb-6">
                Unlike manual trading, our bot operates 24/7 without fatigue, emotion, or human error, capturing opportunities that would be impossible for individual traders to identify and execute.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-blue-800 dark:text-blue-200 mb-3">Technical Highlights:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>â€¢ Real-time price monitoring across 50+ exchanges</li>
                  <li>â€¢ Automated trade execution with millisecond precision</li>
                  <li>â€¢ Dynamic risk management and position sizing</li>
                  <li>â€¢ Multi-chain support for various cryptocurrencies</li>
                  <li>â€¢ Transparent profit tracking and reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Security & Compliance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Wallet Security</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multi-signature cold storage for 95% of funds
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Regular security audits and penetration testing
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  2FA required for all administrative access
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Automated withdrawal limits and approval processes
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Compliance</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Regular third-party security audits
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  KYC for large investments (>$10,000)
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Transparent transaction records
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Regular financial reporting
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: 'Alex Chen',
                role: 'Founder & CEO',
                bio: '10+ years in fintech and algorithmic trading, former Wall Street quant',
                image: 'https://placehold.co/300x300/3b82f6/ffffff?text=AC'
              },
              {
                name: 'Maria Rodriguez',
                role: 'CTO',
                bio: 'Blockchain security expert, former exchange engineer with 8 years experience',
                image: 'https://placehold.co/300x300/8b5cf6/ffffff?text=MR'
              },
              {
                name: 'James Wilson',
                role: 'Head of Trading',
                bio: 'Quantitative analyst with Wall Street background, specializes in arbitrage strategies',
                image: 'https://placehold.co/300x300/06b6d4/ffffff?text=JW'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-center border border-gray-100 dark:border-gray-700">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" />
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-4 font-medium">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Third-Party Audits</h3>
            <p className="text-lg mb-4">
              Our smart contracts and security infrastructure have been audited by leading blockchain security firms. 
              Audit reports are available upon request for serious investors.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold">CertiK Audited</span>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold">Hacken Verified</span>
              <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold">2024 Security Certified</span>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Sarah K.',
                investment: '5,000',
                return: '25,000',
                testimonial: 'I started with the Silver Plan and was amazed by the consistent returns. The 15% bonus after my third investment was the cherry on top! This has truly changed my financial situation.',
                image: 'https://placehold.co/100x100/f59e0b/ffffff?text=SK'
              },
              {
                name: 'Michael T.',
                investment: '500',
                return: '1,500',
                testimonial: 'The Base Plan is perfect for testing the waters. I made my first return in under an hour and have been reinvesting ever since. The platform is incredibly user-friendly and transparent.',
                image: 'https://placehold.co/100x100/10b981/ffffff?text=MT'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-blue-600 dark:text-blue-400">
                      Investment: ${testimonial.investment} â†’ Return: ${testimonial.return}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg italic">"{testimonial.testimonial}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-start">
            <svg className="h-8 w-8 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-2xl font-bold mb-3">Important Risk Disclaimer</h3>
              <p className="text-lg">
                Crypto investments are high-risk. Past returns are not guarantees of future performance. 
                Only invest what you can afford to lose. Our arbitrage bot aims to minimize risk through diversification and automated risk management, 
                but market conditions can change rapidly. Please read our full Terms & Conditions before investing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FAQPage = () => (
    <div className="pt-16 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Find answers to common questions</p>
        </div>
        
        <div className="space-y-8 mb-16">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-2xl shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-xl mb-8">
            Our support team is available 24/7 to help with any questions you may have.
          </p>
          <button
            onClick={() => setActivePage('contact')}
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-gray-900 dark:bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="ml-3 text-2xl font-bold">CryptoArbBot</span>
            </div>
            <p className="text-gray-400 mb-6 text-lg">
              Trusted 24/7 crypto arbitrage bot delivering consistent returns through automated trading strategies since 2021.
            </p>
            <div className="flex space-x-4">
              {['Telegram', 'Twitter', 'Discord', 'Facebook'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                  {social.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['home', 'dashboard', 'payment', 'contact', 'about', 'faq'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setActivePage(page)}
                    className="text-gray-400 hover:text-white transition-colors text-lg capitalize hover:translate-x-1 transition-transform"
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-lg hover:translate-x-1 transition-transform">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-lg hover:translate-x-1 transition-transform">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-lg hover:translate-x-1 transition-transform">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-lg hover:translate-x-1 transition-transform">Disclaimer</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@cryptoarb-bot.com
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <p className="text-gray-400 text-lg mb-4 md:mb-0">
              Â© 2024 CryptoArbBot. All rights reserved. SSL Secured â€¢ GDPR Compliant
            </p>
            <div className="flex space-x-6">
              <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-bold">SSL SECURED</span>
              <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold">GDPR COMPLIANT</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl">
            <p className="text-red-100 text-center text-sm md:text-base">
              <strong>Important Risk Disclaimer:</strong> Crypto investments are high-risk. Past returns are not guarantees of future performance. 
              Only invest what you can afford to lose. Our arbitrage bot aims to minimize risk through diversification and automated risk management, 
              but market conditions can change rapidly. Please read our full Terms & Conditions before investing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'payment':
        return <PaymentPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FAQPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
      <Navigation />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;
```
