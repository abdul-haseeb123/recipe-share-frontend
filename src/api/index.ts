import { LocalStorage } from "@/lib/utils";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = LocalStorage.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status.includes([401, 403]) && prevRequest?.sent) {
      // handle unauthorized
      prevRequest.sent = true;
      const { data } = await refreshUser();

      if (data?.statusCode === 200 && data?.data?.accessToken) {
        LocalStorage.set("token", data.data.accessToken);
        return apiClient(prevRequest);
      }
      LocalStorage.clear();
      return Promise.reject(error);
    }
  }
);
// users routes
const getCurrentUser = () => {
  return apiClient.get("/users/get-current-user");
};

const registerUser = (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  avatar: File[],
  coverImage: File[]
) => {
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  avatar && formData.append("avatar", avatar[0]);
  coverImage && formData.append("coverImage", coverImage[0]);

  return apiClient.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const loginUser = (data: { email: string; password: string }) => {
  return apiClient.post("/users/login", data);
};

const logoutUser = () => {
  return apiClient.post("/users/logout");
};

const refreshUser = () => {
  return apiClient.post("/users/refresh-token"); // returns a promise
};

const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  return apiClient.put("/users/change-current-password", data);
};

const updateProfile = (data: {
  firstName: string | undefined;
  lastName: string | undefined;
}) => {
  return apiClient.put("/users/update", data);
};

const updateCoverImage = (coverImage: File[]) => {
  const formData = new FormData();
  coverImage?.map((image) => {
    formData.append("coverImage", image);
  });
  return apiClient.put("/users/update-cover", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateAvatar = (avatar: File[]) => {
  const formData = new FormData();
  avatar?.map((image) => {
    formData.append("avatar", image);
  });
  return apiClient.put("/users/update-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteUser = () => {
  return apiClient.delete("/users/delete");
};

// recipes routes
const getRecipes = (category: string | undefined) => {
  if (category) {
    return apiClient.get(`/recipes?category=${category}`);
  }
  return apiClient.get("/recipes");
};

const getRecipesOfCurrentUser = () => {
  return apiClient.get("/recipes/current-user");
};

const getRecipe = (slug: string) => {
  return apiClient.get(`/recipes/${slug}`);
};

const createRecipe = (
  title: string,
  category: string,
  description: string,
  ingredients: string,
  instructions: string,
  coverImage: File[],
  recipeImages: File[]
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("description", description);
  formData.append("ingredients", ingredients);
  formData.append("instructions", instructions);
  coverImage && formData.append("coverImage", coverImage[0]);
  recipeImages &&
    recipeImages.map((image) => {
      formData.append("recipeImages", image);
    });
  return apiClient.post("/recipes/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateRecipe = (
  slug: string,
  data: {
    title: string | undefined;
    category: string | undefined;
    description: string | undefined;
    ingredients: string | undefined;
    instructions: string | undefined;
  }
) => {
  return apiClient.put(`/recipes/${slug}`, data);
};

const deleteRecipe = (slug: string) => {
  return apiClient.delete(`/recipes/${slug}`);
};

// reviews routes
const createReview = (
  slug: string,
  data: { rating: number; comment: string }
) => {
  return apiClient.post(`/reviews/${slug}`, data);
};
// REVIEWS UPDATE AND DELETE WILL BE ADDED LATER

export {
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
  changePassword,
  updateProfile,
  updateCoverImage,
  updateAvatar,
  deleteUser,
  getRecipes,
  getRecipesOfCurrentUser,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  createReview,
};
