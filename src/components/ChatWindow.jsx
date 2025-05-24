import React, { useState, useRef, useEffect } from 'react';
import { 
  IoChatbubbleOutline, 
  IoChevronDown, 
  IoFlashOutline, 
  IoBookmarkOutline, 
  IoHappyOutline,
  IoTextOutline,
  IoCodeOutline,
  IoLinkOutline,
  IoReturnUpBackOutline,
  IoSendOutline
} from 'react-icons/io5';

function ChatWindow({ showRightPanel, onTogglePanel, chatInputValue, setChatInputValue, chatInputYellow, setChatInputYellow, selectedConversation }) {
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [showAIMenu, setShowAIMenu] = useState(false);
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  const aiBadgeRef = useRef(null);
  const hasText = chatInputValue.trim().length > 0;
  const showToolbar = selection.start !== selection.end;
  const agentMsgRef = useRef(null);
  const [showFinButton, setShowFinButton] = useState(false);
  const [finButtonPos, setFinButtonPos] = useState({ top: 0, left: 0 });

  // Auto-resize functionality
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [chatInputValue]);

  // Click-away handler for AI menu
  useEffect(() => {
    if (!showAIMenu) return;
    function handleClick(e) {
      if (
        aiBadgeRef.current &&
        !aiBadgeRef.current.contains(e.target) &&
        !document.getElementById('ai-menu-popover')?.contains(e.target)
      ) {
        setShowAIMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showAIMenu]);

  // Selection detection for agent message
  useEffect(() => {
    function handleSelection() {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setShowFinButton(false);
        return;
      }
      const range = selection.getRangeAt(0);
      if (!agentMsgRef.current || !agentMsgRef.current.contains(range.commonAncestorContainer)) {
        setShowFinButton(false);
        return;
      }
      const rects = range.getClientRects();
      const endRect = rects[rects.length - 1]; // last rect = end of selection
      if (!endRect || (endRect.width === 0 && endRect.height === 0)) {
        setShowFinButton(false);
        return;
      }
      setFinButtonPos({
        top: endRect.bottom + window.scrollY, // fixed position with scroll
        left: endRect.right + window.scrollX // fixed position with scroll
      });
      setShowFinButton(true);
    }
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    document.addEventListener('selectionchange', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, []);

  // Handler for selection change
  const handleSelect = (e) => {
    const textarea = e.target;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    if (selectionStart === selectionEnd) {
      setSelection({ start: 0, end: 0 });
      return;
    }

    setSelection({ start: selectionStart, end: selectionEnd });

    // Mirror logic for accurate toolbar positioning
    setTimeout(() => {
      const mirror = mirrorRef.current;
      if (mirror) {
        const marker = mirror.querySelector('#selection-marker');
        if (marker) {
          const markerRect = marker.getBoundingClientRect();
          const toolbarWidth = 340; // Approximate width of the toolbar in px
          const padding = 8; // Minimum distance from screen edge
          let left = markerRect.left;
          // Clamp left so toolbar stays in viewport
          if (left < padding) left = padding;
          if (left + toolbarWidth > window.innerWidth - padding) {
            left = window.innerWidth - toolbarWidth - padding;
          }
          setToolbarPosition({
            top: markerRect.top - 28, // 28px above the selection (closer)
            left: left,
          });
        }
      }
    }, 0);
  };

  // Prepare mirror content with marker
  const getMirrorContent = () => {
    const before = chatInputValue.slice(0, selection.start);
    const after = chatInputValue.slice(selection.start);
    // Replace spaces and newlines for HTML rendering
    const htmlBefore = before.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
    const htmlAfter = after.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
    return { __html: `${htmlBefore}<span id='selection-marker' style='display:inline-block;width:1px;height:1em;'></span>${htmlAfter}` };
  };

  // If user edits the textarea, and it's yellow mode, turn off yellow if they change the text
  const handleInputChange = (e) => {
    setChatInputValue(e.target.value);
    if (chatInputYellow && e.target.value !== `Question\n\nThe customer contacted us to request a refund for an unopened product purchased as a Christmas gift.\n\nSummary\n\n• Customer bought a product in November as a Christmas gift, but it was not needed.\n• Customer wants a refund for the unopened product.\n• Teammate asks for product name, purchase location, and email.\n• Teammate informs customer that refunds are only available for orders within 60 days and must meet return condition requirements.\n• Customer's order was placed over 60 days ago, but they request an exception.`) {
      setChatInputYellow(false);
    }
  };

  // Get chat content based on selected conversation
  const getChatContent = () => {
    if (!selectedConversation) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#888', fontSize: '1.1rem' }}>
          Select a conversation to start chatting
        </div>
      );
    }

    // Different chat content for different conversations
    switch (selectedConversation.id) {
      case 1: // Luis
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e5eaf7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 2, marginRight: 4 }}>
                <span role="img" aria-label="agent">L</span>
              </div>
              <div ref={agentMsgRef} style={{
                background: '#dbeafe',
                borderRadius: 16,
                padding: '1rem 1.25rem',
                fontSize: '1.08rem',
                color: '#1a237e',
                maxWidth: 520,
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                position: 'relative'
              }}>
                <div style={{ fontWeight: 600 }}>
                  I bought a product from your store in November as a Christmas gift for a member of my family. <i>However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.</i>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'black', fontSize: '0.97rem', marginTop: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: 15 }}>🗂️</span> 1min
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <div style={{background: '#dbeafe',borderRadius: 16,padding: '1rem 1.25rem',fontSize: '1.08rem',color: '#1a237e',maxWidth: 420,boxShadow: '0 1px 4px rgba(0,0,0,0.04)',display: 'flex',flexDirection: 'column',alignItems: 'flex-end'}}>
                  <div style={{ fontWeight: 600 }}>Let me just look into this for you, Luis.</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'black', fontSize: '0.97rem', marginTop: 8 }}>
                    <span>Seen</span>
                    <span>·</span>
                    <span>1min</span>
                  </div>
                </div>
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" style={{ width: 28, height: 28, borderRadius: '50%', marginLeft: 8, marginBottom: 2 }} />
              </div>
            </div>
          </>
        );
      case 2: // Ivan
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 2, marginRight: 4 }}>
                <span role="img" aria-label="agent">I</span>
              </div>
              <div style={{
                background: '#dbeafe',
                borderRadius: 16,
                padding: '1rem 1.25rem',
                fontSize: '1.08rem',
                color: '#222',
                maxWidth: 520,
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              }}>
                <div style={{ fontWeight: 400 }}>
                  Hi there! I'm having trouble with my recent Nike order. The tracking shows it's been stuck in transit for over a week now.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: '0.97rem', marginTop: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: 15 }}>🗂️</span> 30min
                  </span>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return (
          <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 2, marginRight: 4 }}>
              <span role="img" aria-label="agent">{selectedConversation.name.charAt(0)}</span>
            </div>
            <div style={{
              background: '#dbeafe',
              borderRadius: 16,
              padding: '1rem 1.25rem',
              fontSize: '1.08rem',
              color: '#222',
              maxWidth: 520,
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
            }}>
              <div style={{ fontWeight: 400 }}>
                {selectedConversation.message}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: '0.97rem', marginTop: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ fontSize: 15 }}>🗂️</span> {selectedConversation.time}
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: 'linear-gradient(to bottom,rgb(246, 246, 246) 60%,rgb(246, 246, 246) 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        minHeight: 0, 
        padding: '2.5rem 2rem',
        height: 'calc(100% - 65px)' // Account for bottom bar height
      }}>
        {getChatContent()}
      </div>
      {/* Chat input box at the bottom */}
      {showFinButton && (
        <div
          style={{
            position: 'fixed',
            top: finButtonPos.top,
            left: finButtonPos.left,
            zIndex: 1000,
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.13)',
            padding: '6px 18px 6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid #eee',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'box-shadow 0.15s',
          }}
          onClick={() => {
            const selectedText = window.getSelection().toString();
            if (selectedText) {
              onTogglePanel(selectedText);
            }
          }}
        >
          <span style={{
            display: 'flex',
            alignItems: 'center',
            background: '#222',
            color: '#fff',
            borderRadius: 5,
            width: 22,
            height: 22,
            justifyContent: 'center',
            fontSize: 16,
            marginRight: 6
          }}>
            <img src="/src/assets/Fin.png" alt="Fin" style={{ width: 18, height: 18, borderRadius: '50%' ,background:'transparent' }} />
          </span>
          Ask Fin Copilot
        </div>
      )}
      <div style={{ 
        background: chatInputYellow ? '#fcf2bd' : '#fff',
        border: chatInputYellow ? '1.5px solid rgb(255, 217, 63)' : '2px solid rgb(0, 0, 0)',
        boxShadow: chatInputYellow ? '0 2px 8px rgba(255, 224, 102, 0.13)' : '1px 1px 1px 1px rgba(0,0,0,0.03)',
        padding: '0.7rem 1.2rem 0.6rem 1.2rem',
        position: 'relative',
        zIndex: 2,
        margin: '1rem',
        borderRadius: '1rem',
        color: '#000'
      }} className="chat-input-box">
        {/* Floating formatting toolbar */}
        {showToolbar && (
          <div style={{
            position: 'fixed',
            left: toolbarPosition.left,
            top: toolbarPosition.top,
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
            padding: '7px 18px 7px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            zIndex: 1000,
            border: '1px solid #eee',
            transform: 'translateY(-100%)'
          }}>
            <span
              ref={aiBadgeRef}
              style={{ fontWeight: 700, fontSize: 13, background: '#eee', borderRadius: 5, padding: '2px 8px', color: 'black', marginRight: 2, letterSpacing: 0.5, cursor: 'pointer', position: 'relative' }}
              onClick={() => setShowAIMenu(v => !v)}
            >
              AI
              {showAIMenu && (
                <div
                  id="ai-menu-popover"
                  style={{
                    position: 'absolute',
                    left: -10,
                    bottom: '110%',
                    minWidth: 220,
                    background: '#fff',
                    borderRadius: 14,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
                    padding: '7px 0',
                    zIndex: 2000,
                    border: '1px solid #eee',
                    marginBottom: 10,
                    fontFamily: 'inherit',
                    fontSize: 16,
                    color: '#222',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ padding: '8px 18px', fontWeight: 600, borderRadius: 8, transition: 'background 0.13s', userSelect: 'none' }}>Rephrase</div>
                  <div style={{ padding: '8px 18px', fontWeight: 600, borderRadius: 8, background: '#f6f7fa', color: '#3b4cca', transition: 'background 0.13s', userSelect: 'none' }}>My tone of voice</div>
                  <div style={{ padding: '8px 18px', fontWeight: 600, borderRadius: 8, transition: 'background 0.13s', userSelect: 'none' }}>More friendly</div>
                  <div style={{ padding: '8px 18px', fontWeight: 600, borderRadius: 8, transition: 'background 0.13s', userSelect: 'none' }}>More formal</div>
                  <div style={{ padding: '8px 18px', fontWeight: 600, borderRadius: 8, transition: 'background 0.13s', userSelect: 'none' }}>Fix grammar & spelling</div>
                  <div style={{ padding: '8px 18px', fontWeight: 600, borderRadius: 8, transition: 'background 0.13s', userSelect: 'none' }}>Translate...</div>
                </div>
              )}
            </span>
            <IoTextOutline size={16} style={{ cursor: 'pointer' }} />
            <IoTextOutline size={16} style={{ cursor: 'pointer', transform: 'rotate(15deg)' }} />
            <IoCodeOutline size={16} style={{ cursor: 'pointer' }} />
            <IoLinkOutline size={16} style={{ cursor: 'pointer', color: 'black' }} />
            <span style={{ fontWeight: 700, fontSize: 15, cursor: 'pointer', padding: '0 2px' }}>H1</span>
            <span style={{ fontWeight: 700, fontSize: 15, cursor: 'pointer', padding: '0 2px' }}>H2</span>
            <IoReturnUpBackOutline size={17} style={{ cursor: 'pointer', marginLeft: 2 }} />
          </div>
        )}
        {/* Hidden mirror div for selection position calculation */}
        <div
          ref={mirrorRef}
          style={{
            position: 'fixed',
            visibility: 'hidden',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontSize: '1.01rem',
            fontFamily: 'inherit',
            padding: '6px 0',
            minHeight: 32,
            maxHeight: 200,
            color: '#000',
            left: textareaRef.current ? textareaRef.current.getBoundingClientRect().left : 0,
            top: textareaRef.current ? textareaRef.current.getBoundingClientRect().top : 0,
            width: textareaRef.current ? textareaRef.current.offsetWidth : '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            zIndex: -1,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
          dangerouslySetInnerHTML={getMirrorContent()}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: '0.97rem', display: 'flex', alignItems: 'center', marginRight: 12 }}>
            <IoChatbubbleOutline size={16} style={{ marginRight: 4 }} /> Chat <IoChevronDown size={13} style={{ marginLeft: 2 }} />
          </span>
          <span style={{ fontSize: '0.93rem', fontWeight: 500 }}>Use ⌘K for shortcuts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, position: 'relative' }}>
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Type your message..."
            value={chatInputValue}
            onChange={handleInputChange}
            onSelect={handleSelect}
            style={{ 
              flex: 1, 
              resize: 'none', 
              border: 'none', 
              outline: 'none', 
              fontSize: '1.01rem', 
              background: 'transparent', 
              padding: '6px 0', 
              fontFamily: 'inherit', 
              minHeight: 32,
              maxHeight: 200, 
              color: '#000',
              overflowY: 'auto' 
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <IoFlashOutline size={17} style={{ cursor: 'pointer' }} />
            <IoBookmarkOutline size={17} style={{ cursor: 'pointer' }} />
            <IoHappyOutline size={17} style={{ cursor: 'pointer' }} />
          </div>
          <button
            disabled={!hasText}
            style={{
              background: hasText ? '#222' : '#e5e7eb',
              border: 'none',
              color: hasText ? '#fff' : '#888',
              fontWeight: 500,
              fontSize: '1.01rem',
              cursor: hasText ? 'pointer' : 'not-allowed',
              padding: '6px 10px 6px 11px',
              borderRadius: 10,
              transition: 'background 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              minWidth: 60,
              position: 'relative',
              boxShadow: hasText ? '0 2px 8px rgba(0,0,0,0.07)' : 'none'
            }}
          >
            <span style={{ fontWeight: 500}}>Send</span>
            <span style={{
              width: 1,
              height: 18,
              background: hasText ? 'rgba(255,255,255,0.25)' : '#ccc',
              margin: '0 5px',
              display: 'inline-block',
              borderRadius: 1
            }} />
            <IoChevronDown size={12} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default ChatWindow; 