import { IconButton, Menu, MenuItem, ListItemButton, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { type ReactNode, useState } from "react";

export type GenericMenuItem = {
    key: string;
    label: React.ReactNode;
    onClick: () => void;
};

type GenericMenuProps = {
    menuItems: GenericMenuItem[];
};


//type GenericMenuProps = {
//    menuItems: ReactNode[]; // メニューの中身を配列で渡す
//};

export function GenericListMenu({ menuItems }: GenericMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const closeMenu = () => setAnchorEl(null);

    return (
        <>
            <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
            >
                {menuItems.map(item => (
                    <MenuItem
                        key={item.key}
                        onClick={() => {
                            closeMenu();
                            item.onClick();
                        }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
