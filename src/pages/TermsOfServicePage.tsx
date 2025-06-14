import React from 'react';
import { FileText, Users, Shield, Gavel, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Terms of Service
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Last updated: December 6, 2024
        </p>
        <p className="text-xl text-[var(--text-secondary)] mt-4">
          These terms govern your use of Taleverse and outline the rights and responsibilities of all users.
        </p>
      </div>

      {/* Agreement Notice */}
      <div className="mb-12">
        <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-xl p-6">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
                Agreement to Terms
              </h3>
              <p className="text-primary-700 dark:text-primary-300">
                By accessing or using Taleverse, you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access the service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
        
        {/* Platform Description */}
        <section>
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Platform Description
            </h2>
          </div>
          
          <div className="card p-6">
            <p className="text-[var(--text-secondary)] mb-4">
              Taleverse is a Web3-powered storytelling platform that connects readers and writers through:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>• Interactive story reading and publishing tools</li>
              <li>• Comprehension quizzes with token rewards</li>
              <li>• Community features for reader-writer interaction</li>
              <li>• Blockchain-based token economy (TALE tokens)</li>
              <li>• NFT rewards for achievements and milestones</li>
              <li>• Decentralized governance and voting mechanisms</li>
            </ul>
          </div>
        </section>

        {/* User Accounts */}
        <section>
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              User Accounts and Responsibilities
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Creation
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• You must be at least 13 years old to create an account</li>
                <li>• Provide accurate and complete information during registration</li>
                <li>• Maintain the security of your account credentials</li>
                <li>• You are responsible for all activities under your account</li>
                <li>• One person may not maintain multiple accounts</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Security
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Your Responsibilities</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                    <li>• Use strong, unique passwords</li>
                    <li>• Enable two-factor authentication</li>
                    <li>• Keep login credentials confidential</li>
                    <li>• Report suspicious activity immediately</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Our Commitments</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                    <li>• Encrypt sensitive data</li>
                    <li>• Monitor for security threats</li>
                    <li>• Provide security tools and features</li>
                    <li>• Notify you of security incidents</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content and Intellectual Property */}
        <section>
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Content and Intellectual Property
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Content Rights
              </h3>
              <div className="bg-success-50 dark:bg-success-900/30 border border-success-200 dark:border-success-800 rounded-lg p-4 mb-4">
                <p className="text-success-800 dark:text-success-200 font-medium">
                  You retain full ownership of all content you create and publish on Taleverse.
                </p>
              </div>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• You own the copyright to your original stories and content</li>
                <li>• You grant Taleverse a non-exclusive license to display your content</li>
                <li>• You can remove your content at any time</li>
                <li>• Blockchain records provide immutable proof of authorship</li>
                <li>• You're responsible for ensuring you have rights to publish content</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Content Standards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Prohibited Content</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                    <li>• Plagiarized or copyrighted material</li>
                    <li>• Hate speech or discriminatory content</li>
                    <li>• Explicit sexual content involving minors</li>
                    <li>• Spam or misleading information</li>
                    <li>• Content promoting illegal activities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Content Guidelines</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                    <li>• Original, creative storytelling</li>
                    <li>• Proper content warnings when needed</li>
                    <li>• Respectful community interaction</li>
                    <li>• Accurate story descriptions and tags</li>
                    <li>• Professional presentation and formatting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Token Economy */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            TALE Token Economy
          </h2>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Token Usage and Value
              </h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  TALE tokens are utility tokens used within the Taleverse ecosystem. They have no 
                  guaranteed monetary value outside the platform and should not be considered investments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Earning Tokens</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Quiz completion and high scores</li>
                      <li>• Community participation</li>
                      <li>• Content creation and publishing</li>
                      <li>• Platform achievements</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Using Tokens</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Purchase premium content</li>
                      <li>• Tip creators and authors</li>
                      <li>• Access exclusive features</li>
                      <li>• Participate in governance voting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Revenue Sharing
              </h3>
              <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4">
                <p className="text-primary-700 dark:text-primary-300">
                  <strong>Creator Revenue Share:</strong> Writers receive 85% of revenue from story sales. 
                  Taleverse retains 15% to cover platform operations, development, and support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Rules */}
        <section>
          <div className="flex items-center mb-6">
            <Gavel className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Platform Rules and Enforcement
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Community Standards
              </h3>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li>• Treat all community members with respect and dignity</li>
                <li>• Provide constructive feedback and engage in meaningful discussions</li>
                <li>• Respect intellectual property rights and creative ownership</li>
                <li>• Report violations of community guidelines promptly</li>
                <li>• Support creators through fair compensation and recognition</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Enforcement Actions
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-warning-600 dark:text-warning-400 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Warning</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      First-time violations receive a warning with guidance on community standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-warning-600 dark:text-warning-400 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Content Removal</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Violating content may be removed with notification to the creator.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-error-100 dark:bg-error-900 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-error-600 dark:text-error-400 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Account Suspension</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Repeated violations may result in temporary or permanent account suspension.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimers */}
        <section>
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-warning-500 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Disclaimers and Limitations
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Service Availability
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                While we strive for 99.9% uptime, Taleverse is provided "as is" without warranties of any kind. 
                We may experience:
              </p>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Scheduled maintenance and updates</li>
                <li>• Temporary service interruptions</li>
                <li>• Feature changes and improvements</li>
                <li>• Third-party service dependencies</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Financial Disclaimers
              </h3>
              <div className="bg-warning-50 dark:bg-warning-900/30 border border-warning-200 dark:border-warning-800 rounded-lg p-4">
                <ul className="space-y-2 text-warning-800 dark:text-warning-200">
                  <li>• TALE tokens are not investments or securities</li>
                  <li>• Token values may fluctuate and could become worthless</li>
                  <li>• Creator earnings are not guaranteed</li>
                  <li>• Platform fees and policies may change</li>
                  <li>• Blockchain transactions are irreversible</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Account Termination
          </h2>
          
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Voluntary Termination
                </h3>
                <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                  <li>• You may delete your account at any time</li>
                  <li>• Content removal is processed within 30 days</li>
                  <li>• Token balances may be withdrawn before deletion</li>
                  <li>• Some data may be retained for legal compliance</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Involuntary Termination
                </h3>
                <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                  <li>• Accounts may be suspended for violations</li>
                  <li>• Serious violations may result in permanent bans</li>
                  <li>• Appeals process available for disputed actions</li>
                  <li>• Token balances may be forfeited in severe cases</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Changes to Terms
          </h2>
          
          <div className="card p-6">
            <p className="text-[var(--text-secondary)] mb-4">
              We may update these Terms of Service from time to time to reflect changes in our 
              services, legal requirements, or business practices.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Notification Process</h4>
                <ul className="space-y-1 text-[var(--text-secondary)] text-sm">
                  <li>• Email notification for significant changes</li>
                  <li>• Platform announcements for minor updates</li>
                  <li>• 30-day notice period for material changes</li>
                  <li>• Updated terms posted on this page</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Your Options</h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  If you disagree with updated terms, you may discontinue using Taleverse. 
                  Continued use after changes take effect constitutes acceptance of the new terms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Contact Information
          </h2>
          
          <div className="card p-6">
            <p className="text-[var(--text-secondary)] mb-6">
              For questions about these Terms of Service or to report violations, please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Legal Inquiries</h4>
                <p className="text-[var(--text-secondary)]">legal@taleverse.com</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">General Support</h4>
                <p className="text-[var(--text-secondary)]">support@taleverse.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;