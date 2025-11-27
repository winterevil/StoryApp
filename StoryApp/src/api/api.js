import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://10.0.2.2:8080/api";

// Lấy danh sách truyện
export const fetchStories = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
        console.log("📌 TOKEN SENT TO BACKEND:", token);   // ⭐ THÊM DÒNG NÀY


    const response = await fetch(`${API_BASE_URL}/stories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi fetch stories:', error);
    return [];
  }
};

// Lấy danh sách categories
export const fetchCategories = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // ⭐ THÊM

    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`, // ⭐ THÊM
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi fetch categories:', error);
    return [];
  }
};

// Lấy danh sách chapter theo storyId
export const fetchChapters = async storyId => {
  try {
    const token = await AsyncStorage.getItem('token'); 

    const response = await fetch(`${API_BASE_URL}/chapters/story/${storyId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi fetch chapters:', error);
    return [];
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      return { error: err.error || 'Login failed' };
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const registerUser = async (full_name, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name,
        email,
        password,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Lỗi register:', error);
    return { error: 'Network error' };
  }
};

export const fetchUserById = async id => {
  try {
    const token = await AsyncStorage.getItem('token'); 

    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return await res.json();
  } catch (e) {
    return { error: 'Network error' };
  }
};

export const updateUser = async (id, data) => {
  try {
    const token = await AsyncStorage.getItem('token'); 

    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (e) {
    return { error: 'Network error' };
  }
};

// Lấy danh sách favorite theo userId
export const fetchFavorites = async (userId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/favorites/${userId}`);
    return await res.json();
  } catch (error) {
    console.error("Lỗi fetch favorites:", error);
    return [];
  }
};

export const addFavorite = async (userId, storyId) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/favorites/add?userId=${userId}&storyId=${storyId}`,
      { method: "POST" }
    );

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch (err) {
      return { message: text };
    }

  } catch (error) {
    console.error("Lỗi add favorite:", error);
    return { error: "Network error" };
  }
};

export const removeFavorite = async (userId, storyId) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/favorites/remove?userId=${userId}&storyId=${storyId}`,
      { method: "DELETE" }
    );

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  } catch (error) {
    return { error: "Network error" };
  }
};

export const fetchStoriesByCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stories/category/${categoryId}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch stories by category:", error);
    return [];
  }
};
