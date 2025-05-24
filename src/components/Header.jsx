import React, { useState, useRef, useEffect } from 'react';
import FinImage from '../assets/Fin.png';
import { IoStarOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { FaTicketAlt } from 'react-icons/fa';
import { IoCallOutline } from 'react-icons/io5';
import { BsClock } from 'react-icons/bs';
import { IoExitOutline } from 'react-icons/io5';
import { IoCall } from 'react-icons/io5';
import { IoMicOutline } from 'react-icons/io5';
import { IoVideocamOutline } from 'react-icons/io5';
import { IoShareOutline } from 'react-icons/io5';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { IoCodeSlashOutline } from 'react-icons/io5';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoAttachOutline } from 'react-icons/io5';
import { IoImageOutline } from 'react-icons/io5';
import { IoArrowUpOutline, IoArrowDownOutline } from 'react-icons/io5';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoMenuOutline } from 'react-icons/io5';

function Header({ onClose, onSummarizeConversation, selectedConversation, onTogglePanel, isMobile, showHeaderMenu, onToggleHeaderMenu, hideMobileNav }) {
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const modalRef = useRef(null);
  const moreBtnRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    if (!showMoreModal) return;
    function handleClick(e) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        moreBtnRef.current &&
        !moreBtnRef.current.contains(e.target)
      ) {
        setShowMoreModal(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMoreModal]);

  const renderMobileHeader = () => (
    <>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        flex: 1
      }}>
        {!hideMobileNav && (
          <button 
            onClick={onClose}
            style={{ 
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IoArrowBackOutline size={24} />
          </button>
        )}
        <div style={{ 
          fontWeight: 700, 
          fontSize: '1.18rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          ...(hideMobileNav ? { marginLeft: 18 } : {})
        }}>
          {hideMobileNav ? 'Your inbox' : (selectedConversation ? selectedConversation.name : 'Your inbox')}
        </div>
      </div>
      {!hideMobileNav && (
        <button
          onClick={onToggleHeaderMenu}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IoMenuOutline size={24} />
        </button>
      )}
      {showHeaderMenu && !hideMobileNav && (
        <div style={{
          position: 'absolute',
          top: '56px',
          right: 0,
          left: 0,
          background: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => onTogglePanel && onTogglePanel()}
              style={{ 
                background: '#ededed', 
                border: 'none', 
                borderRadius: 10, 
                padding: '8px 14px', 
                fontSize: 15, 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                fontWeight: 600,
                gap: 6,
                width: '100%'
              }}
            >
              <img src={FinImage} alt="Fin" style={{ width: 18, height: 18, borderRadius: '50%' }} />
              <span>Fin Copilot</span>
            </button>
            <button style={{ 
              background: '#ededed', 
              border: 'none', 
              borderRadius: 10, 
              padding: '8px 14px', 
              fontSize: 15, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 600,
              gap: 6,
              width: '100%'
            }}>
              <IoStarOutline size={18} style={{ marginRight: 6 }} />
              <span>Star</span>
            </button>
            <button style={{ 
              background: '#ededed', 
              border: 'none', 
              borderRadius: 10, 
              padding: '8px 14px', 
              fontSize: 15, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 600,
              gap: 6,
              width: '100%'
            }}>
              <FaTicketAlt size={18} style={{ marginRight: 6 }} />
              <span>Create Ticket</span>
            </button>
            <button style={{ 
              background: '#ededed', 
              border: 'none', 
              borderRadius: 10, 
              padding: '8px 14px', 
              fontSize: 15, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 600,
              gap: 6,
              width: '100%'
            }}>
              <IoCallOutline size={18} style={{ marginRight: 6 }} />
              <span>Call</span>
            </button>
            <button style={{ 
              background: '#ededed', 
              border: 'none', 
              borderRadius: 10, 
              padding: '8px 14px', 
              fontSize: 15, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 600,
              gap: 6,
              width: '100%'
            }}>
              <BsClock size={18} style={{ marginRight: 6 }} />
              <span>Snooze</span>
            </button>
            <button onClick={onClose} style={{ 
              background: '#111', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 10, 
              padding: '8px 14px', 
              fontSize: 15, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 600,
              gap: 6,
              width: '100%'
            }}>
              <IoExitOutline size={18} style={{ marginRight: 6 }} />
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      height: '56px', 
      borderBottom: '2px solid #eeeeee', 
      background: '#fff', 
      padding: '0 1.5rem', 
      position: 'sticky', 
      top: 0, 
      zIndex: 10,
      ...(isMobile && {
        justifyContent: 'space-between',
        padding: '0 1rem'
      })
    }}>
      {!isMobile ? (
        <>
          <div style={{ flex: '0 0 260px', fontWeight: 'bold', fontSize: '1.40rem' }}>Your inbox</div>
          <div style={{ width: '1.5px', height: '56px', margin: '0 1rem', background: '#eeee' }}></div>
          <div style={{ fontWeight: 700, fontSize: '1.18rem', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginLeft: '0.5rem' }}>
            {selectedConversation ? selectedConversation.name : 'Select a conversation'}
          </div>
        </>
      ) : (
        renderMobileHeader()
      )}
      
      {!isMobile && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 10
        }}>
          {/* Desktop header buttons */}
          <button 
            onClick={() => onTogglePanel && onTogglePanel()}
            style={{ 
              background: '#ededed', 
              border: 'none', 
              borderRadius: 10, 
              padding: '6px 14px', 
              marginRight: 2, 
              fontSize: 15, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 600,
              gap: 6
            }}
          >
            <img src={FinImage} alt="Fin" style={{ width: 18, height: 18, borderRadius: '50%' }} />
            <span>Fin Copilot</span>
          </button>
          <button style={{ background: '#ededed', border: 'none', borderRadius: 10, padding: '6px 12px', marginRight: 2, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <IoStarOutline size={18} />
          </button>
          <button
            ref={moreBtnRef}
            style={{ background: '#ededed', border: 'none', borderRadius: 10, padding: '6px 12px', marginRight: 2, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => setShowMoreModal(v => !v)}
          >
            <BsThreeDots size={18} />
          </button>
          <button style={{ background: '#ededed', border: 'none', borderRadius: 10, padding: '6px 12px', marginRight: 2, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <FaTicketAlt size={18} />
          </button>
          <button
            style={{ background: '#ededed', border: 'none', borderRadius: 10, padding: '6px 14px', marginRight: 2, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 600 }}
            onClick={() => setShowCallModal(true)}
          >
            <IoCallOutline size={17} style={{ marginRight: 6 }} /> Call
          </button>
          <button style={{ background: '#ededed', border: 'none', borderRadius: 10, padding: '6px 14px', marginRight: 2, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
            <BsClock size={17} style={{ marginRight: 6 }} /> Snooze
          </button>
          <button onClick={onClose} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 10, padding: '6px 18px', fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 700 }}>
            <IoExitOutline size={17} style={{ marginRight: 6 }} /> Close
          </button>
        </div>
      )}
      
      {/* More Modal */}
      {showMoreModal && (
        <div
          ref={modalRef}
          style={{
            position: 'fixed',
            top: 70,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            paddingTop: '1rem',
            paddingBottom: '0.3rem',
            minWidth: 700,
            zIndex: 10000,
            fontFamily: 'inherit',
          }}
        >
          <input
            type="text"
            placeholder="Search actions"
            style={{
              width: '90%',
              margin: '0 2% 1rem 2%',
              padding: '0.7rem 1rem',
              fontSize: 17,
              outline: 'none',
              border: 'none',
            }}
            autoFocus
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 ,borderTop: '1.5px solid #eee'}}>
            {[
              { label: 'Write a note', shortcut: 'N', icon: <IoDocumentTextOutline size={20} style={{ marginRight: 12 }} /> },
              { label: 'Use macro', shortcut: '\\', icon: <IoCodeSlashOutline size={20} style={{ marginRight: 12 }} /> },
              { label: 'Summarize conversation', icon: <IoChatbubbleEllipsesOutline size={20} style={{ marginRight: 12 }} /> },
              { label: 'Create a back-office ticket', shortcut: '⌘Y', icon: <FaTicketAlt size={20} style={{ marginRight: 12 }} /> },
              { label: 'Snooze', shortcut: 'Z', icon: <BsClock size={20} style={{ marginRight: 12 }} /> },
              { label: 'Upload attachement', shortcut: '⌘A', icon: <IoAttachOutline size={20} style={{ marginRight: 12 }} /> },
              { label: 'Insert gif', shortcut: '⌘G', icon: <IoImageOutline size={20} style={{ marginRight: 12 }} /> },
            ].map((item, idx) => (
              <div
                key={item.label}
                style={{
                  padding: '0.7rem 1.5rem',
                  fontWeight: 600,
                  fontSize: 17,
                  color: '#222',
                  background: idx === 2 ? '#f6f7fa' : 'transparent',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={idx === 2 ? () => { setShowMoreModal(false); onSummarizeConversation && onSummarizeConversation(); } : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && <span style={{ color: '#888', fontSize: 15 }}>{item.shortcut}</span>}
              </div>
            ))}
          </div>
          {/* Modal footer with keyboard shortcuts */}
          <div
            style={{
              marginTop: 18,
              background: '#f7f8fa',
              borderRadius: '0 0 12px 12px',
              padding: '10px 24px 8px 24px',
              color: '#888',
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 28,
              borderTop: '1.5px solid #eee',
              position: 'relative'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IoArrowUpOutline size={16} />
                <IoArrowDownOutline size={16} />
              </span>
              <span>to navigate</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <IoReturnUpBackOutline size={16} />
              <span>to select</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <IoCloseOutline size={16} />
              <span>to close</span>
            </span>
          </div>
        </div>
      )}
      
      {/* Call Modal */}
      {showCallModal && (
        <div
          style={{
            position: 'fixed',
            top: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#222',
            borderRadius: 22,
            boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
            width: 600,
            zIndex: 20000,
            color: '#fff',
            padding: 0,
            overflow: 'hidden',
            border: '2.5px solid #111',
          }}
        >
          {/* Header */}
          <div style={{ padding: '1rem 1.2rem 0.5rem 1.2rem', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Messenger call with Vesuvio</span>
            <span style={{ fontSize: 22, cursor: 'pointer', color: '#aaa' }} onClick={() => setShowCallModal(false)}>×</span>
          </div>
          {/* Timer */}
          <div style={{ padding: '0 1.2rem 0.7rem 1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#ff4d4f', fontSize: 18 }}>●</span>
            <span style={{ fontWeight: 600, fontSize: 16 }}>00:09</span>
          </div>
          {/* Video area */}
          <div style={{ padding: '0 1.2rem 1.2rem 1.2rem' }}>
            <div style={{
              background: '#111',
              borderRadius: 16,
              overflow: 'hidden',
              width: '100%',
              height: 320,
              position: 'relative',
              marginBottom: 18,
              border: '4px solid black'
            }}>
              {/* Main video (placeholder) */}
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Main"
                style={{ width: '100%', height: '100%', objectFit: 'cover'}}
              />
              {/* Small video (top right) */}
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Small"
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 100,
                  height: 74,
                  borderRadius: 10,
                  border: '2px solid #fff',
                  objectFit: 'cover',
                  background: '#222',
                }}
              />
            </div>
            {/* Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: 20,
              marginRight: 20,
              marginTop: 2,
              marginBottom: 10,
              paddingLeft: 15,
              paddingRight: 15,
            }}>
              {/* Call, Mic, Video, Share, End */}
              <button style={{ background: 'black', border: 'none', borderRadius: '50%', width: 55, height: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff', cursor: 'pointer' }}>📞</button>
              <button style={{ background: 'black', border: 'none', borderRadius: '50%', width: 55, height: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff', cursor: 'pointer' }}>🎤</button>
              <button style={{ background: 'black', border: 'none', borderRadius: '50%', width: 55, height: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff', cursor: 'pointer' }}>🎥</button>
              <button style={{ background: 'black', border: 'none', borderRadius: '50%', width: 55, height: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff', cursor: 'pointer' }}>⬆️</button>
              <button style={{ background: 'black', border: 'none', borderRadius: '50%', width: 55, height: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff', cursor: 'pointer' }} onClick={() => setShowCallModal(false)}>📞</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header; 