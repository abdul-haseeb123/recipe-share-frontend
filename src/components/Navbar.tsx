import { TypographyH1 } from "@/components/Typography";
import ProfileButton from "@/components/ProfileButton";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={cn(
        "flex flex-row justify-between items-center p-9  shadow-slate-100 shadow-lg fixed w-full h-14"
      )}
    >
      <TypographyH1>Pick A Recipe</TypographyH1>
      <ProfileButton />
    </div>
  );
}
