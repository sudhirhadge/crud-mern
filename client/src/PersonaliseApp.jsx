/**
 * Main App Component
 * Sets up routing for the application
 * 
 * Architectural Decision:
 * - React Router for client-side navigation
 * - Clean separation of pages
 * - Prepared for Phase 2 (PersonalizeNow page)
 */
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateSession from './features/AI_Personalization/pages/CreateSession';
import PersonalizeNow from './features/AI_Personalization/pages/PersonalizeNow';


function PersonaliseApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CreateSession />} />
                <Route path="/personalize-now" element={<PersonalizeNow />} />
            </Routes>
        </Router>
    );
}

export default PersonaliseApp;