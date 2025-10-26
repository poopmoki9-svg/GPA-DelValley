import React, { useState } from 'react';

const AdminPostForm = () => {
    const [postContent, setPostContent] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add submit logic
    };

    return (
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Write your post..."
                    style={{ width: '100%', height: '100px', border: '2px solid purple', borderRadius: '4px' }}
                />
                <input 
                    type="file" 
                    onChange={(e) => setPhoto(e.target.files[0])} 
                />
                <button type="submit" style={{ background: 'purple', color: 'white', padding: '10px 15px', marginTop: '10px' }}>
                    Post
                </button>
            </form>
        </div>
    );
};

export default AdminPostForm;