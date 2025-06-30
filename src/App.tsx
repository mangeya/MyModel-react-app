import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Calendar, MapPin, Upload } from 'lucide-react';

interface Topic {
  topic: string;
  description: string;
  "top words": string[];
}

interface Event {
  Event: string;
  Date: string;
  Location: string;
  Description: string;
}

interface UserData {
  Name: string;
  Age: number;
  Location: string;
  "Relevant Topics": Topic[];
  "Relevant Events": Event[];
}

interface UserStatCardProps { // interface defined for user data name age location
  userData: UserData; // prop holds data
}

const UserStatCard: React.FC<UserStatCardProps> = ({ userData }) => { /// Define the UserStatCard function component as a React function component with props
  const [profileImage, setProfileImage] = useState<string | null>(null); // will hold url string or null
  const [expandedTopics, setExpandedTopics] = useState<boolean>(false); // toggle
  const [expandedEvents, setExpandedEvents] = useState<boolean>(false); // toggle





  const textparse = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {if (part.startsWith('**') && part.endsWith('**')) { const boldText = part.slice(2, -2); return <strong key={index}>{boldText}</strong>;}return part;});};

  // fn - upload image
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // defuault API loads file array from machine. defaults to null
    if (file) { // if file is selected
      // read the selecteed file content,
      const reader = new FileReader(); // FileReader reads the contents of the selected file (image)
      reader.onload = (e) => { // event handler e. reader is loaded into e 
        setProfileImage(e.target?.result as string);// e.target is the FileReader object.
      };
      reader.readAsDataURL(file); // Start reading the file as a data URL
    }
  };

  const formatDate = (dateString: string) => { // pure js function /// Convert the date string to a Date object and format it
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric',month: 'short',day: 'numeric'});// .toLocaleDateString('en-US'  Formats the date for US English. BTS there is an API in the browser scene
  };



  // userData["Relevant Topics"].length
  return (
    <div style={styles.container}> {/* gradient background container */}
      <div style={styles.card}> {/*  main card with white background, shadow, and max width */}
        {/* Profile Section */}
        <div style={styles.profileSection}>
          <div style={styles.avatarContainer}>
            <div style={styles.avatar}>
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  style={styles.profileImage}
                />
              ) : (
                <User size={80} color="#fff" />
              )}
            </div>




            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={styles.fileInput}
              id="profile-upload"
            />





            <label htmlFor="profile-upload" style={styles.uploadButton}>




              <Upload size={16} />
              Upload Photo
            </label>
          </div>
          





          {/* Name and Age */}
          <div style={styles.nameSection}>
            <h1 style={styles.userName}>{userData.Name}, {userData.Age}</h1>
            <div style={styles.locationSection}>
              <MapPin size={18} style={styles.locationIcon} />
              <span style={styles.userLocation}>{userData.Location}</span>
            </div>
          </div>
        </div>




        {/* Relevant Topics Section */}
        <div style={styles.collapsibleSection}>
          <button
            style={styles.sectionHeader}
            onClick={() => setExpandedTopics(!expandedTopics)}
          >
            <span>Relevant Topics ({userData["Relevant Topics"].length})</span>
            {expandedTopics ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedTopics && (
            <div style={styles.sectionContent}>
              <div style={styles.topicsGrid}>
                {userData["Relevant Topics"].map((topic, index) => (
                  <div key={index} style={styles.topicCard}>
                    <h4 style={styles.topicTitle}>{topic.topic}</h4>
                    <p style={styles.topicDescription}>{textparse(topic.description)}</p>
                    <div style={styles.topWordsContainer}>
                      <span style={styles.topWordsLabel}>Key Terms:</span>
                      <div style={styles.topWords}>
                        {topic["top words"].slice(0, 10).map((word, wordIndex) => (
                          <span key={wordIndex} style={styles.topWord}>{word}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>



        {/* Relevant Events Section */}
        <div style={styles.collapsibleSection}>
          <button
            style={styles.sectionHeader}
            onClick={() => setExpandedEvents(!expandedEvents)}
          >
            <span>Relevant Events ({userData["Relevant Events"].length})</span>
            {expandedEvents ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedEvents && (
            <div style={styles.sectionContent}>
              <div style={styles.eventsGrid}>
                {userData["Relevant Events"].map((event, index) => (
                  <div key={index} style={styles.eventCard}>
                    <div style={styles.eventHeader}>
                      <h4 style={styles.eventTitle}>{event.Event}</h4>
                      <div style={styles.eventMeta}>
                        <span style={styles.eventDate}>
                          <Calendar size={14} style={styles.icon} />
                          {formatDate(event.Date)}
                        </span>
                        <span style={styles.eventLocation}>
                          <MapPin size={14} style={styles.icon} />
                          {event.Location}
                        </span>
                      </div>
                    </div>
                    <p style={styles.eventDescription}>{event.Description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    padding: '20px',
    background: 'linear-gradient(135deg, #1f1f23 0%, #2d2d35 50%, #1a1a1e 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  
  card: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  } as React.CSSProperties,
  
  profileSection: {
    background: 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #A855F7 100%)',
    padding: '50px 20px 40px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties,
  
  avatarContainer: {
    position: 'relative',
    display: 'inline-block',
  } as React.CSSProperties,
  
  avatar: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    backgroundColor: '#5B21B6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    border: '6px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  } as React.CSSProperties,
  
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as React.CSSProperties,
  
  fileInput: {
    display: 'none',
  } as React.CSSProperties,
  
  uploadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    padding: '10px 20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  
  nameSection: {
    marginTop: '20px',
  } as React.CSSProperties,
  
  userName: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#fff',
    margin: '0 0 12px 0',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  
  locationSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  } as React.CSSProperties,
  
  locationIcon: {
    color: 'rgba(255, 255, 255, 0.9)',
    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
  } as React.CSSProperties,
  
  userLocation: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '500',
    textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
  } as React.CSSProperties,
  
  collapsibleSection: {
    borderTop: '1px solid #f0f0f0',
  } as React.CSSProperties,
  
  sectionHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 20px',
    background: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  
  sectionContent: {
    padding: '25px',
    backgroundColor: '#fafafa',
    borderBottom: '3px solid #6B46C1',
  } as React.CSSProperties,
  
  topicsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  } as React.CSSProperties,
  
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  } as React.CSSProperties,
  
  topicCard: {
    padding: '20px',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    height: 'fit-content',
  } as React.CSSProperties,
  
  topicTitle: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#2d3748',
    background: 'linear-gradient(135deg, #6B46C1, #8B5CF6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties,
  
  topicDescription: {
    margin: '0 0 16px 0',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#4a5568',
  } as React.CSSProperties,
  
  topWordsContainer: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: 'rgba(107, 70, 193, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(107, 70, 193, 0.1)',
  } as React.CSSProperties,
  
  topWordsLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#6B46C1',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
    display: 'block',
  } as React.CSSProperties,
  
  topWords: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  } as React.CSSProperties,
  
  topWord: {
    fontSize: '12px',
    padding: '6px 12px',
    background: 'linear-gradient(135deg, #6B46C1, #8B5CF6)',
    color: '#fff',
    borderRadius: '16px',
    fontWeight: '600',
    textTransform: 'capitalize',
    boxShadow: '0 2px 4px rgba(107, 70, 193, 0.3)',
    transition: 'transform 0.2s ease',
  } as React.CSSProperties,
  
  eventCard: {
    padding: '20px',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    height: 'fit-content',
  } as React.CSSProperties,
  
  eventHeader: {
    marginBottom: '8px',
  } as React.CSSProperties,
  
  eventTitle: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#2d3748',
    background: 'linear-gradient(135deg, #6B46C1, #8B5CF6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties,
  
  eventMeta: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  
  eventDate: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: '#666',
    fontWeight: '500',
  } as React.CSSProperties,
  
  eventLocation: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: '#666',
    fontWeight: '500',
  } as React.CSSProperties,
  
  eventDescription: {
    margin: '12px 0 0 0',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#4a5568',
  } as React.CSSProperties,
  
  icon: {
    marginRight: '8px',
    flexShrink: 0,
  } as React.CSSProperties,
};

// Example usage with the provided data
const testData: UserData = {
  "Name": "John Doe",
  "Age": 30,
  "Location": "New York, New York, USA",
  "Relevant Topics": [
    {
      "topic": "Topic 1: Technology and Development",
      "description": "The common topic of the provided words is likely **technology**. \n\n**Aspects and Sub-topics**:\n1. **Software Development**: 'developers', 'platform', 'engineering'\n2. **Artificial Intelligence**: 'intelligent', 'insights', 'machines', 'intelligence'\n3. **Data Analysis**: 'dataset', 'processing', 'analysis'\n4. **Security**: 'secure', 'cybersecurity', 'threats'\n5. **Innovation**: 'framework', 'transformative', 'transforming'",
      "top words": ["article", "developers", "supportive", "platform", "succeed", "designed", "invitations", "logging", "advice", "translated", "engineering", "intelligent", "insights", "manager", "medical", "brain", "built-in", "customize", "console", "capabilities"]
    },
    {
      "topic": "Topic 2: Artistic Events",
      "description": "The common topic of the provided words appears to be **\"Arts and Entertainment.\"**\n\nVarious aspects and sub-topics of this topic include:\n- **Literature:** author, storytelling, tale, literary\n- **Music and Performance:** album, playlist, concert, musician, performances\n- **Film and Cinematography:** cinematic, thriller, stage, original\n- **Creativity and Innovation:** creativity, unique, imagination\n- **Cultural Celebrations:** celebrations, exhibitions, commemorations",
      "top words": ["criterion.com", "shape", "forever", "author", "includes", "honor", "perks", "discounts", "dates", "artist", "hope", "creativity", "students", "pages", "sets", "tale", "issues", "feeling", "activities", "officially"]
    },
    {
      "topic": "Topic 3: Financial Services",
      "description": "The common topic of the provided words is **\"Financial Services and Products\"**. \n\n**Aspects and Sub-Topics:**\n1. **Banking and Loans:** lender, debt, refinance, loans.\n2. **Credit and Payments:** bills, billing, scores, payment methods.\n3. **Financial Management:** funds, expenses, recurring charges, financial decisions.\n4. **Credit Cards:** card designed, rates, cashback, limits.\n5. **Personal Finance:** estate, responsible, financial decisions, consumer benefits.",
      "top words": ["lender", "bills", "respective", "pursuant", "debt", "unable", "referenced", "trademark", "primarily", "approved", "scores", "e-mails", "comparison", "perform", "loans", "recurringcharges", "refinance", "billing", "funds", "expires"]
    }
  ],
  "Relevant Events": [
    { "Event": "Tech Conference 2023", "Date": "2025-06-15", "Location": "San Francisco, CA", "Description": "A conference focusing on the latest in technology and innovation." },
    { "Event": "Art Exhibition Opening", "Date": "2025-06-01", "Location": "New York, NY", "Description": "An exhibition showcasing contemporary artists." },
    { "Event": "Financial Services Expo", "Date": "2025-06-20", "Location": "San Francisco, CA", "Description": "An expo featuring the latest in financial services and products." },
    { "Event": "Literature Symposium", "Date": "2025-06-10", "Location": "Los Angeles, CA", "Description": "A symposium discussing the future of literature and storytelling." },
    { "Event": "Music Festival", "Date": "2025-06-05", "Location": "New York, NY", "Description": "A festival celebrating various music genres with live performances." },
    { "Event": "Film Screening", "Date": "2025-06-15", "Location": "San Francisco, CA", "Description": "A screening of independent films followed by a Q&A with the filmmakers." },
    { "Event": "Film Screening 2", "Date": "2026-06-15", "Location": "San Francisco, CA", "Description": "A screening of independent films followed by a Q&A with the filmmakers." }
  ]

};

export default function App() {
  return <UserStatCard userData={testData} />;
}