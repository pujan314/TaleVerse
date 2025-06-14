import React from 'react';
import { Shield, Eye, Lock, Database, Globe, UserCheck } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Last updated: December 6, 2024
        </p>
        <p className="text-xl text-[var(--text-secondary)] mt-4">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
      </div>

      {/* Quick Overview */}
      <div className="mb-12">
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Privacy at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-primary-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Data Protection</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  We use industry-standard encryption and security measures
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Eye className="h-6 w-6 text-primary-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Transparency</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Clear information about what data we collect and why
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <UserCheck className="h-6 w-6 text-primary-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Your Control</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  You can access, modify, or delete your data anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
        
        {/* Information We Collect */}
        <section>
          <div className="flex items-center mb-6">
            <Database className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Information We Collect
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Information
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Email address (required for account creation)</li>
                <li>• Username and display name</li>
                <li>• Profile picture and bio (optional)</li>
                <li>• Password (encrypted and never stored in plain text)</li>
                <li>• Account preferences and settings</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Content and Activity Data
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Stories, comments, and other content you create</li>
                <li>• Reading history and progress</li>
                <li>• Quiz results and scores</li>
                <li>• Community interactions and messages</li>
                <li>• Token transactions and wallet activity</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Technical Information
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• IP address and device information</li>
                <li>• Browser type and version</li>
                <li>• Operating system and screen resolution</li>
                <li>• Usage patterns and feature interactions</li>
                <li>• Performance and error logs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section>
          <div className="flex items-center mb-6">
            <Lock className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              How We Use Your Information
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Platform Operations
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Provide and maintain our services</li>
                <li>• Process transactions and payments</li>
                <li>• Authenticate users and prevent fraud</li>
                <li>• Provide customer support</li>
                <li>• Ensure platform security and stability</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Personalization & Improvement
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Recommend relevant content</li>
                <li>• Customize your experience</li>
                <li>• Analyze usage patterns</li>
                <li>• Improve our features and services</li>
                <li>• Develop new functionality</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Information Sharing */}
        <section>
          <div className="flex items-center mb-6">
            <Globe className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Information Sharing
            </h2>
          </div>
          
          <div className="card p-6">
            <div className="bg-success-50 dark:bg-success-900/30 border border-success-200 dark:border-success-800 rounded-lg p-4 mb-6">
              <p className="text-success-800 dark:text-success-200 font-medium">
                We do not sell, rent, or trade your personal information to third parties.
              </p>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Limited Sharing Scenarios
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Service Providers</h4>
                <p className="text-[var(--text-secondary)]">
                  We may share data with trusted service providers who help us operate the platform 
                  (hosting, payment processing, analytics). These providers are bound by strict 
                  confidentiality agreements.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Legal Requirements</h4>
                <p className="text-[var(--text-secondary)]">
                  We may disclose information when required by law, court order, or to protect 
                  the rights, property, or safety of Taleverse, our users, or others.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Business Transfers</h4>
                <p className="text-[var(--text-secondary)]">
                  In the event of a merger, acquisition, or sale of assets, user information 
                  may be transferred as part of the transaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Data Security
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Technical Safeguards
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• End-to-end encryption for sensitive data</li>
                <li>• Secure HTTPS connections</li>
                <li>• Regular security audits and testing</li>
                <li>• Multi-factor authentication options</li>
                <li>• Automated threat detection</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Operational Security
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Limited employee access to user data</li>
                <li>• Regular staff security training</li>
                <li>• Incident response procedures</li>
                <li>• Data backup and recovery systems</li>
                <li>• Compliance with industry standards</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Your Privacy Rights
          </h2>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Access and Control
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Data Access</h4>
                  <p className="text-[var(--text-secondary)] text-sm">
                    Request a copy of all personal data we have about you
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Data Correction</h4>
                  <p className="text-[var(--text-secondary)] text-sm">
                    Update or correct inaccurate information in your profile
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Data Deletion</h4>
                  <p className="text-[var(--text-secondary)] text-sm">
                    Request deletion of your account and associated data
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Data Portability</h4>
                  <p className="text-[var(--text-secondary)] text-sm">
                    Export your data in a machine-readable format
                  </p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Communication Preferences
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                You can control what communications you receive from us:
              </p>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Marketing emails and newsletters</li>
                <li>• Platform notifications and updates</li>
                <li>• Community activity alerts</li>
                <li>• Security and account notifications (required)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cookies and Tracking */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Cookies and Tracking
          </h2>
          
          <div className="card p-6">
            <p className="text-[var(--text-secondary)] mb-6">
              We use cookies and similar technologies to enhance your experience and analyze platform usage.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Essential Cookies</h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  Required for basic platform functionality and security
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Analytics Cookies</h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  Help us understand how users interact with our platform
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Preference Cookies</h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  Remember your settings and personalization choices
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h2>
          
          <div className="card p-6">
            <p className="text-[var(--text-secondary)] mb-6">
              If you have questions about this Privacy Policy or want to exercise your privacy rights, 
              please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Email</h4>
                <p className="text-[var(--text-secondary)]">privacy@taleverse.com</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Response Time</h4>
                <p className="text-[var(--text-secondary)]">Within 30 days for privacy requests</p>
              </div>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section>
          <div className="bg-warning-50 dark:bg-warning-900/30 border border-warning-200 dark:border-warning-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-warning-800 dark:text-warning-200 mb-2">
              Policy Updates
            </h3>
            <p className="text-warning-700 dark:text-warning-300">
              We may update this Privacy Policy from time to time. We'll notify you of significant 
              changes via email or platform notification. Your continued use of Taleverse after 
              changes take effect constitutes acceptance of the updated policy.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;