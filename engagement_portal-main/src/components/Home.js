import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts'); // Adjust the URL if needed
        console.log(response.data); // Log the response to verify data
        setPosts(response.data); // Set the posts in state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-500 py-12 text-center text-white">
        <h1 className="text-5xl font-extrabold tracking-tight">
           Engagement Portal
        </h1>
        <p className="mt-4 text-lg">
          Explore the latest posts and updates from the community!
        </p>
      </header>

      {/* Posts Section */}
      <div className="mt-10 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Latest Posts
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No posts available at the moment.
            </p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 line-clamp-2 mb-4">
                  {post.description}
                </p>
                <p className="text-gray-500 text-sm">
                  By {post.User ? post.User.name : 'Unknown'}
                </p>
                <button className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                  Read More
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 bg-gray-800 text-white py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Engagement Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
