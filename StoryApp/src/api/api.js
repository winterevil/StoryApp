export const API_BASE_URL = "http://10.0.2.2:8080/api";

// Lấy danh sách truyện
export const fetchStories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stories`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch stories:", error);
    return [];
  }
};

// Lấy danh sách categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch categories:", error);
    return [];
  }
};

// Lấy danh sách chapter theo storyId
export const fetchChapters = async (storyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chapters/story/${storyId}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch chapters:", error);
    return [];
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      return { error: err.error || "Login failed" };
    }

    return await response.json();

  } catch (error) {
    return { error: "Network error" };
  }
};

export const registerUser = async (full_name, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name,
        email,
        password,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Lỗi register:", error);
    return { error: "Network error" };
  }
};

export const fetchUserById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${id}`);
    return await res.json();
  } catch (e) {
    return { error: "Network error" };
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (e) {
    return { error: "Network error" };
  }
};
