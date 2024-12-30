import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import StatusIndicator from './StatusIndicator';

const MemberList = ({ members, teamIndex, orgIndex, setOrganizations }) => {
  const [localMembers, setLocalMembers] = useState(members);

  // Load members from localStorage
  useEffect(() => {
    const storedOrganizations = JSON.parse(localStorage.getItem('organizations')) || [];
    const org = storedOrganizations[orgIndex];
    const team = org ? org.teams[teamIndex] : null;
    setLocalMembers(team ? team.members : []);
  }, [orgIndex, teamIndex]);

  const addMember = () => {
    const name = prompt("Enter Member Name:");
    const id = prompt("Enter Member ID:");
    if (name && id) {
      const newMembers = [...localMembers, { name, id, image: null, fileUrl: null }];
      setLocalMembers(newMembers);
      // Save to localStorage
      setOrganizations((prev) => {
        const updatedOrgs = prev.map((org, oIndex) =>
          oIndex === orgIndex
            ? {
                ...org,
                teams: org.teams.map((team, tIndex) =>
                  tIndex === teamIndex ? { ...team, members: newMembers } : team
                ),
              }
            : org
        );
        localStorage.setItem('organizations', JSON.stringify(updatedOrgs)); // Save organizations to localStorage
        return updatedOrgs;
      });
    }
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedMembers = [...localMembers];
      updatedMembers[index].image = reader.result; // Store the image URL (base64)
      setLocalMembers(updatedMembers);
      setOrganizations((prev) => {
        const updatedOrgs = prev.map((org, oIndex) =>
          oIndex === orgIndex
            ? {
                ...org,
                teams: org.teams.map((team, tIndex) =>
                  tIndex === teamIndex ? { ...team, members: updatedMembers } : team
                ),
              }
            : org
        );
        localStorage.setItem('organizations', JSON.stringify(updatedOrgs)); // Save organizations to localStorage
        return updatedOrgs;
      });
    };
    if (file) {
      reader.readAsDataURL(file); // Convert image to base64 URL
    }
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <h4>Members</h4>
      <button onClick={addMember}>Add Member</button>
      <ul>
        {localMembers.map((member, index) => (
          <li key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Circle for Member Image */}
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginRight: '10px',
                }}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt="Member"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#ccc' }} />
                )}
              </div>

              {/* Member Details */}
              <div>
                <strong>{member.name}</strong> (ID: {member.id}){' '}
                <StatusIndicator status={member.image ? 'green' : 'red'} />
              </div>

              {/* File Upload for Image */}
              <FileUpload
                onUpload={(file) => handleImageUpload(index, file)} // Passing file to parent function
              />
            </div>
            {member.fileUrl && (
              <a
                href={member.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: '10px', textDecoration: 'underline', color: 'blue' }}
              >
                Open File
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
