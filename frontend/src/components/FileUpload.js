import React from 'react';

const FileUpload = ({ onUpload }) => {
  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      onUpload(event.target.files[0]);
    }
  };

  return (
    <label style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
      Upload File
      <input
        type="file"
        style={{ display: 'none' }}
        accept="*/*" // Accept all file types
        onChange={handleFileChange}
      />
    </label>
  );
};

export default FileUpload;
