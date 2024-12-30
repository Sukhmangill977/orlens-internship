import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamList from './TeamList'; // Ensure TeamList is imported
import './OrganizationList.css'; // Import the beautified CSS file

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Load organizations from localStorage, if available
    const storedOrganizations = JSON.parse(localStorage.getItem('organizations')) || [];
    setOrganizations(storedOrganizations);
  }, []);

  const addOrganization = () => {
    const name = prompt("Enter Organization Name:", "Organization");
    const email = prompt("Enter Organization Email:");
    const location = prompt("Enter Organization Location:");

    if (name && email && location) {
      // Optimistic UI update: immediately add the new org to the top
      const newOrg = {
        id: organizations.length + 1, // This will be updated by backend, but we're just adding locally for now
        name,
        email,
        location,
        teams: []
      };
      const updatedOrganizations = [newOrg, ...organizations];
      setOrganizations(updatedOrganizations);
      
      // Save organizations to localStorage
      localStorage.setItem('organizations', JSON.stringify(updatedOrganizations));

      // Make the POST request to the backend to save the new organization
      axios.post('http://localhost:5001/api/organizations', { name, email, location })
        .then(response => {
          const orgWithId = { ...newOrg, id: response.data.id };
          // Update organizations list with backend ID
          const finalOrganizations = updatedOrganizations.map(org =>
            org.id === newOrg.id ? orgWithId : org
          );
          setOrganizations(finalOrganizations);
          localStorage.setItem('organizations', JSON.stringify(finalOrganizations));
        })
        .catch(error => {
          console.error('Error adding organization:', error);
          // Revert the optimistic update if the API request fails
          setOrganizations(organizations);
          localStorage.setItem('organizations', JSON.stringify(organizations));
        });
    }
  };

  const deleteOrganization = (id) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      // Optimistic UI update: Remove the organization immediately from the list
      const updatedOrganizations = organizations.filter(org => org.id !== id);
      setOrganizations(updatedOrganizations);
      localStorage.setItem('organizations', JSON.stringify(updatedOrganizations));

      // Send DELETE request to backend
      axios.delete(`http://localhost:5001/api/organizations/${id}`)
        .then(() => {
          console.log("Organization deleted successfully");
        })
        .catch(error => {
          console.error('Error deleting organization:', error);
          // Revert the optimistic update if the API request fails
          const orgToRevert = organizations.find(org => org.id === id);
          const revertOrganizations = [...updatedOrganizations, orgToRevert];
          setOrganizations(revertOrganizations);
          localStorage.setItem('organizations', JSON.stringify(revertOrganizations));
        });
    }
  };

  return (
    <div className="organization-list-container">
      <h2 className="title">Organizations</h2>
      <button className="add-org-button" onClick={addOrganization}>Add Organization</button>
      <ul className="organization-list">
        {organizations.map((org) => (
          <li key={org.id} className="organization-item">
            <div className="organization-info">
              <strong>{org.name}</strong> - {org.email} ({org.location})
            </div>
            <TeamList
              teams={org.teams}
              orgIndex={organizations.indexOf(org)}
              setOrganizations={setOrganizations}
            />
            <button
              className="delete-org-button"
              onClick={() => deleteOrganization(org.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
