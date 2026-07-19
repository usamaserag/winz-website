import { getApiBaseUrl } from '../lib/site';

const API_BASE_URL = getApiBaseUrl();

const getHeaders = (lang) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (lang) {
    headers['Accept-Language'] = lang;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || 'API Error');
  }
  return response.json();
};

export const communityService = {
  getBlogs: async (lang) => {
    const response = await fetch(`${API_BASE_URL}/api/news/blogs/`, {
      headers: getHeaders(lang),
    });
    return handleResponse(response);
  },

  getBlogBySlug: async (slug, lang) => {
    const response = await fetch(`${API_BASE_URL}/api/news/blogs/${slug}/`, {
      headers: getHeaders(lang),
    });
    return handleResponse(response);
  },

  getFAQs: async (lang) => {
    const response = await fetch(`${API_BASE_URL}/api/news/faqs/`, {
      headers: getHeaders(lang),
    });
    return handleResponse(response);
  },

  getFAQBySlug: async (slug, lang) => {
    const response = await fetch(`${API_BASE_URL}/api/news/faqs/${slug}/`, {
      headers: getHeaders(lang),
    });
    return handleResponse(response);
  },

  getCategories: async (lang) => {
    const response = await fetch(`${API_BASE_URL}/api/news/categories/`, {
      headers: getHeaders(lang),
    });
    return handleResponse(response);
  },

  getCategoryBySlug: async (slug, lang) => {
    const response = await fetch(`${API_BASE_URL}/api/news/categories/${slug}/`, {
      headers: getHeaders(lang),
    });
    return handleResponse(response);
  },

  getSubcategoryBySlug: async (slug, lang) => {
    const response = await fetch(`${API_BASE_URL}/api/news/subcategories/${slug}/`, {
      headers: getHeaders(lang),
    });
    return handleResponse(response);
  },
};
