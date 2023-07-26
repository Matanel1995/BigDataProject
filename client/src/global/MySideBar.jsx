import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SearchIcon from '@mui/icons-material/Search';

const Item = ({ title, to, icon, selected, setSelected }) => {
  console.log("IN ITEM FUNCTION");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem component={<Link to={"/search"} />}>test</MenuItem>,
    <MenuItem
      active={selected === title}
      rootStyles={{
        color: selected === title? colors.blueAccent[400]:colors.grey[100] ,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MySidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Sidebar collapsed={isCollapsed} backgroundColor= {colors.primary[400]}>
      <Menu iconShape="square" >
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h3" color={colors.grey[100]}>
                BigData Project
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Search"
            to="/search"
            icon={<SearchIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Analyze"
            to="/analyze"
            icon={<EqualizerIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Menu>
    </Sidebar>
  );
};

export default MySidebar;