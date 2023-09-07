"use client";

import { User } from "@prisma/client";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));
  const sliceRenderAvatar = (user: User) => {
    if (user) {
      return (
        <SmallAvatar
          alt={user.name!}
          src={user.image || "/images/placeholder.jpg"}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      badgeContent={sliceRenderAvatar(users[2])}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={sliceRenderAvatar(users[1])}
      >
        <Avatar
          alt={users[0].name!}
          src={users[0].image || "/images/placeholder.jpg"}
        />
      </Badge>
    </Badge>
  );
};

export default AvatarGroup;
