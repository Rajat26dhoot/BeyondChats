import React from 'react';

const conversations = [
  {
    id: 1,
    active: false,
    icon: '🟦', 
    name: 'Luis',
    company: 'Github',
    message: 'Hey! I have a questio...',
    time: '45m',
    badge: null,
    color: '#fff',
    isRead: false,
    waitingTime: 45, // in minutes
  },
  {
    id: 2,
    active: false,
    icon: '🔴',
    name: 'Ivan',
    company: 'Nike',
    message: 'Hi there, I have a qu...',
    time: '30m',
    badge: '3min',
    badgeColor: '#ffe066',
    color: '#fff',
    isRead: true,
    waitingTime: 30,
  },
  {
    id: 3,
    active: false,
    icon: '🟣',
    name: 'Lead',
    company: 'New York',
    message: 'Good morning, let me...',
    time: '40m',
    badge: null,
    color: '#fff',
    isRead: false,
    waitingTime: 40,
  },
  {
    id: 4,
    active: false,
    icon: '⬛',
    name: 'Booking API problems',
    company: 'Bug report',
    message: 'Luis - Small Crafts',
    time: '45m',
    badge: null,
    color: '#fff',
    isRead: false,
    waitingTime: 45,
  },
  {
    id: 5,
    active: false,
    icon: '↩️',
    name: 'Miracle',
    company: 'Exemplary Bank',
    message: "Hey there, I'm here to...",
    time: '45m',
    badge: null,
    color: '#fff',
    isRead: true,
    waitingTime: 45,
  }
];

function ConversationList({ onSelectConversation, selectedConversation, conversationsList }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1, overflowY: 'auto', minHeight: 0 }}>
      {conversationsList.map((conv) => (
        <li
          key={conv.id}
          onClick={() => onSelectConversation(conv)}
          style={{
            background: selectedConversation?.id === conv.id ? '#e5f0ff' : conv.color,
            borderRadius: selectedConversation?.id === conv.id ? '12px' : 0,
            margin: selectedConversation?.id === conv.id ? '0.5rem 0.5rem 0 0.5rem' : '0',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            boxShadow: selectedConversation?.id === conv.id ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
            position: 'relative',
            cursor: 'pointer',
            minHeight: 56,
          }}
        >
          {/* Icon/Avatar with letter overlay */}
          <div style={{ position: 'relative', marginRight: 12 }}>
            <div style={{ 
              width: 32, 
              height: 32, 
              borderRadius: '50%',  
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: 18,
              position: 'relative'
            }}>
              <span style={{ fontSize: 22 }}>{conv.icon}</span>
              {conv.icon !== '↩️' && (
                <span style={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#222',
                  zIndex: 1,
                  textShadow: '0 0 2px rgba(255,255,255,0.8)'
                }}>
                  {conv.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
          {/* Conversation Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              fontWeight: 700, 
              fontSize: '1.05rem', 
              color: selectedConversation?.id === conv.id ? '#1a237e' : conv.isRead ? '#666' : '#222',
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap' 
            }}>
              {conv.name} <span style={{ fontWeight: 600, color: conv.isRead ? '#999' : '#888' }}>- {conv.company}</span>
            </div>
            <div style={{ 
              fontSize: '0.97rem', 
              color: conv.isRead ? '#999' : '#666',
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              fontWeight: conv.isRead ? 400 : 500
            }}>
              {conv.message}
            </div>
          </div>
          {/* Badge or Time */}
          <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {conv.badge && (
              <span style={{
                background: conv.badgeColor || '#eee',
                color: '#222',
                borderRadius: 8,
                padding: '2px 8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: 2,
                display: 'inline-block',
              }}>{conv.badge}</span>
            )}
            <span style={{ 
              fontSize: '0.92rem', 
              color: conv.isRead ? '#999' : '#666', 
              fontWeight: conv.isRead ? 500 : 600 
            }}>
              {conv.time}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export { ConversationList, conversations }; 