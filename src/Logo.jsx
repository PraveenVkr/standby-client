import React from "react";
import { MdMarkUnreadChatAlt } from "react-icons/md";

const Logo = () => {
  return (
    <div className="text-blue-600 font-bold flex gap-2 p-4 items-center">
      <MdMarkUnreadChatAlt className="size-6 mt-1.5" />
      StandBy
    </div>
  );
};

export default Logo;
