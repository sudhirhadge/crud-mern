/**
 * Create Session Page
 * Main page for creating a new personalization session
 * 
 * Architectural Decision:
 * - Page component handles state management
 * - Child component (CreateSessionForm) handles UI
 * - Success state shows SuccessScreen component
 * - Stores JWT token in localStorage for future API calls
 * - Tailwind classes for styling with gradient background
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateSessionForm from '../components/CreateSessionForm';
import { sessionApi } from '../services/api';
import SuccessScreen from './SuccessScreen';

function CreateSession() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sessionData, setSessionData] = useState(null);

    const handleCreateSession = async (email, productSku) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await sessionApi.createSession(email, productSku);

            if (response.success && response.data) {
                // ✅ Store the JWT token (not sessionId, not UUID)
                localStorage.setItem('jwtToken', response.data.jwtToken);

                setSessionData(response.data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Show success screen if session created
    if (sessionData) {
        return <SuccessScreen sessionData={sessionData} />;
    }

    return (
        <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text">
                        🎨 AI Personalization
                    </h1>
                    <p className="mt-4 text-xl text-white/90">
                        Create your personalized product experience
                    </p>
                </div>

                {/* Main Card */}
                <div className="card">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Start Your Journey
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Enter your details to create a personalized session
                        </p>
                    </div>

                    <CreateSessionForm
                        onSubmit={handleCreateSession}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>

                {/* Footer */}
                <p className="text-center text-white/80 text-sm mt-8">
                    Powered by AI Personalization Service
                </p>
            </div>
        </div>
    );
}

export default CreateSession;