import React from 'react';
import { Shield, FileText, AlertTriangle, Mail, Scale, CheckCircle } from 'lucide-react';

const CopyrightPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Copyright Policy
        </h1>
        <p className="text-xl text-[var(--text-secondary)]">
          Protecting intellectual property rights and supporting creators on Taleverse.
        </p>
      </div>

      {/* Overview */}
      <div className="mb-12">
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-8">
          <div className="flex items-start">
            <Shield className="h-8 w-8 text-primary-600 mr-4 mt-1" />
            <div>
              <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
                Our Commitment to Copyright Protection
              </h2>
              <p className="text-[var(--text-secondary)] mb-4">
                Taleverse respects the intellectual property rights of creators and complies with the 
                Digital Millennium Copyright Act (DMCA) and other applicable copyright laws.
              </p>
              <p className="text-[var(--text-secondary)]">
                We provide tools and processes to help protect original content while fostering 
                a creative environment for writers and readers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
        
        {/* Creator Rights */}
        <section>
          <div className="flex items-center mb-6">
            <CheckCircle className="h-8 w-8 text-success-500 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Creator Rights and Ownership
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Content, Your Rights
              </h3>
              <div className="bg-success-50 dark:bg-success-900/30 border border-success-200 dark:border-success-800 rounded-lg p-4 mb-4">
                <p className="text-success-800 dark:text-success-200 font-medium">
                  You retain full copyright ownership of all original content you create and publish on Taleverse.
                </p>
              </div>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li>• Automatic copyright protection for original works</li>
                <li>• Blockchain-based proof of authorship and publication date</li>
                <li>• Right to control distribution and licensing</li>
                <li>• Ability to remove content at any time</li>
                <li>• Protection against unauthorized use</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Platform License
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                By publishing content on Taleverse, you grant us a limited, non-exclusive license to:
              </p>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Display your content on the platform</li>
                <li>• Enable readers to access and read your stories</li>
                <li>• Create promotional materials featuring your work</li>
                <li>• Backup and store your content securely</li>
                <li>• Process payments and distribute revenue</li>
              </ul>
              <p className="text-[var(--text-secondary)] mt-4 text-sm">
                This license terminates when you remove your content from the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Copyright Infringement */}
        <section>
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-warning-500 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Copyright Infringement Policy
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Prohibited Activities
              </h3>
              <div className="bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800 rounded-lg p-4 mb-4">
                <p className="text-error-800 dark:text-error-200 font-medium mb-2">
                  The following activities are strictly prohibited:
                </p>
                <ul className="text-error-700 dark:text-error-300 space-y-1">
                  <li>• Publishing content you don't own or have permission to use</li>
                  <li>• Copying stories from other platforms or sources</li>
                  <li>• Using copyrighted characters without authorization</li>
                  <li>• Reproducing substantial portions of existing works</li>
                  <li>• Claiming ownership of others' creative work</li>
                </ul>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Fair Use and Exceptions
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Limited use of copyrighted material may be permitted under fair use doctrine for:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Acceptable Uses</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                    <li>• Brief quotations for commentary</li>
                    <li>• Parody and satirical works</li>
                    <li>• Educational or critical analysis</li>
                    <li>• Transformative creative works</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Guidelines</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                    <li>• Use minimal necessary content</li>
                    <li>• Provide proper attribution</li>
                    <li>• Add substantial original content</li>
                    <li>• Consider market impact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DMCA Process */}
        <section>
          <div className="flex items-center mb-6">
            <Scale className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              DMCA Takedown Process
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Filing a Copyright Complaint
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                If you believe your copyrighted work has been infringed, you may file a DMCA takedown notice 
                containing the following information:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Required Information</h4>
                  <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                    <li>• Your contact information (name, address, phone, email)</li>
                    <li>• Description of the copyrighted work being infringed</li>
                    <li>• URL or location of the infringing content on Taleverse</li>
                    <li>• Statement of good faith belief that use is unauthorized</li>
                    <li>• Statement that information is accurate under penalty of perjury</li>
                    <li>• Your physical or electronic signature</li>
                  </ul>
                </div>
                
                <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4">
                  <h4 className="font-medium text-primary-700 dark:text-primary-300 mb-2">
                    Send DMCA Notices To:
                  </h4>
                  <div className="text-primary-600 dark:text-primary-400 text-sm">
                    <p>Email: dmca@taleverse.com</p>
                    <p>Subject: DMCA Takedown Notice</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Response Process
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Review (24-48 hours)</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      We review the notice for completeness and validity
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Content Removal</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Valid claims result in immediate content removal or access restriction
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">User Notification</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      The content creator is notified of the takedown and reason
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Counter-Notification */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Counter-Notification Process
          </h2>
          
          <div className="card p-6">
            <p className="text-[var(--text-secondary)] mb-4">
              If you believe your content was removed in error, you may file a counter-notification 
              containing:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Required Elements</h4>
                <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                  <li>• Your contact information</li>
                  <li>• Description of removed content</li>
                  <li>• Statement of good faith belief</li>
                  <li>• Consent to jurisdiction</li>
                  <li>• Your signature</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">What Happens Next</h4>
                <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                  <li>• We forward notice to complainant</li>
                  <li>• 10-14 business day waiting period</li>
                  <li>• Content restored if no court action</li>
                  <li>• Account status reviewed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Repeat Infringer Policy */}
        <section>
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Repeat Infringer Policy
          </h2>
          
          <div className="card p-6">
            <div className="bg-warning-50 dark:bg-warning-900/30 border border-warning-200 dark:border-warning-800 rounded-lg p-4 mb-6">
              <p className="text-warning-800 dark:text-warning-200 font-medium">
                Taleverse will terminate accounts of users who repeatedly infringe copyright.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Strike System</h4>
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  <li>• <strong>First Strike:</strong> Warning and content removal</li>
                  <li>• <strong>Second Strike:</strong> Temporary account suspension</li>
                  <li>• <strong>Third Strike:</strong> Permanent account termination</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Appeals Process</h4>
                <p className="text-[var(--text-secondary)] text-sm">
                  Users may appeal strikes through our formal review process. Successful appeals 
                  result in strike removal and content restoration when appropriate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prevention and Education */}
        <section>
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Copyright Best Practices
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                For Writers
              </h3>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li>• Create original content or obtain proper permissions</li>
                <li>• Document your creative process and sources</li>
                <li>• Use Creative Commons or public domain materials when needed</li>
                <li>• Understand fair use limitations</li>
                <li>• Register important works with copyright office</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                For Readers
              </h3>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li>• Report suspected copyright infringement</li>
                <li>• Respect creators' intellectual property rights</li>
                <li>• Don't share or redistribute copyrighted content</li>
                <li>• Support original creators through platform features</li>
                <li>• Understand the difference between inspiration and copying</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <div className="flex items-center mb-6">
            <Mail className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white m-0">
              Contact Our Copyright Team
            </h2>
          </div>
          
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">DMCA Notices</h4>
                <p className="text-[var(--text-secondary)] text-sm mb-2">dmca@taleverse.com</p>
                <p className="text-[var(--text-secondary)] text-xs">
                  For formal copyright infringement claims
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">General Copyright Questions</h4>
                <p className="text-[var(--text-secondary)] text-sm mb-2">copyright@taleverse.com</p>
                <p className="text-[var(--text-secondary)] text-xs">
                  For questions about copyright policy and best practices
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
              <p className="text-[var(--text-secondary)] text-sm">
                <strong>Response Time:</strong> We typically respond to copyright inquiries within 
                24-48 hours and process valid DMCA notices within 24 hours of receipt.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CopyrightPage;