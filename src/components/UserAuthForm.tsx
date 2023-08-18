"use client";

import { FC, HTMLAttributes, useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<Props> = ({ className, ...props }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "An error ocurred during login with Google.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <Button
        onClick={loginWithGoogle}
        isLoading={loading}
        size="sm"
        className="w-full">
        {!loading && <Icons.google className="mr-2 h-4 w-4" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
