// import React, { useState } from 'react';

// interface TopicData {
//   topic: string;
//   description: string;
//   topWords: string[];
// }

// interface EventData {
//   Event: string;
//   Date: string;
//   Location: string;
//   Description: string;
// }

// interface UserData {
//   Name: string;
//   Age: number;
//   Location: string;
//   relevantTopics: TopicData[];
//   relevantEvents: EventData[];
// }

// interface UserProfileCardProps {
//   userData: UserData;
// }

// // Simple icon components
// const MapPin = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
//     <circle cx="12" cy="10" r="3"/>
//   </svg>
// );

// const User = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//     <circle cx="12" cy="7" r="4"/>
//   </svg>
// );

// const Calendar = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
//     <line x1="16" y1="2" x2="16" y2="6"/>
//     <line x1="8" y1="2" x2="8" y2="6"/>
//     <line x1="3" y1="10" x2="21" y2="10"/>
//   </svg>
// );

// const Tag = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
//     <line x1="7" y1="7" x2="7.01" y2="7"/>
//   </svg>
// );

// const Clock = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="12" r="10"/>
//     <polyline points="12,6 12,12 16,14"/>
//   </svg>
// );

// const ChevronDown = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <polyline points="6,9 12,15 18,9"/>
//   </svg>
// );

// const ChevronUp = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <polyline points="18,15 12,9 6,15"/>
//   </svg>
// );

// const UserProfileCard: React.FC<UserProfileCardProps> = ({ userData }) => {
//   const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
//   const [showAllEvents, setShowAllEvents] = useState(false);

//   const sortedEvents = userData.relevantEvents?.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()) || [];
//   const displayedEvents = showAllEvents ? sortedEvents : sortedEvents.slice(0, 3);

//   const toggleTopic = (index: number) => {
//     setExpandedTopic(expandedTopic === index ? null : index);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const containerStyle: React.CSSProperties = {
//     maxWidth: '1024px',
//     margin: '0 auto',
//     padding: '16px',
//     background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
//     minHeight: '100vh',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//   };

//   const cardStyle: React.CSSProperties = {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//     padding: '24px',
//     marginBottom: '24px',
//     border: '1px solid #e2e8f0'
//   };

//   const headerFlexStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//     flexWrap: 'wrap'
//   };

//   const avatarStyle: React.CSSProperties = {
//     width: '64px',
//     height: '64px',
//     background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: 'white',
//     fontSize: '24px',
//     fontWeight: 'bold'
//   };

//   const nameStyle: React.CSSProperties = {
//     fontSize: '32px',
//     fontWeight: 'bold',
//     color: '#1e293b',
//     margin: '0 0 8px 0'
//   };

//   const infoRowStyle: React.CSSProperties = {
//     display: 'flex',
//     gap: '24px',
//     color: '#64748b',
//     flexWrap: 'wrap'
//   };

//   const infoItemStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   };

//   const statsGridStyle: React.CSSProperties = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//     gap: '16px',
//     marginBottom: '24px'
//   };

//   const statCardStyle: React.CSSProperties = {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     padding: '16px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
//     border: '1px solid #e2e8f0'
//   };

//   const statFlexStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px'
//   };

//   const iconBoxStyle = (bgColor: string): React.CSSProperties => ({
//     width: '40px',
//     height: '40px',
//     backgroundColor: bgColor,
//     borderRadius: '8px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   });

//   const statNumberStyle: React.CSSProperties = {
//     fontSize: '28px',
//     fontWeight: 'bold',
//     color: '#1e293b',
//     margin: '0'
//   };

//   const statLabelStyle: React.CSSProperties = {
//     fontSize: '14px',
//     color: '#64748b',
//     margin: '0'
//   };

//   const sectionHeaderStyle: React.CSSProperties = {
//     padding: '24px',
//     borderBottom: '1px solid #e2e8f0',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   };

//   const sectionTitleStyle: React.CSSProperties = {
//     fontSize: '20px',
//     fontWeight: 'bold',
//     color: '#1e293b',
//     margin: '0'
//   };

//   const topicButtonStyle: React.CSSProperties = {
//     width: '100%',
//     padding: '16px',
//     backgroundColor: '#f8fafc',
//     border: '1px solid #e2e8f0',
//     borderRadius: '8px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     textAlign: 'left',
//     cursor: 'pointer',
//     transition: 'background-color 0.2s',
//     marginBottom: '16px'
//   };

//   const topicContentStyle: React.CSSProperties = {
//     padding: '16px',
//     backgroundColor: 'white',
//     borderTop: '1px solid #e2e8f0',
//     borderRadius: '0 0 8px 8px'
//   };

//   const keywordTagStyle: React.CSSProperties = {
//     display: 'inline-block',
//     padding: '4px 8px',
//     backgroundColor: '#dbeafe',
//     color: '#1d4ed8',
//     borderRadius: '4px',
//     fontSize: '12px',
//     fontWeight: '500',
//     margin: '2px'
//   };

//   const eventCardStyle: React.CSSProperties = {
//     border: '1px solid #e2e8f0',
//     borderRadius: '8px',
//     padding: '16px',
//     marginBottom: '16px',
//     transition: 'box-shadow 0.2s'
//   };

//   const eventHeaderStyle: React.CSSProperties = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '8px',
//     flexWrap: 'wrap',
//     gap: '8px'
//   };

//   const eventTitleStyle: React.CSSProperties = {
//     fontWeight: '600',
//     color: '#1e293b',
//     margin: '0'
//   };

//   const eventDateStyle: React.CSSProperties = {
//     fontSize: '14px',
//     color: '#64748b',
//     backgroundColor: '#f1f5f9',
//     padding: '4px 8px',
//     borderRadius: '4px'
//   };

//   const buttonStyle: React.CSSProperties = {
//     padding: '8px 16px',
//     backgroundColor: '#3b82f6',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '500',
//     transition: 'background-color 0.2s'
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Header Card */}
//       <div style={cardStyle}>
//         <div style={headerFlexStyle}>
//           <div style={avatarStyle}>
//             {userData.Name?.split(' ').map(n => n[0]).join('') || 'JD'}
//           </div>
//           <div style={{ flex: 1 }}>
//             <h1 style={nameStyle}>{userData.Name}</h1>
//             <div style={infoRowStyle}>
//               <div style={infoItemStyle}>
//                 <MapPin />
//                 <span>{userData.Location}</span>
//               </div>
//               <div style={infoItemStyle}>
//                 <User />
//                 <span>{userData.Age} years old</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div style={statsGridStyle}>
//         <div style={statCardStyle}>
//           <div style={statFlexStyle}>
//             <div style={iconBoxStyle('#dbeafe')}>
//               <div style={{ color: '#2563eb' }}>
//                 <Tag />
//               </div>
//             </div>
//             <div>
//               <p style={statNumberStyle}>{userData.relevantTopics?.length || 0}</p>
//               <p style={statLabelStyle}>Relevant Topics</p>
//             </div>
//           </div>
//         </div>
        
//         <div style={statCardStyle}>
//           <div style={statFlexStyle}>
//             <div style={iconBoxStyle('#dcfce7')}>
//               <div style={{ color: '#16a34a' }}>
//                 <Calendar />
//               </div>
//             </div>
//             <div>
//               <p style={statNumberStyle}>{userData.relevantEvents?.length || 0}</p>
//               <p style={statLabelStyle}>Relevant Events</p>
//             </div>
//           </div>
//         </div>

//         <div style={statCardStyle}>
//           <div style={statFlexStyle}>
//             <div style={iconBoxStyle('#f3e8ff')}>
//               <div style={{ color: '#9333ea' }}>
//                 <Clock />
//               </div>
//             </div>
//             <div>
//               <p style={statNumberStyle}>
//                 {sortedEvents.length > 0 ? formatDate(sortedEvents[0].Date) : 'N/A'}
//               </p>
//               <p style={statLabelStyle}>Next Event</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Relevant Topics */}
//       <div style={cardStyle}>
//         <div style={sectionHeaderStyle}>
//           <div style={{ color: '#3b82f6' }}>
//             <Tag />
//           </div>
//           <h2 style={sectionTitleStyle}>Relevant Topics</h2>
//         </div>
//         <div style={{ padding: '24px' }}>
//           {userData.relevantTopics?.map((topic, index) => (
//             <div key={index}>
//               <button
//                 onClick={() => toggleTopic(index)}
//                 style={{
//                   ...topicButtonStyle,
//                   backgroundColor: expandedTopic === index ? '#e0f2fe' : '#f8fafc'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (expandedTopic !== index) {
//                     e.currentTarget.style.backgroundColor = '#f1f5f9';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = expandedTopic === index ? '#e0f2fe' : '#f8fafc';
//                 }}
//               >
//                 <div>
//                   <h3 style={{ fontWeight: '600', color: '#1e293b', margin: '0 0 4px 0' }}>
//                     {topic.topic}
//                   </h3>
//                   <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
//                     Keywords: {topic.topWords?.slice(0, 5).join(', ')}...
//                   </p>
//                 </div>
//                 <div style={{ color: '#94a3b8' }}>
//                   {expandedTopic === index ? <ChevronUp /> : <ChevronDown />}
//                 </div>
//               </button>
//               {expandedTopic === index && (
//                 <div style={topicContentStyle}>
//                   <p style={{ color: '#374151', lineHeight: '1.6', marginBottom: '12px' }}>
//                     {topic.description}
//                   </p>
//                   <div>
//                     {topic.topWords?.map((word, wordIndex) => (
//                       <span key={wordIndex} style={keywordTagStyle}>
//                         {word}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )) || <p style={{ textAlign: 'center', color: '#64748b', padding: '16px' }}>No topics available</p>}
//         </div>
//       </div>

//       {/* Relevant Events */}
//       <div style={cardStyle}>
//         <div style={sectionHeaderStyle}>
//           <div style={{ color: '#16a34a' }}>
//             <Calendar />
//           </div>
//           <h2 style={sectionTitleStyle}>Relevant Events</h2>
//         </div>
//         <div style={{ padding: '24px' }}>
//           {displayedEvents.map((event, index) => (
//             <div key={index} style={eventCardStyle}>
//               <div style={eventHeaderStyle}>
//                 <h3 style={eventTitleStyle}>{event.Event}</h3>
//                 <span style={eventDateStyle}>{formatDate(event.Date)}</span>
//               </div>
//               <div style={{ ...infoItemStyle, marginBottom: '8px', fontSize: '14px', color: '#64748b' }}>
//                 <MapPin />
//                 <span>{event.Location}</span>
//               </div>
//               <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5', margin: '0' }}>
//                 {event.Description}
//               </p>
//             </div>
//           ))}
          
//           {sortedEvents.length > 3 && (
//             <div style={{ textAlign: 'center', marginTop: '16px' }}>
//               <button
//                 onClick={() => setShowAllEvents(!showAllEvents)}
//                 style={buttonStyle}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = '#2563eb';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = '#3b82f6';
//                 }}
//               >
//                 {showAllEvents ? 'Show Less' : `Show All ${sortedEvents.length} Events`}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfileCard;
