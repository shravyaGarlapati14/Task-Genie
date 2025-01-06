import React, { useEffect, useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import '../css/MyProfile.css';
import { UserContext } from './UserContext';

const MyProfile = () => {
  const [editingField, setEditingField] = useState(null); // Track which field is being edited
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || '');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setName(storedUser.name || '');
      setEmail(storedUser.email || '');
      setLocation(storedUser.location || '');
      setPhone(storedUser.phone || '');
      setJobTitle(storedUser.jobTitle || '');
      setBio(storedUser.bio || '');
      setWebsite(storedUser.website || '');
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, name, email, location, phone, jobTitle, bio, website };
    updateUser(updatedUser);
    setEditingField(null); // End editing mode after save
  };

  const handleEditClick = (field) => {
    setEditingField(field); // Set the specific field to be editable
  };

  return (
    <div className="profile-section">
      <h2>My Profile</h2>
      {user ? (
        <div className="profile-info">
          <ProfileField
            label="Name"
            value={name}
            isEditing={editingField === 'name'}
            onChange={(e) => setName(e.target.value)}
            onEdit={() => handleEditClick('name')}
          />
          <ProfileField
            label="Email"
            value={email}
            isEditing={editingField === 'email'}
            onChange={(e) => setEmail(e.target.value)}
            onEdit={() => handleEditClick('email')}
          />
          <ProfileField
            label="Location"
            value={location}
            isEditing={editingField === 'location'}
            onChange={(e) => setLocation(e.target.value)}
            onEdit={() => handleEditClick('location')}
          />
          <ProfileField
            label="Phone Number"
            value={phone}
            isEditing={editingField === 'phone'}
            onChange={(e) => setPhone(e.target.value)}
            onEdit={() => handleEditClick('phone')}
          />

          <div className="profile-actions">
            {editingField ? (
              <>
                <button onClick={handleSave} className="btn save-btn">Save</button>
                <button onClick={() => setEditingField(null)} className="btn cancel-btn">Cancel</button>
              </>
            ) : (
              <button onClick={() => setEditingField('')} className="btn edit-btn">Edit Profile</button>
            )}
          </div>
        </div>
      ) : (
        <p>No user information available. Please log in.</p>
      )}
    </div>
  );
};

// Helper component for individual profile fields with edit icons
const ProfileField = ({ label, value, isEditing, onChange, onEdit, multiline }) => (
  <div className="profile-field">
    <label>{label}</label>
    <div className="field-display">
      {isEditing ? (
        multiline ? (
          <textarea value={value} onChange={onChange} className="profile-input" />
        ) : (
          <input type="text" value={value} onChange={onChange} className="profile-input" />
        )
      ) : (
        <p>{value || 'Not provided'}</p>
      )}
      <FaEdit className="edit-icon" onClick={onEdit} />
    </div>
  </div>
);

export default MyProfile;
