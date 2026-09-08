/* eslint-disable */
import GroupsIcon from "@mui/icons-material/Groups";
import CategoryIcon from '@mui/icons-material/Category';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DrawIcon from '@mui/icons-material/Draw';

export const SidebarData = [
  {
    books: [
      {
        path: "/",
        title: "Books",
        icon: <MenuBookIcon />,
      },
      {
        path: "/authors",
        title: "Authors",
        icon: <DrawIcon />,
      },
      {
        path: "/categories",
        title: "Categories",
        icon: <CategoryIcon />,
      },
    ],
    system: [
      {
        path: "/members",
        title: "Members",
        icon: <GroupsIcon />,
      },
    ]
  },
];
