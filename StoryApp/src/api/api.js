export const API_BASE_URL = "http://10.0.2.2:8080/api";

export const fetchStories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stories`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch stories:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch categories:", error);
    return [];
  }
};

export const fetchChapters = async (storyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chapters/story/${storyId}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch chapters:", error);
    return [];
  }
};
