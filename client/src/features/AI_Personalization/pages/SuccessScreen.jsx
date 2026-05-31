/**
 * Success Screen Component
 * Displays after session creation with personalization link
 * 
 * Architectural Decision:
 * - Separate component for reusability
 * - Copy-to-clipboard functionality
 * - Clear call-to-action button
 * - Tailwind classes for styling
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessScreen({ sessionData }) {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(sessionData.personalizationLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handlePersonalizeNow = () => {
        const token = sessionData.personalizationLink.split('token=')[1];
        navigate(`/personalize-now?token=${token}`);
    };

    return (
        <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <div className="card">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold gradient-text">
                            Session Created!
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Your personalization session for{' '}
                            <span className="font-semibold text-gray-900">{sessionData.productSku}</span> is ready
                        </p>
                    </div>

                    {/* Success Alert */}
                    <div className="alert alert-success mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <strong className="block">Success!</strong>
                                <span>A confirmation email has been sent to {sessionData.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Link Section */}
                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                            Your Personalization Link:
                        </p>

                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
                            <code className="text-sm text-primary-600 break-all">
                                {sessionData.personalizationLink}
                            </code>
                        </div>

                        <button
                            onClick={handleCopyLink}
                            className="btn-secondary w-full mb-4"
                        >
                            <div className="flex items-center justify-center gap-2">
                                {copied ? (
                                    <>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy Link
                                    </>
                                )}
                            </div>
                        </button>

                        <button
                            onClick={handlePersonalizeNow}
                            className="btn-primary w-full"
                        >
                            <div className="flex items-center justify-center gap-2">
                                Personalize Now
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    {/* Create Another Link */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                        >
                            ← Create another session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessScreen;