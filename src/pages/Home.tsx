import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <div className="text-green-400">
        App {user == "Public" ? <LoginForm /> : <Button>Logout</Button>}
      </div>
      <h3 className="text-4xl mt-7">
        {user == "Public" ? user : user.username}
      </h3>
    </>
  );
}
