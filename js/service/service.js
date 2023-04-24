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

export const fetchCard = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/category/${id}`);

    if (!(res.status === 200 || res.status === 201)) {
      const error = await res.json();
      throw error;
    }

    const cards = await res.json();

    return cards;
  } catch (error) {
    return { error };
  }
};

export const fetchCreateCategory = async (data) => {
  try {
    const res = await fetch(`${API_URL}/api/category/`, {
      method: "POST",
      body: JSON.stringify(data),
    });

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

export const fetchEditCategory = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/api/category/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

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

export const fetchDeleteCategory = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/category/${id}`, {
      method: "DELETE",
    });

    if (!(res.status === 200 || res.status === 201)) {
      const error = await res.json();
      throw error;
    }

    const result = await res.json();

    return result;
  } catch (error) {
    return { error };
  }
};
