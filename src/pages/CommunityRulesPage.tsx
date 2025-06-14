import React from 'react';
import { Users, Shield, Heart, AlertTriangle, CheckCircle, MessageCircle } from 'lucide-react';

const CommunityRulesPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Community Rules
        </h1>
        <p className="text-xl text-[var(--text-secondary)]">
          Guidelines for creating a welcoming, respectful, and engaging community for all Taleverse members.
        </p>
      </div>

      {/* Core Principles */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Heart className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
            Our Core Values
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
            <p className="text-[var(--text-secondary)]">
              We welcome creators and readers from all backgrounds, cultures, and perspectives.
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Respect</h3>
            <p className="text-[var(--text-secondary)]">
              Treat all community members with dignity, kindness, and understanding.
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <MessageCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Constructive Dialogue</h3>
            <p className="text-[var(--text-secondary)]">
              Engage in meaningful conversations that help our community grow and learn.
            </p>
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="space-y-12">
        <section>
          <div className="flex items-center mb-6">
            <CheckCircle className="h-8 w-8 text-success-500 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
              Expected Behavior
            </h2>
          </div>
          
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  In Discussions & Comments
                </h3>
                <ul className="space-y-3 text-[var(--text-secondary)]">
                  <li>• Provide constructive feedback on stories</li>
                  <li>• Ask thoughtful questions about plot and characters</li>
                  <li>• Share your reading experience respectfully</li>
                  <li>• Support fellow readers and writers</li>
                  <li>• Use content warnings when discussing sensitive topics</li>
                  <li>• Stay on topic in discussion threads</li>
                  <li>• Fact-check information before sharing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  When Interacting with Creators
                </h3>
                <ul className="space-y-3 text-[var(--text-secondary)]">
                  <li>• Appreciate the time and effort writers invest</li>
                  <li>• Offer specific, actionable feedback</li>
                  <li>• Respect creative choices and artistic vision</li>
                  <li>• Support creators through tips and purchases</li>
                  <li>• Be patient with publishing schedules</li>
                  <li>• Celebrate achievements and milestones</li>
                  <li>• Recommend stories to other readers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-warning-500 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
              Prohibited Behavior
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Harassment & Discrimination
              </h3>
              <div className="bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800 rounded-lg p-4">
                <p className="text-error-800 dark:text-error-200 font-medium mb-2">
                  Zero tolerance for:
                </p>
                <ul className="text-error-700 dark:text-error-300 space-y-1">
                  <li>• Personal attacks or insults</li>
                  <li>• Discrimination based on race, gender, religion, sexuality, or other protected characteristics</li>
                  <li>• Doxxing or sharing personal information without consent</li>
                  <li>• Stalking or persistent unwanted contact</li>
                  <li>• Threats of violence or harm</li>
                </ul>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Spam & Misuse
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Content Violations</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Posting irrelevant or off-topic content</li>
                    <li>• Excessive self-promotion</li>
                    <li>• Duplicate or repetitive posts</li>
                    <li>• Misleading or false information</li>
                    <li>• Copyright infringement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Platform Abuse</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Creating multiple accounts to manipulate votes</li>
                    <li>• Artificially inflating engagement metrics</li>
                    <li>• Circumventing bans or suspensions</li>
                    <li>• Exploiting platform features for unintended purposes</li>
                    <li>• Sharing account credentials</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting & Moderation */}
        <section>
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
              Reporting & Moderation
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                How to Report Violations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Reporting Process</h4>
                  <ol className="text-[var(--text-secondary)] space-y-2">
                    <li>1. Click the "Report" button on any content or profile</li>
                    <li>2. Select the appropriate violation category</li>
                    <li>3. Provide specific details about the issue</li>
                    <li>4. Submit additional evidence if available</li>
                    <li>5. Receive confirmation and case number</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">What Happens Next</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Reports reviewed within 24 hours</li>
                    <li>• Automated detection for clear violations</li>
                    <li>• Human review for complex cases</li>
                    <li>• Reporter notified of outcome</li>
                    <li>• Appeals process available</li>
                  </ul>
                </div>
              </div>
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
                      First-time minor violations receive a warning with guidance on community standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-warning-600 dark:text-warning-400 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Temporary Suspension</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Repeated violations or moderate offenses result in 1-7 day suspensions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-error-100 dark:bg-error-900 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-error-600 dark:text-error-400 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Permanent Ban</h4>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Severe violations or repeated offenses result in permanent account termination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appeals Process */}
        <section>
          <div className="card p-6">
            <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
              Appeals Process
            </h2>
            
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                If you believe a moderation action was taken in error, you can appeal the decision within 30 days. 
                Appeals are reviewed by a different moderator than the one who made the original decision.
              </p>
              
              <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4">
                <h3 className="font-medium text-primary-700 dark:text-primary-300 mb-2">
                  To submit an appeal:
                </h3>
                <ol className="text-primary-600 dark:text-primary-400 space-y-1">
                  <li>1. Email appeals@taleverse.com with your case number</li>
                  <li>2. Explain why you believe the action was incorrect</li>
                  <li>3. Provide any additional context or evidence</li>
                  <li>4. Wait for review (typically 3-5 business days)</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
              Help Us Build a Better Community
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Community guidelines evolve with our platform. Share your feedback and suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Contact Community Team
              </button>
              <button className="btn-secondary">
                Suggest Rule Changes
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommunityRulesPage;