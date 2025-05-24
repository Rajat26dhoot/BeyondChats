import React, { useState, useRef, useEffect } from 'react';
import { IoClose, IoSend, IoNewspaperOutline, IoDocumentTextOutline, IoArrowForward, IoPeopleOutline, IoFolderOutline, IoDocumentOutline, IoArrowUpOutline, IoEllipsisHorizontal, IoChevronDownOutline, IoLinkOutline } from 'react-icons/io5';

function RightPanel({ onClose, onSendMessage, initialText }) {
  const [input, setInput] = useState(initialText || "");
  const [isFocused, setIsFocused] = useState(false);
  const [activeTab, setActiveTab] = useState('copilot');
  const [hasChat, setHasChat] = useState(false);
  const [composerHover, setComposerHover] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const marker1Ref = useRef(null);
  const marker2Ref = useRef(null);
  const isActive = typeof input === 'string' && input.trim().length > 0;

  // Update input when initialText changes
  useEffect(() => {
    if (initialText) {
      setInput(initialText);
    }
  }, [initialText]);

  // Add typing animation effect
  useEffect(() => {
    if (hasChat) {
      setIsTyping(true);
      const fullText = ` I understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. To assist you with your refund request, could you please provide your order ID and proof of purchase. Please note: We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding. Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back. Your refund will be automatically issued once you put it in the post.`;
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(prev => prev + fullText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 10); // Increased speed from 20ms to 10ms

      return () => clearInterval(typingInterval);
    }
  }, [hasChat]);

  // Helper to clamp tooltip within viewport
  const getTooltipPosition = (ref) => {
    if (!ref.current) return {};
    const rect = ref.current.getBoundingClientRect();
    const tooltipWidth = 280; // Reduced from 360px
    const tooltipHeight = 200; // px, approx
    const margin = 12; // px
    const gap = 8; // px between marker and tooltip

    // Horizontal positioning
    let left = rect.left - tooltipWidth - gap;
    if (left < margin) left = margin;

    // Vertical positioning
    let bottom = window.innerHeight - rect.top + gap;
    const top = rect.bottom + gap;
    
    // If tooltip would go below viewport, position it above the marker
    if (bottom + tooltipHeight > window.innerHeight - margin) {
      return {
        position: 'fixed',
        left: left,
        top: top,
        zIndex: 1000
      };
    }

    return {
      position: 'fixed',
      left: left,
      bottom: bottom,
      zIndex: 1000
    };
  };

  // Handler for sending a message
  const handleSend = () => {
    if (isActive) {
      setHasChat(true);
      setInput("");
    }
  };

  const handleAddToComposer = (message) => {
    if (onSendMessage) {
      onSendMessage(message);
    }
  };

  // Details panel content
  const detailsContent = (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%', overflow: 'hidden', background: 'white' }}>
      {/* Assignee/Team */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.7rem 1.2rem 0.3rem 1.2rem', gap: 16 }}>
        <div style={{ color: '#888', fontWeight: 600, fontSize: '0.92rem', minWidth: 70 }}>Assignee</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: '0.92rem' }}>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Brian Byrne" style={{ width: 24, height: 24, borderRadius: '50%' }} />
          Brian Byrne
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.1rem 1.2rem 0.7rem 1.2rem', gap: 16 }}>
        <div style={{ color: '#888', fontWeight: 600, fontSize: '0.92rem', minWidth: 70 }}>Team</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: '0.92rem' }}>
          <IoPeopleOutline size={16} /> Unassigned
        </div>
      </div>
      {/* LINKS section */}
      <div style={{ padding: '0.3rem 1.2rem 0 1.2rem' }}>
        <div style={{ color: 'black', fontWeight: 700, fontSize: '0.95rem', marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          LINKS <IoLinkOutline size={16} style={{ color: 'black', cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><IoFolderOutline size={16} style={{ color: 'black' }} /> Tracker ticket</span>
            <span style={{ background: '#f3f4f7', borderRadius: 8, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'black', cursor: 'pointer' }}>+</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><IoDocumentOutline size={16} style={{ color: 'black' }} /> Back-office tickets</span>
            <span style={{ background: '#f3f4f7', borderRadius: 8, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'black', cursor: 'pointer' }}>+</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 0' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><IoArrowUpOutline size={16} style={{ color: 'black', transform: 'rotate(45deg)' }} /> Side conversations</span>
            <span style={{ background: '#f3f4f7', borderRadius: 8, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'black', cursor: 'pointer' }}>+</span>
          </div>
        </div>
      </div>
      {/* Collapsible section headers (static) */}
      <div style={{ marginTop: 10 }}>
        {['USER DATA', 'CONVERSATION ATTRIBUTES', 'COMPANY DETAILS', 'SALESFORCE', 'STRIPE', 'JIRA FOR TICKETS'].map((section) => (
          <div key={section} style={{ padding: '0.45rem 1.2rem', fontWeight: 700, color: 'black', fontSize: '0.95rem', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            {section}
            <IoChevronDownOutline size={16} style={{ color: 'black' }} />
          </div>
        ))}
      </div>
      {/* Bottom bar: Edit apps and chat icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 1.2rem 1.2rem 1.2rem',
        borderTop: '1px solid #f0f0f0',
        marginTop: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: 'black', fontSize: '1rem' }}>
          <IoEllipsisHorizontal size={18} style={{ marginRight: 8 }} />
          Edit apps
        </div>
        <div style={{ position: 'relative', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            background: '#1769ff',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Message icon (simple SVG for chat bubble) */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="12" rx="4" fill="#fff"/>
              <rect x="7" y="17" width="10" height="2" rx="1" fill="#fff"/>
            </svg>
            {/* Red notification dot */}
            <span style={{
              position: 'absolute',
              top: 7,
              right: 7,
              width: 9,
              height: 9,
              background: '#e53935',
              borderRadius: '50%',
              border: '2px solid #fff'
            }} />
          </div>
        </div>
      </div>
    </div>
  );

  // Copilot panel content
  const copilotContent = (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', minHeight: '100%', width: '100%' }}>
      {!hasChat ? (
        // Original Copilot greeting
        <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
          <div style={{ fontSize: 38, marginBottom: 16, color: '#222' }}>
            <span style={{ background: '#222', color: '#fff', borderRadius: 12, padding: '8px 14px', display: 'inline-block' }}>🧠</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.18rem', marginBottom: 6 }}>Hi, I'm Fin AI Copilot</div>
          <div style={{ color: '#888', fontSize: '1rem' }}>Ask me anything about this conversation.</div>
        </div>
      ) : (
        // Chat UI after sending a message
        <div style={{ 
          width: '100%', 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'stretch', 
          justifyContent: 'flex-start', 
          padding: '0.7rem 0.3rem 0 0.3rem', 
          minHeight: 0,
          height: 'calc(100% - 65px)' // Account for bottom bar height
        }}>
          {/* User message */}
          <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 10, paddingLeft: 4 }}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 7 }} />
            <div style={{ background: '#fff', borderRadius: 10, padding: '0.45rem 0.7rem', fontWeight: 600, color: '#222', fontSize: '0.90rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              How do I get a refund?
            </div>
          </div>
          {/* AI message */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 10, paddingTop: 10 }}>
            <div style={{ 
              width: 25, 
              height: 25, 
              borderRadius: '50%', 
              background: '#222', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: 12, 
              color: '#fff', 
              marginRight: 7, 
              marginLeft: 5, 
              textAlign: 'center',
              lineHeight: '16px',
            }}>
              <span style={{ fontWeight: 700, textTransform: 'uppercase', padding: 3 }}>Fin</span>
            </div>
            <div style={{ 
              background: 'linear-gradient(180deg,rgb(215, 224, 254) 0%,rgb(250, 213, 226) 100%)', 
              borderRadius: 10, 
              padding: '0.7rem 0.9rem', 
              color: '#222', 
              fontSize: '0.92rem', 
              fontWeight: 500, 
              boxShadow: '0 1px 5px rgba(0,0,0,0.04)', 
              marginRight: 15, 
              display: 'flex', 
              flexDirection: 'column',
              textAlign: 'left', 
              position: 'relative',
              transition: 'all 0.3s ease',
              minHeight: isTyping ? '100px' : 'auto',
              opacity: isTyping ? 0.8 : 1
            }}>
              <span>
                {displayedText}
                {!isTyping && (
                  <>
                    <span
                      ref={marker1Ref}
                      style={{ color: '#3b4cca', fontWeight: 700, cursor: 'pointer', position: 'relative', marginLeft: 2 }}
                      onMouseEnter={() => {
                        setHoveredMarker('1');
                        setTooltipStyle(getTooltipPosition(marker1Ref));
                      }}
                      onMouseLeave={() => setHoveredMarker(null)}
                    >
                      ①
                      {hoveredMarker === '1' && (
                        <div style={{
                          ...tooltipStyle,
                          background: '#fff',
                          borderRadius: 14,
                          boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
                          padding: '1.1rem 1.2rem 1.1rem 1.2rem',
                          minWidth: 280,
                          maxWidth: 280,
                          color: '#222',
                          fontSize: '1rem',
                          fontWeight: 400,
                          textAlign: 'left',
                          border: '1.5px solid #eee',
                          whiteSpace: 'normal',
                        }}>
                          <div style={{ fontWeight: 700, fontSize: '1.13rem', marginBottom: 2 }}>Getting a refund</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.97rem', marginBottom: 8 }}>
                            <span style={{ background: '#ffe066', color: '#222', borderRadius: 5, padding: '2px 7px', fontWeight: 700, fontSize: 13 }}>Public article</span>
                            <span style={{ color: '#888' }}>· Amy Adams · 1d ago</span>
                          </div>
                          <div style={{ fontSize: '1.01rem', marginBottom: 18, marginTop: 2 }}>
                             We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. This guide outlines the simple steps to help you navigate the refund process and ensure a smooth resolution to your concern.
                          </div>
                          <div style={{ borderTop: '1.5px solid #eee', paddingTop: 10, textAlign: 'center' }}>
                            <div 
                              onClick={() => handleAddToComposer("We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. This guide outlines the simple steps to help you navigate the refund process and ensure a smooth resolution to your concern.")}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                background: '#fff',
                                border: '1.5px solid #222',
                                borderRadius: 8,
                                padding: '9px 22px',
                                fontWeight: 700,
                                color: '#222',
                                width: '80%',
                                fontSize: '1.05rem',
                                cursor: 'pointer',
                                marginTop: 2,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  background: '#f8f8f8',
                                  transform: 'translateY(-1px)'
                                }
                              }}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }}>
                                <path d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5z" fill="#3b4cca"/>
                                <path d="M14.06 6.44a1.5 1.5 0 0 0 0-2.12l-1.38-1.38a1.5 1.5 0 0 0-2.12 0l-1.06 1.06 3.5 3.5 1.06-1.06z" fill="#3b4cca"/>
                              </svg>
                              Add to composer
                            </div>
                          </div>
                        </div>
                      )}
                    </span>
                  </>
                )}
              </span>
              {!isTyping && (
                <>
                  <div style={{ height: '0.8rem' }}></div>
                  <b>Please note:</b><br />
                  We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding.
                  <div style={{ height: '0.8rem' }}></div>
                  <span>
                    Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back. Your refund will be automatically issued once you put it in the post.
                    <span
                      ref={marker2Ref}
                      style={{ color: '#3b4cca', fontWeight: 700, cursor: 'pointer', position: 'relative', marginLeft: 2 }}
                      onMouseEnter={() => {
                        setHoveredMarker('2');
                        setTooltipStyle(getTooltipPosition(marker2Ref));
                      }}
                      onMouseLeave={() => setHoveredMarker(null)}
                    >
                      ②
                      {hoveredMarker === '2' && (
                        <div style={{
                          ...tooltipStyle,
                          background: '#fff',
                          borderRadius: 14,
                          boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
                          padding: '1.1rem 1.2rem 1.1rem 1.2rem',
                          minWidth: 280,
                          maxWidth: 280,
                          color: '#222',
                          fontSize: '1rem',
                          fontWeight: 400,
                          textAlign: 'left',
                          border: '1.5px solid #eee',
                          whiteSpace: 'normal',
                        }}>
                          <div style={{ fontWeight: 700, fontSize: '1.13rem', marginBottom: 2 }}>Refund for an unwanted gift</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.97rem', marginBottom: 8 }}>
                            <span style={{ background: '#ffe066', color: '#222', borderRadius: 5, padding: '2px 7px', fontWeight: 700, fontSize: 13 }}>Conversation</span>
                            <span style={{ color: '#888' }}>· Theresa Eds · 3d ago</span>
                          </div>
                          <div style={{ fontSize: '1.01rem', marginBottom: 18, marginTop: 2 }}>
                            <span style={{ background: '#eee', borderRadius: 4, padding: '2px 7px', fontWeight: 600, fontSize: 13, marginRight: 7 }}>Summary</span>
                            Unfortunately, we're only able to process refunds for orders that were placed within the last 60 days. Your order was placed well past the cut off date.
                          </div>
                          <div style={{ borderTop: '1.5px solid #eee', paddingTop: 10, textAlign: 'center' }}>
                            <div 
                              onClick={() => handleAddToComposer("Unfortunately, we're only able to process refunds for orders that were placed within the last 60 days. Your order was placed well past the cut off date.")}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                background: '#fff',
                                border: '1.5px solid #222',
                                borderRadius: 8,
                                width: '80%',
                                padding: '9px 22px',
                                fontWeight: 700,
                                color: '#222',
                                fontSize: '1.05rem',
                                cursor: 'pointer',
                                marginTop: 2,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  background: '#f8f8f8',
                                  transform: 'translateY(-1px)'
                                }
                              }}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }}>
                                <path d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5z" fill="#3b4cca"/>
                                <path d="M14.06 6.44a1.5 1.5 0 0 0 0-2.12l-1.38-1.38a1.5 1.5 0 0 0-2.12 0l-1.06 1.06 3.5 3.5 1.06-1.06z" fill="#3b4cca"/>
                              </svg>
                              Add to composer
                            </div>
                          </div>
                        </div>
                      )}
                    </span>
                  </span>
                  <div style={{ position: 'relative', alignSelf: 'stretch', marginTop: 12 }}>
                    {/* Info box absolutely positioned above the button */}
                    {composerHover && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: 0,
                          marginBottom: 8,
                          background: '#ffe066',
                          color: '#222',
                          borderRadius: 8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                          padding: '8px 14px',
                          fontSize: '0.80rem',
                          fontWeight: 500,
                          textAlign: 'left',
                          zIndex: 10,
                          minWidth: 260,
                          maxWidth: '100%',
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            marginBottom: 2,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          This answer uses content from an internal article
                        </div>
                        <div
                          style={{
                            fontWeight: 400,
                            fontSize: '0.75rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          Please make sure you can send this to the customer
                        </div>
                      </div>
                    )}
                    {/* The button */}
                    <div
                      onMouseEnter={() => setComposerHover(true)}
                      onMouseLeave={() => setComposerHover(false)}
                      onClick={() => handleAddToComposer("We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. To assist you with your refund request, could you please provide your order ID and proof of purchase. Please note: We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding. Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back. Your refund will be automatically issued once you put it in the post.")}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgb(234, 237, 253)',
                        border: '1.5px solid rgb(200, 207, 255)',
                        borderRadius: 11,
                        padding: '7px 18px',
                        fontWeight: 700,
                        color: '#3b4cca',
                        fontSize: '0.90rem',
                        cursor: 'pointer',
                        boxShadow: composerHover ? '0 2px 8px rgba(59,76,202,0.07)' : 'none',
                        transition: 'background 0.15s',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                          style={{ display: 'inline', verticalAlign: 'middle' }}
                        >
                          <path
                            d="M4 13.5V16h2.5l6.06-6.5-2.5-2.5L4 13.5z"
                            fill="#3b4cca"
                          />
                          <path
                            d="M14.06 6.44a1.5 1.5 0 0 0-2.12-2.12l-1.38 1.38a1.5 1.5 0 0 0 2.12 2.12l1.38-1.38z"
                            fill="#3b4cca"
                          />
                        </svg>
                        Add to composer
                      </span>
                      <span style={{ fontSize: 12, marginLeft: 8 }}>▼</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sources found section - Only show after typing is complete */}
          {!isTyping && (
            <div style={{ marginTop: 5, textAlign: 'left', paddingLeft: 28, opacity: 0, animation: 'fadeIn 0.5s ease forwards' }}>
              <div style={{ color: '#888', fontSize: '0.85rem', fontWeight: 600, marginBottom: 3 }}>15 relevant sources found</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, color: 'black', fontSize: '0.82rem', marginBottom: 1 }}>
                  <IoNewspaperOutline size={14} style={{ marginRight: 5 }} /> Getting a refund
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontWeight: 700, fontSize: '0.82rem', marginBottom: 1 }}>
                  <IoDocumentTextOutline size={14} style={{ marginRight: 5 }} /> Refund for an order placed by mistake
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontWeight: 700, fontSize: '0.82rem', marginBottom: 1 }}>
                  <IoDocumentTextOutline size={14} style={{ marginRight: 5 }} /> Refund for an unwanted gift
                </div>
              </div>
              <div style={{ color: 'black', fontWeight: 700, fontSize: '0.81rem', marginTop: 3, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                See all <IoArrowForward size={14} style={{ marginLeft: 4 }} />
              </div>
            </div>
          )}
        </div>
      )}
      {/* Bottom area: Input only (sticky at bottom) */}
      <div style={{ position: 'sticky', bottom: 0, padding: '1.2rem 1.2rem', width: '90%' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 12,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
          padding: '0.5rem 1rem',
          border: '2.5px solid #516df5',
          background: '#fff',
          transition: 'border 0.2s'
        }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask a follow up question..."
            style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: '0.9rem', color: '#222' }}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            type="button"
            disabled={!isActive}
            onClick={handleSend}
            style={{
              marginLeft: 8,
              width: 32,
              height: 32,
              border: 'none',
              borderRadius: 8,
              background: isActive ? '#222' : '#dbdbdb',
              color: isActive ? '#fff' : '#919090',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isActive ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s',
              boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.10)' : 'none',
              fontSize: 16
            }}
            tabIndex={0}
          >
            <IoSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <aside style={{ width:400, minWidth: 400, maxWidth: 400, borderLeft: '2px solid rgb(228, 228, 228)', height: '100vh', background: 'linear-gradient(to bottom,rgb(242, 245, 252) 0%,rgb(252, 244, 246) 60%,rgb(223, 231, 255) 100%)' , display: 'flex', flexDirection: 'column', position: 'relative', padding: 0, overflow: 'hidden' }}>
      {/* Tab Bar (sticky) */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 10, 
        background: '#f7f8fa', 
        display: 'flex', 
        alignItems: 'center', 
        height: 56, 
        borderBottom: '1px solid rgb(228, 228, 228)', 
        padding: '0 1rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <span
            onClick={() => setActiveTab('copilot')}
            style={{
              color: activeTab === 'copilot' ? '#3b4cca' : '#888',
              fontWeight: 700,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              borderBottom: activeTab === 'copilot' ? '2.5px solid #3b4cca' : 'none',
              height: 48,
              marginRight: 24,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: '0 4px',
              position: 'relative',
              '&:hover': {
                color: '#3b4cca',
                transform: 'translateY(-1px)'
              }
            }}
          >
            <span style={{ 
              marginRight: 6, 
              fontSize: 18, 
              display: 'flex', 
              alignItems: 'center',
              transition: 'transform 0.2s ease',
              transform: activeTab === 'copilot' ? 'scale(1.1)' : 'scale(1)'
            }}>🧠</span>
            Copilot
          </span>
          <span
            onClick={() => setActiveTab('details')}
            style={{
              color: activeTab === 'details' ? '#3b4cca' : '#888',
              fontWeight: 700,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              borderBottom: activeTab === 'details' ? '2.5px solid #3b4cca' : 'none',
              height: 48,
              marginRight: 24,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: '0 4px',
              position: 'relative',
              '&:hover': {
                color: '#3b4cca',
                transform: 'translateY(-1px)'
              }
            }}
          >
            Details
          </span>
        </div>
        <div style={{ 
          marginLeft: 'auto', 
          fontSize: 20, 
          color: '#888', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <div 
            style={{ 
              marginLeft: 12, 
              fontSize: 22, 
              color: '#888', 
              cursor: 'pointer',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: '#f0f0f0',
                color: '#666',
                transform: 'scale(1.1)'
              }
            }} 
            onClick={onClose} 
            title="Close"
          >
            <IoClose size={24} />
          </div>
        </div>
      </div>
      {/* Main content area */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {activeTab === 'copilot' ? copilotContent : detailsContent}
      </div>

      {/* Add the animation keyframes at the top of the component */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </aside>
  );
}

export default RightPanel;
