import React, { useState, useEffect } from 'react';
import './App.css'
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import RightPanel from './components/RightPanel';
import Header from './components/Header';
import MobileLayout from './components/MobileLayout';

function App() {
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [chatInputValue, setChatInputValue] = useState("");
  const [chatInputYellow, setChatInputYellow] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleRightPanel = (text) => {
    if (text) {
      setSelectedText(text);
      setShowRightPanel(true);
    } else {
      setShowRightPanel(!showRightPanel);
    }
  };

  const handleCloseConversation = () => {
    setSelectedConversation(null);
  };

  const handleSummarizeConversation = () => {
    setChatInputValue(`Question\n\nThe customer contacted us to request a refund for an unopened product purchased as a Christmas gift.\n\nSummary\n\n• Customer bought a product in November as a Christmas gift, but it was not needed.\n• Customer wants a refund for the unopened product.\n• Teammate asks for product name, purchase location, and email.\n• Teammate informs customer that refunds are only available for orders within 60 days and must meet return condition requirements.\n• Customer's order was placed over 60 days ago, but they request an exception.`);
    setChatInputYellow(true);
  };

  const handleSendMessage = (message) => {
    setChatInputValue(message);
  };

  if (isMobile) {
    return (
      <MobileLayout
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
        onClose={handleCloseConversation}
        onSummarizeConversation={handleSummarizeConversation}
        onTogglePanel={toggleRightPanel}
        chatInputValue={chatInputValue}
        setChatInputValue={setChatInputValue}
        chatInputYellow={chatInputYellow}
        setChatInputYellow={setChatInputYellow}
      />
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      height: '100%', 
      width: '100%',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        minWidth: 0, 
        height: '100%',
        width: '100%'
      }}>
        <Header 
          onClose={handleCloseConversation} 
          onSummarizeConversation={handleSummarizeConversation} 
          selectedConversation={selectedConversation}
          showRightPanel={showRightPanel}
          onTogglePanel={toggleRightPanel}
        />
        <div style={{ 
          display: 'flex', 
          flex: 1, 
          minHeight: 0, 
          height: 'calc(100% - 56px)',
          width: '100%'
        }}>
          <Sidebar onSelectConversation={setSelectedConversation} selectedConversation={selectedConversation} />
          <ChatWindow 
            showRightPanel={showRightPanel} 
            onTogglePanel={toggleRightPanel} 
            chatInputValue={chatInputValue}
            setChatInputValue={setChatInputValue}
            chatInputYellow={chatInputYellow}
            setChatInputYellow={setChatInputYellow}
            selectedConversation={selectedConversation}
          />
        </div>
      </div>
      {showRightPanel && <RightPanel onClose={() => setShowRightPanel(false)} onSendMessage={handleSendMessage} initialText={selectedText} />}
    </div>
  )
}

export default App
