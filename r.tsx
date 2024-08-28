import React, { useState, useEffect } from 'react';

export interface UserData {
  name: string;
  email: string;
  role: string;
}

interface UserProfileProps {
  userId: string;
  onButtonClick: (userData: UserData) => void;
}

export function UserProfile({ userId, onButtonClick }: UserProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://api.example.com/users/' + userId)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>{userData!.name}</h1>
      <p>Email: {userData!.email}</p>
      <p>Role: {userData!.role}</p>
      <button onClick={() => onButtonClick(userData!)}>Confirm</button>
    </div>
  );
}
