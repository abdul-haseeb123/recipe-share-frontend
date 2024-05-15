import { Button } from "@/components/ui/button";
import { useAuth } from "./contexts/AuthContext";
import LoginForm from "@/components/LoginForm";

export default function App() {
  const { user } = useAuth();
  return (
    <>
      <div className="text-green-400">
        App {user == "Public" ? <LoginForm /> : user.username}
      </div>
      <h3 className="text-4xl mt-7">
        {user == "Public" ? user : user.username}
      </h3>
    </>
  );
}
