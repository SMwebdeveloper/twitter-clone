"use client";

import { IPost, IUser } from "@/types";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../ui/Button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface Props {
  placeholder: string;
  user: IUser;
  setPosts: Dispatch<SetStateAction<IPost[]>>;
}
const Form = ({ placeholder, user, setPosts }: Props) => {
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const post = { body, userId: user._id };
      const { data } = await axios.post("/api/posts", post);
      const newPost = { ...data, user };
      setPosts((prev) => [newPost, ...prev]);
      setBody("");
      toast({
        title: "Success",
        description: "Post created successfully.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <Avatar className="flex items-center justify-center">
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>

        <div className="w-full">
          <textarea
            className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white h-[50px]"
            placeholder={placeholder}
            disabled={isLoading}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          ></textarea>
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] border-neutral-800 transition" />

          <div className="mt-4 flex flex-row justify-end">
            <Button
              label={"Post"}
              classNames="px-8"
              disabled={isLoading || !body}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
