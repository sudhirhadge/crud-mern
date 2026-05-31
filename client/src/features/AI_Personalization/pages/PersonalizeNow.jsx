/**
 * Personalize Now Page
 * Placeholder for Phase 2 (image upload)
 * Shows token from URL and loads session
 * 
 * Architectural Decision:
 * - Preparing for Phase 2 implementation
 * - Extracts token from URL query parameters
 * - Validates session before showing upload UI
 * - Tailwind classes for styling
 */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sessionApi } from '../services/api';

function PersonalizeNow() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing token');
            setIsLoading(false);
            return;
        }

        // FIX: Store the actual JWT token from URL (not sessionId)
        localStorage.setItem('jwtToken', token);

        const loadSession = async () => {
            try {
                const response = await sessionApi.getSessionByToken();
                if (response.success) {
                    setSession(response.data);
                }
            } catch (err) {
                setError('Failed to load session. Please use a valid link.');
            } finally {
                setIsLoading(false);
            }
        };

        loadSession();
    }, [token]);

    if (isLoading) {
        return (
            <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto">
                    <div className="card text-center">
                        <div className="flex justify-center mb-6">
                            <svg className="animate-spin h-10 w-10 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <p className="text-gray-600 text-lg">Loading session...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto">
                    <div className="card">
                        <div className="alert alert-error mb-6">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        </div>
                        <button
                            className="btn-primary w-full"
                            onClick={() => navigate('/')}
                        >
                            Create New Session
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <div className="card">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold gradient-text">
                            🎨 Personalize Your Product
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Session for: <span className="font-semibold text-gray-900">{session.productSku}</span>
                        </p>
                    </div>

                    {/* Info Alert */}
                    <div className="alert alert-info mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <strong className="block">Phase 2 Coming Soon!</strong>
                                <span>This is where you'll upload your image for AI personalization.</span>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="mb-6">
                        <p className="text-gray-700">
                            Current status:{' '}
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary-100 text-primary-800">
                                {session.status}
                            </span>
                        </p>
                    </div>

                    {/* Back Button */}
                    <button
                        className="btn-secondary w-full"
                        onClick={() => navigate('/')}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PersonalizeNow;