import React, { useState } from 'react';
import { ConversationList, conversations } from './SidebarContent/ConversationList';
import SidebarHeader from './SidebarContent/SidebarHeader';

function Sidebar({ onSelectConversation, selectedConversation, isMobile }) {
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'waiting', 'unread'
  const [conversationsList, setConversationsList] = useState(conversations);

  // Count unread conversations
  const unreadCount = conversationsList.filter(conv => !conv.isRead).length;
  
  // Find the conversation waiting longest
  const longestWaiting = conversationsList.reduce((longest, current) => {
    return current.waitingTime > longest.waitingTime ? current : longest;
  }, conversationsList[0]);

  // Handle sorting
  const handleSort = (type) => {
    let sortedList = [...conversationsList];
    
    if (type === 'waiting') {
      // Sort by waiting time, unread first
      sortedList.sort((a, b) => {
        if (a.isRead !== b.isRead) {
          return a.isRead ? 1 : -1; // Unread first
        }
        return b.waitingTime - a.waitingTime; // Longer waiting time first
      });
      setSortOrder('waiting');
    } else if (type === 'unread') {
      // Sort by unread status, then by waiting time
      sortedList.sort((a, b) => {
        if (a.isRead !== b.isRead) {
          return a.isRead ? 1 : -1; // Unread first
        }
        return b.waitingTime - a.waitingTime; // Longer waiting time first
      });
      setSortOrder('unread');
    } else {
      // Default order (by id)
      sortedList.sort((a, b) => a.id - b.id);
      setSortOrder('default');
    }
    
    setConversationsList(sortedList);
  };

  // Handle conversation selection and mark as read
  const handleConversationClick = (conv) => {
    // Update the conversation's read status
    const updatedList = conversationsList.map(c => 
      c.id === conv.id ? { ...c, isRead: true } : c
    );
    setConversationsList(updatedList);
    
    // Call the original onSelectConversation
    onSelectConversation(conv);
  };

  return (
    <aside style={{ 
      width: isMobile ? '100%' : 300, 
      borderRight: '2px solid #eeeeee', 
      height: '100%', 
      padding: 0, 
      background: '#fafbfc', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      ...(isMobile && {
        position: 'fixed',
        top: 56,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99
      })
    }}>
      <SidebarHeader 
        sortOrder={sortOrder}
        unreadCount={unreadCount}
        onSort={handleSort}
      />
      <ConversationList 
        onSelectConversation={handleConversationClick}
        selectedConversation={selectedConversation}
        conversationsList={conversationsList}
      />
    </aside>
  );
}

export default Sidebar; 