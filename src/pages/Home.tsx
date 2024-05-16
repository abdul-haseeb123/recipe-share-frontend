import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="dark:bg-zinc-900 dark:text-white min-h-[200vh]">
      {/* <h3 className="text-4xl pt-7">
        {user == "Public" ? user : user.username}
      </h3>
      <div className="grid gap-4 mt-4">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div> */}
      <Navbar />
    </div>
  );
}
