import { UserInterface } from "@/interfaces/user";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorage, requestHandler } from "@/lib/utils";
import { registerUser, loginUser, logoutUser } from "@/api";

const AuthContext = createContext<{
  user: UserInterface | "Public";
  token: string | null;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    avatar: File[],
    coverImage: File[]
  ) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: "Public",
  token: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});
const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInterface | "Public">("Public");
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    avatar: File[],
    coverImage: File[]
  ) => {
    await requestHandler(
      async () =>
        await registerUser(
          firstName,
          lastName,
          username,
          email,
          password,
          avatar,
          coverImage
        ),
      setIsLoading,
      () => {
        alert("Account created successfully. Please login to continue.");
      },
      alert
    );
  };

  const login = async (data: { email: string; password: string }) => {
    await requestHandler(
      async () => await loginUser(data),
      setIsLoading,
      (res) => {
        const { data } = res;
        console.log("is data coming here", data);
        setUser(data.user);
        setToken(data.accessToken);
        LocalStorage.set("token", data.accessToken);
        LocalStorage.set("user", data.user);
        navigate("/");
      },
      alert
    );
  };

  const logout = async () => {
    await requestHandler(
      async () => await logoutUser(),
      setIsLoading,
      (_) => {
        setUser("Public");
        setToken(null);
        LocalStorage.clear();
      },
      alert
    );
  };

  // check for saved user and token in local storage during component mount
  useEffect(() => {
    setIsLoading(true);

    const _token = LocalStorage.get("token");
    const _user = LocalStorage.get("user");
    if (_token && _user?._id) {
      setToken(_token);
      setUser(_user);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {isLoading ? <p>Loading</p> : children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
