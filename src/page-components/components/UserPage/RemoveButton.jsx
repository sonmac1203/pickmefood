"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useUser from "@/hook/useUser";
export default function RemoveBtn({ id, userId }) {
  const router = useRouter();
  const username = useUser(userId).user.username;

  const removeItem = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/changeBaskets/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // router.refresh();
        // router.back();
        router.push(`/${username}`);
      }
    }
  };

  return (
    <Button
      onClick={removeItem}
      className="w-10/12 fixed bottom-1 left-10 bg-red-500"
    >
      Remove
    </Button>
  );
}
