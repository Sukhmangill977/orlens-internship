import React from 'react';

const FileUpload = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file); // Pass the file object (not just the name) to parent
    }
  };

  return (
    <input
      type="file"
      accept="image/*" // Only allow image files
      onChange={handleFileChange}
    />
  );
};

export default FileUpload;
