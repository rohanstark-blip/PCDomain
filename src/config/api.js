const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  // Get user by Clerk ID
  async getUser(clerkId) {
    const response = await fetch(`${API_URL}/users/${clerkId}`);
    if (!response.ok && response.status !== 404) {
      throw new Error('Failed to fetch user');
    }
    if (response.status === 404) {
      return null;
    }
    return response.json();
  },

  // Create or update user
  async createUser(clerkId, email) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clerkId, email }),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  // Save a build
  async saveBuild(clerkId, buildData) {
    const response = await fetch(`${API_URL}/users/${clerkId}/builds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildData),
    });
    if (!response.ok) {
      throw new Error('Failed to save build');
    }
    return response.json();
  },

  // Delete a build
  async deleteBuild(clerkId, buildIndex) {
    const response = await fetch(`${API_URL}/users/${clerkId}/builds/${buildIndex}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete build');
    }
    return response.json();
  },

  // Get a public build by ID
  async getPublicBuild(buildId) {
    const response = await fetch(`${API_URL}/builds/${buildId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch build');
    }
    return response.json();
  },
};
