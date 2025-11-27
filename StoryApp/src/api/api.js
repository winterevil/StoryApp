import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://10.0.2.2:8080/api";

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

// Lấy danh sách truyện
export const fetchStories = async () => {
  try {
    const token = await getToken();

    const res = await fetch(`${API_BASE_URL}/stories`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
  } catch (err) {
    console.error("Lỗi fetch stories:", err);
    return [];
  }
};

export const fetchStoriesByCategory = async (categoryId) => {
  try {
    const token = await getToken();

    const res = await fetch(`${API_BASE_URL}/stories/category/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
  } catch (err) {
    console.error("Lỗi fetch stories by category:", err);
    return [];
  }
};

export const fetchStoryById = async (storyId) => {
  try {
    const token = await getToken();

    const res = await fetch(`${API_BASE_URL}/stories/${storyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const text = await res.text();
    return text ? JSON.parse(text) : null;

  } catch (error) {
    console.error("Lỗi fetchStoryById:", error);
    return null;
  }
};


export const fetchCategories = async () => {
  try {
    const token = await getToken();

    const res = await fetch(`${API_BASE_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
  } catch (err) {
    console.error("Lỗi fetch categories:", err);
    return [];
  }
};

export const fetchChapters = async (storyId) => {
  try {
    const token = await getToken();

    const res = await fetch(`${API_BASE_URL}/chapters/story/${storyId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
  } catch (err) {
    console.error("Lỗi fetch chapters:", err);
    return [];
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { error: (await res.json()).error || "Login failed" };
    }

    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
};

// REGISTER
export const registerUser = async (full_name, email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, password }),
    });

    return await res.json();
  } catch (err) {
    console.error("Lỗi register:", err);
    return { error: "Network error" };
  }
};

export const fetchUserById = async (id) => {
  try {
    const token = await getToken();

    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
};

export const updateUser = async (id, data) => {
  try {
    const token = await getToken();

    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
};

// Lấy danh sách favorite
export const fetchFavorites = async (userId) => {
  try {
    const token = await getToken();

    const res = await fetch(`${API_BASE_URL}/favorites/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const text = await res.text();

    return text ? JSON.parse(text) : [];
  } catch (err) {
    console.error("Lỗi fetch favorites:", err);
    return [];
  }
};

// Add favorite
export const addFavorite = async (userId, storyId) => {
  try {
    const token = await getToken();

    const res = await fetch(
      `${API_BASE_URL}/favorites/add?userId=${userId}&storyId=${storyId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const text = await res.text();

    return text ? JSON.parse(text) : { message: "Added" };
  } catch (err) {
    console.error("Lỗi add favorite:", err);
    return { error: "Network error" };
  }
};

// Remove favorite
export const removeFavorite = async (userId, storyId) => {
  try {
    const token = await getToken();

    const res = await fetch(
      `${API_BASE_URL}/favorites/remove?userId=${userId}&storyId=${storyId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const text = await res.text();

    return text ? JSON.parse(text) : { message: "Removed" };
  } catch (err) {
    console.error("Lỗi remove favorite:", err);
    return { error: "Network error" };
  }
};
