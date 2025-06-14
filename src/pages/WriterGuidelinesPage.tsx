import React from 'react';
import { BookOpen, CheckCircle, AlertTriangle, Star, Users, Shield } from 'lucide-react';

const WriterGuidelinesPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Writer Guidelines
        </h1>
        <p className="text-xl text-[var(--text-secondary)]">
          Everything you need to know to create compelling content and build a successful presence on Taleverse.
        </p>
      </div>

      {/* Content Guidelines */}
      <div className="space-y-12">
        <section>
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
              Content Standards
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-success-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">What We Encourage</h3>
              </div>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li>• Original, creative storytelling</li>
                <li>• Well-developed characters and plots</li>
                <li>• Proper grammar and spelling</li>
                <li>• Engaging chapter titles and descriptions</li>
                <li>• Interactive elements and reader engagement</li>
                <li>• Diverse perspectives and inclusive narratives</li>
                <li>• Regular publishing schedules</li>
                <li>• Community interaction and feedback</li>
              </ul>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-warning-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Content Restrictions</h3>
              </div>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li>• No plagiarized or copyrighted content</li>
                <li>• No explicit sexual content involving minors</li>
                <li>• No hate speech or discriminatory content</li>
                <li>• No graphic violence without proper warnings</li>
                <li>• No spam or promotional content</li>
                <li>• No misleading or false information</li>
                <li>• No content that violates local laws</li>
                <li>• No AI-generated content without disclosure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Publishing Best Practices */}
        <section>
          <div className="flex items-center mb-6">
            <Star className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
              Publishing Best Practices
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Story Structure & Format
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Chapter Organization</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Keep chapters between 1,500-3,000 words</li>
                    <li>• Use descriptive chapter titles</li>
                    <li>• End chapters with hooks or cliffhangers</li>
                    <li>• Maintain consistent pacing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Formatting Guidelines</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Use proper paragraph breaks</li>
                    <li>• Include dialogue formatting</li>
                    <li>• Add scene transitions clearly</li>
                    <li>• Use italics for emphasis sparingly</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Metadata & Discovery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Title & Description</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Create compelling, searchable titles</li>
                    <li>• Write engaging story descriptions</li>
                    <li>• Include relevant keywords naturally</li>
                    <li>• Mention target audience and themes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tags & Categories</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Choose accurate genre classifications</li>
                    <li>• Add relevant content warnings</li>
                    <li>• Use appropriate age ratings</li>
                    <li>• Include mood and theme tags</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Engagement */}
        <section>
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
              Community Engagement
            </h2>
          </div>
          
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Building Your Audience
                </h3>
                <ul className="space-y-3 text-[var(--text-secondary)]">
                  <li>• Respond to reader comments promptly</li>
                  <li>• Participate in community discussions</li>
                  <li>• Share writing tips and insights</li>
                  <li>• Collaborate with other writers</li>
                  <li>• Host Q&A sessions with readers</li>
                  <li>• Create engaging social media content</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Reader Interaction
                </h3>
                <ul className="space-y-3 text-[var(--text-secondary)]">
                  <li>• Ask for feedback on story direction</li>
                  <li>• Create polls for character decisions</li>
                  <li>• Share behind-the-scenes content</li>
                  <li>• Acknowledge loyal readers</li>
                  <li>• Respond to constructive criticism gracefully</li>
                  <li>• Build anticipation for upcoming chapters</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Monetization Guidelines */}
        <section>
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
              Monetization & Rights
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Revenue Sharing Model
              </h3>
              <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4 mb-4">
                <p className="text-primary-700 dark:text-primary-300 font-medium">
                  Writers keep 85% of all revenue from story sales, tips, and subscriptions.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Pricing Strategies</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Start with competitive pricing</li>
                    <li>• Offer first chapters free as previews</li>
                    <li>• Consider bundle pricing for series</li>
                    <li>• Adjust prices based on reader feedback</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Payment Schedule</h4>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Monthly payments on the 15th</li>
                    <li>• Minimum payout threshold: $10</li>
                    <li>• Multiple payment methods available</li>
                    <li>• Detailed earnings analytics provided</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Intellectual Property Rights
              </h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  <strong className="text-gray-900 dark:text-white">You retain full ownership</strong> of your creative work. 
                  Taleverse only receives a non-exclusive license to display and distribute your content on our platform.
                </p>
                <p>
                  You can remove your content at any time, though readers who have purchased access will retain their reading rights. 
                  We use blockchain technology to provide immutable proof of authorship and publication dates.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">Important:</strong> Ensure you have the right to publish all content you submit. 
                  This includes any quotes, references, or derivative works that might require permissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Review Process */}
        <section>
          <div className="card p-6">
            <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
              Review & Approval Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 dark:text-primary-400 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Submit Content</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Upload your story with proper metadata and formatting
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 dark:text-primary-400 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Review Process</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Our team reviews content within 24 hours for guideline compliance
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 dark:text-primary-400 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Go Live</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Approved content is published and available to readers immediately
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-8">
            <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
              Questions About These Guidelines?
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Our creator support team is here to help you succeed on Taleverse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Contact Creator Support
              </button>
              <button className="btn-secondary">
                Join Writer Community
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WriterGuidelinesPage;