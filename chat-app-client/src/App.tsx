import React from 'react';
import ChatComponent from './components/ChatComponent';

const App: React.FC = () => {
    const jobSeekerId = 1; // Replace with actual job seeker ID
    const agencyId = 1; // Replace with actual agency ID

    return (
        <div>
            <h1>Chat Application</h1>
            <ChatComponent jobSeekerId={jobSeekerId} agencyId={agencyId} />
        </div>
    );
};

export default App;
