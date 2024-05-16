import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowDown } from "lucide-react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { ar1X1 } from "@cloudinary/url-gen/qualifiers/aspectRatio";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="px-4 py-3">
          <Avatar className="mr-2">
            <AvatarImage
              src={
                user === "Public"
                  ? "https://github.com/shadcn.png"
                  : cld
                      .image(user.avatar.public_id)
                      .resize(
                        thumbnail()
                          .width(100)
                          .aspectRatio(ar1X1())
                          .zoom(0.8)
                          .gravity(focusOn(face()))
                      )
                      .roundCorners(byRadius(20))
                      .toURL()
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>{" "}
          {user == "Public" ? (
            "Sign In"
          ) : (
            <span className="text-xl">{user.username}</span>
          )}{" "}
          <ArrowDown className="ml-2 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[12rem] text-lg">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
        <DropdownMenuItem>My Profile</DropdownMenuItem>
        <DropdownMenuItem>Saved Recipes And Collections</DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={() => navigate("/create")}>
          Add new Recipe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
