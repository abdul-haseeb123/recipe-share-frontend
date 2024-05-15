import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <h3 className="text-4xl mt-7">
        {user == "Public" ? user : user.username}
      </h3>
      <div className="grid gap-4 mt-4">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </>
  );
}
