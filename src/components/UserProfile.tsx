import React from 'react';

interface UserProfileProps {
  user: { id: number; username: string };
  setUser: (user: { id: number; username: string } | null) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">Welcome, {user.username}!</h2>
        <p className="text-gray-600">User ID: {user.id}</p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;