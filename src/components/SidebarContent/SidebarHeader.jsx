import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

function SidebarHeader({ sortOrder, unreadCount, onSort }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '1rem 0.2rem 0.5rem 1.2rem', 
      background: '#fafbfc', 
      position: 'sticky', 
      top: 0, 
      zIndex: 2 
    }}>
      <div 
        style={{ 
          fontWeight: 'bold', 
          fontSize: '0.9rem', 
          cursor: 'pointer',
          color: sortOrder === 'unread' ? '#3b4cca' : '#222',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginLeft: isMobile ? '1.2rem' : '0'
        }}
        onClick={() => onSort('unread')}
      >
        {unreadCount} Unread 
        <IoIosArrowDown style={{ 
          fontSize: '1.2em',
          fontWeight: 'bold',
          transform: sortOrder === 'unread' ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s'
        }} />
      </div>
      <div 
        style={{ 
          fontWeight: 'bold', 
          fontSize: '0.9rem', 
          cursor: 'pointer',
          color: sortOrder === 'waiting' ? '#3b4cca' : '#222',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginLeft: isMobile ? '8.2rem' : '4.6rem'
        }}
        onClick={() => onSort('waiting')}
      >
        Waiting
        <IoIosArrowDown style={{ 
          fontSize: '1.2em',
          fontWeight: 'bold',
          transform: sortOrder === 'waiting' ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s'
        }} />
      </div>
    </div>
  );
}

export default SidebarHeader; 