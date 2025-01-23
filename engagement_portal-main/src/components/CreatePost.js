import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage
      const response = await axios.post('http://localhost:5000/posts', {
        ...formData,
        author_id: userId,
      });

      if (response.status === 201) {
        setMessage('Post created successfully!');
        setFormData({ title: '', description: '' });
      } else {
        setMessage('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('An error occurred while creating the post.');
    }
  };

  return (
    <div style={styles.mainContainer}>
      {/* Sidebar */}
      <div style={styles.nav}>
        <h3 style={styles.sidebarTitle}>Dashboard</h3>
        <button style={styles.navButton}>Create Post</button>
        <button style={styles.navButton}>Logout</button>
      </div>

      {/* Main Content */}
      <div style={styles.contentContainer}>
        {/* Toolpad */}
        <div style={styles.toolpad}>
          <h2 style={styles.toolpadTitle}>Create Your Post</h2>
          <p style={styles.toolpadSubtitle}>Share your thoughts with the community!</p>
        </div>

        {/* Form */}
        <div style={styles.createPostContainer}>
          {message && <p style={styles.message}>{message}</p>}
          <form onSubmit={handleSubmit} style={styles.postForm}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.label}>
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="description" style={styles.label}>
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                style={styles.textarea}
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  nav: {
    width: '20%',
    background: 'linear-gradient(45deg, #3498db, #8e44ad)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
  },
  sidebarTitle: {
    fontSize: '22px',
    marginBottom: '30px',
    fontWeight: 'bold',
    color: '#fff',
  },
  navButton: {
    backgroundColor: '#fff',
    color: '#3498db',
    border: 'none',
    padding: '12px 20px',
    margin: '10px 0',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
    transition: 'background-color 0.3s',
  },
  navButtonHover: {
    backgroundColor: '#2980b9',
  },
  contentContainer: {
    width: '80%',
    padding: '20px',
    marginLeft: '20%',
    backgroundColor: '#ecf0f1',
    overflowY: 'auto',
  },
  toolpad: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  toolpadTitle: {
    fontSize: '24px',
    margin: '0',
  },
  toolpadSubtitle: {
    fontSize: '16px',
    marginTop: '5px',
  },
  createPostContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  message: {
    textAlign: 'center',
    fontSize: '16px',
    marginBottom: '20px',
    color: 'green',
  },
  postForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    resize: 'none',
    height: '100px',
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
