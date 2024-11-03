"use client";

import useEditModal from "@/hooks/useEditModal";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CoverImageUpload from "../shared/CoverImageUpload";
import ProfileImageUpload from "../shared/ProfileImageUpload";
import Modal from "../ui/Modal";
import axios from "axios";
import { Loader2 } from "lucide-react";
import EditForm from "../shared/EditForm";

interface Props {
  user: IUser;
}
const EditModal = ({ user }: Props) => {
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editModal = useEditModal();
  const router = useRouter();

  useEffect(() => {
    setCoverImage(user?.coverImage);
    setProfileImage(user?.profileImage);
  }, []);

  const handleImageUpload = async (image: string, isProfileImage: boolean) => {
    console.log(user._id);

    try {
      setIsLoading(true);
      const data = await axios.put(`/api/users/${user._id}`, {
        [isProfileImage ? "profileImage" : "coverImage"]: image,
      });
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const bodyContent = (
    <>
      {isLoading && (
        <div className="absolute z-10 h-[300px] bg-black opacity-50 left-0 right-0 top-12 flex justify-center items-center">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      )}
      <div className="overflow-y-scroll h-[300px]">
        {" "}
        <CoverImageUpload
          coverImage={coverImage}
          onChange={(image) => handleImageUpload(image, false)}
        />
        <ProfileImageUpload
          profileImage={profileImage}
          onChange={(image) => handleImageUpload(image, true)}
        />
        <EditForm user={user} />
      </div>
    </>
  );
  return (
    <Modal
      body={bodyContent}
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
    />
  );
};

export default EditModal;
