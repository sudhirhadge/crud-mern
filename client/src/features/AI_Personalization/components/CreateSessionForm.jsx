/**
 * Create Session Form Component
 * Handles user input for email and product SKU
 * 
 * Architectural Decision:
 * - Functional component with React hooks
 * - Form validation before submission
 * - Loading state to prevent double submission
 * - Error display for user feedback
 * - Tailwind classes for styling
 */
import { useState } from 'react';

function CreateSessionForm({ onSubmit, isLoading, error }) {
    const [formData, setFormData] = useState({
        email: '',
        productSku: '',
    });
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        // Email validation
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }

        // Product SKU validation
        if (!formData.productSku) {
            errors.productSku = 'Product SKU is required';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit(formData.email, formData.productSku);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="alert alert-error">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-field"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {validationErrors.email && (
                    <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {validationErrors.email}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <label htmlFor="productSku" className="block text-sm font-semibold text-gray-700 mb-2">
                    Product SKU
                </label>
                <input
                    type="text"
                    id="productSku"
                    name="productSku"
                    className="input-field"
                    placeholder="e.g., TSHIRT-BLUE-M"
                    value={formData.productSku}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {validationErrors.productSku && (
                    <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {validationErrors.productSku}
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="btn-primary w-full"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Session...
                    </div>
                ) : (
                    'Create Personalization Session'
                )}
            </button>
        </form>
    );
}

export default CreateSessionForm;