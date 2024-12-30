import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import StatusIndicator from './StatusIndicator';

const MemberList = ({ members, teamIndex, orgIndex, setOrganizations }) => {
  const defaultImageURL =
    'https://static.vecteezy.com/system/resources/thumbnails/041/641/685/small/3d-character-people-close-up-portrait-smiling-nice-3d-avartar-or-icon-png.png';

  const [localMembers, setLocalMembers] = useState([]);

  // Load members from localStorage
  useEffect(() => {
    const storedOrganizations = JSON.parse(localStorage.getItem('organizations')) || [];
    const org = storedOrganizations[orgIndex];
    const team = org ? org.teams[teamIndex] : null;
    const membersWithDefaultImage = (team ? team.members : []).map((member) => ({
      ...member,
      image: member.image || defaultImageURL, // Apply default image
    }));
    setLocalMembers(membersWithDefaultImage);
  }, [orgIndex, teamIndex]);

  const addMember = () => {
    const name = prompt('Enter Member Name:');
    const id = prompt('Enter Member ID:');
    if (name && id) {
      const newMembers = [
        ...localMembers,
        { name, id, image: defaultImageURL, fileUrl: null }, // New member gets default image
      ];
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

  const handleFileUpload = (index, file) => {
    const updatedMembers = [...localMembers];
    updatedMembers[index].fileUrl = URL.createObjectURL(file); // Generate URL for the uploaded file
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

  return (
    <div style={{ marginLeft: '20px' }}>
      <h4>Members</h4>
      <button onClick={addMember}>Add Member</button>
      <ul>
        {localMembers.map((member, index) => (
          <li key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Circle for Member Image */}
              <label
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) =>
                    e.target.files[0] && handleImageUpload(index, e.target.files[0])
                  }
                />
                <img
                  src={member.image}
                  alt="Member"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </label>

              {/* Member Details */}
              <div>
                <strong>{member.name}</strong> (ID: {member.id}){' '}
                <StatusIndicator status={member.image ? 'green' : 'red'} />
              </div>

              {/* File Upload for Additional Files */}
              {!member.fileUrl ? (
                <FileUpload
                  onUpload={(file) => handleFileUpload(index, file)}
                />
              ) : (
                <a
                  href={member.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: '10px',
                    textDecoration: 'underline',
                    color: 'blue',
                  }}
                >
                  Open File
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;