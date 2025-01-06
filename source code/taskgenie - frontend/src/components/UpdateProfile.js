import React, { useState, useEffect, useContext } from 'react';
import { storeUser, getUserByEmail } from './indexedDB.js'; // IndexedDB utility methods
import { FaEdit } from 'react-icons/fa'; // For edit icons
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Assume you have a UserContext for user data
import "../css/imageup.css";
import ad from '../Assets/avatardefault.webp';

const UpdateProfile = () => {
    const [editingField, setEditingField] = useState(null); // Track which field is being edited
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        serviceTypes: [],
        experience: '',
        profileImage: '',
        password: '', // New password field
        confirmPassword: '', // Confirm password field
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { user, updateUser } = useContext(UserContext); // Get user details from context
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = await getUserByEmail(user?.email);
                if (storedUser) {
                    setFormData({
                        firstName: storedUser.firstName || '',
                        lastName: storedUser.lastName || '',
                        email: storedUser.email || '',
                        address: storedUser.address || '',
                        serviceTypes: storedUser.serviceTypes || [],
                        experience: storedUser.experience || '',
                        profileImage: storedUser.profileImage || '',
                        password: '', // Don't load the password from IndexedDB for security reasons
                        confirmPassword: '',
                    });
                }
            } catch (err) {
                console.error('Failed to fetch user data:', err);
            }
        };

        if (user) fetchUserData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!formData.firstName || !formData.lastName) {
            setError('First and Last Name are required');
            return;
        }
        if (formData.password && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        try {
            const updatedUser = { ...formData };
    
            // Fetch the existing user data
            const storedUser = await getUserByEmail(updatedUser.email);
    
            if (storedUser) {
                // Retain existing password if not explicitly changed
                updatedUser.password = updatedUser.password || storedUser.password;
    
                // Store the updated user data in IndexedDB
                await storeUser(updatedUser);
    
                // Update UserContext and localStorage
                updateUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
    
                setSuccessMessage('Profile updated successfully!');
                setEditingField(null); // Exit edit mode
            } else {
                setError('User not found. Please try again.');
            }
        } catch (err) {
            setError('Failed to update profile. Please try again later.');
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                setError("File size exceeds the 5MB limit.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result;  // base64 string
                setFormData((prevData) => ({
                    ...prevData,
                    profileImage: base64Image, // Store base64 string
                }));

                // Now store the updated user in IndexedDB
                try {
                    const updatedUser = { ...formData, profileImage: base64Image };
                    await storeUser(updatedUser); // Save to IndexedDB
                } catch (err) {
                    console.error("Failed to store user:", err);
                }
            };
            reader.readAsDataURL(file); // Convert image to base64
        }
    };

    const handleEditClick = (field) => { setEditingField(field); };

    return (
        <div className='body'>
            <br></br>
            <div className="update-profile-container">
                <h2>Update Profile</h2>
                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}

                <div className="profile-info">
                    {/* Profile Image */}
                    <div className="profile-image-wrapper">
                        <div className="profile-image-container">
                            <img 
                                src={formData.profileImage ? formData.profileImage : ad} 
                                className="profile-image" 
                            />
                        </div>

                        <label htmlFor="imageUpload" className="image-upload-label">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="image-upload-input"
                        />
                    </div>

                    {/* Editable Fields */}
                    <ProfileField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName || ''}
                        isEditing={editingField === 'firstName'}
                        onChange={handleChange}
                        onEdit={() => handleEditClick('firstName')}
                    />
                    <ProfileField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName || ''}
                        isEditing={editingField === 'lastName'}
                        onChange={handleChange}
                        onEdit={() => handleEditClick('lastName')}
                    />
                    <ProfileField
                        label="Email"
                        name="email"
                        value={formData.email || ''}
                        isEditing={editingField === 'email'}
                        onChange={handleChange}
                        onEdit={() => handleEditClick('email')}
                    />
                    <ProfileField
                        label="Address"
                        name="address"
                        value={formData.address || ''}
                        isEditing={editingField === 'address'}
                        onChange={handleChange}
                        onEdit={() => handleEditClick('address')}
                    />
                    <ProfileField
                        label="Service Types"
                        name="serviceTypes"
                        value={formData.serviceTypes?.join(', ') || ''}
                        isEditing={editingField === 'serviceTypes'}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                serviceTypes: e.target.value.split(', '),
                            })
                        }
                        onEdit={() => handleEditClick('serviceTypes')}
                    />
                    <ProfileField
                        label="Experience"
                        name="experience"
                        value={formData.experience || ''}
                        isEditing={editingField === 'experience'}
                        onChange={handleChange}
                        onEdit={() => handleEditClick('experience')}
                    />

                    {/* Password Fields */}
                    <ProfileField
                        label="New Password"
                        name="password"
                        value={formData.password || ''}
                        isEditing={editingField === 'password'}
                        onChange={handleChange}
                        type="password" // Hide password text
                        onEdit={() => handleEditClick('password')}
                    />
                    <ProfileField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword || ''}
                        isEditing={editingField === 'confirmPassword'}
                        onChange={handleChange}
                        type="password" // Hide confirm password text
                        onEdit={() => handleEditClick('confirmPassword')}
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
            </div>
            <br></br>
        </div>
    );
};

// Helper component for individual fields
const ProfileField = ({ label, name, value, isEditing, onChange, onEdit, type = "text" }) => (
    <div className="profile-field">
        <label>{label}</label>
        <div className="field-display">
            {isEditing ? (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="profile-input"
                />
            ) : (
                <span>{value}</span>
            )}
            <FaEdit onClick={onEdit} className="edit-icon" />
        </div>
    </div>
);

export default UpdateProfile;
