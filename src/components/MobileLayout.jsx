import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import RightPanel from './RightPanel';

function MobileLayout({ selectedConversation, onSelectConversation, onClose, onSummarizeConversation, onTogglePanel, chatInputValue, setChatInputValue, chatInputYellow, setChatInputYellow }) {
  const [view, setView] = useState('sidebar'); // 'sidebar', 'chat', 'rightPanel'
  const [rightPanelText, setRightPanelText] = useState('');
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);

  const handleConversationSelect = (conv) => {
    onSelectConversation(conv);
    setView('chat');
  };

  const handleRightPanelToggle = (text) => {
    setRightPanelText(text);
    setView('rightPanel');
  };

  const handleBack = () => {
    if (view === 'rightPanel') {
      setView('chat');
    } else if (view === 'chat') {
      setView('sidebar');
    }
  };

  const toggleHeaderMenu = () => {
    setShowHeaderMenu(!showHeaderMenu);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {view === 'sidebar' && (
        <div style={{ height: '100%', width: '100%' }}>
          <Header 
            onClose={onClose}
            onSummarizeConversation={onSummarizeConversation}
            selectedConversation={selectedConversation}
            onTogglePanel={() => handleRightPanelToggle('')}
            isMobile={true}
            showHeaderMenu={showHeaderMenu}
            onToggleHeaderMenu={toggleHeaderMenu}
            hideMobileNav={true}
          />
          <Sidebar 
            onSelectConversation={handleConversationSelect}
            selectedConversation={selectedConversation}
            isMobile={true}
          />
        </div>
      )}

      {view === 'chat' && (
        <div style={{ height: '100%', width: '100%' }}>
          <Header 
            onClose={handleBack}
            onSummarizeConversation={onSummarizeConversation}
            selectedConversation={selectedConversation}
            onTogglePanel={() => handleRightPanelToggle('')}
            isMobile={true}
            showHeaderMenu={showHeaderMenu}
            onToggleHeaderMenu={toggleHeaderMenu}
            hideMobileNav={false}
          />
          <ChatWindow
            showRightPanel={view === 'rightPanel'}
            onTogglePanel={handleRightPanelToggle}
            chatInputValue={chatInputValue}
            setChatInputValue={setChatInputValue}
            chatInputYellow={chatInputYellow}
            setChatInputYellow={setChatInputYellow}
            selectedConversation={selectedConversation}
            isMobile={true}
          />
        </div>
      )}

      {view === 'rightPanel' && (
        <div style={{ height: '100%', width: '100%' }}>
          <RightPanel
            onClose={handleBack}
            onSendMessage={() => {}}
            initialText={rightPanelText}
            isMobile={true}
          />
        </div>
      )}
    </div>
  );
}

export default MobileLayout; 