const API_URL = "https://fuschia-sudden-kookaburra.glitch.me";

export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/api/category`);

    if (!(res.status === 200 || res.status === 201)) {
      const error = await res.json();
      throw error;
    }

    const categories = await res.json();
    return categories;
  } catch (error) {
    return { error };
  }
};
