import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import styled from "styled-components";

const SideNav = ({ state, toggleDrawer }) => {
  return <Wrap open={state["left"]}></Wrap>;
};

const list = (anchor, toggleDrawer) => {
  return (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={() => toggleDrawer(anchor, false)}
      onKeyDown={() => toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Possimus dolor exercitationem asperiores sapiente consequatur,
                non, repudiandae saepe dolorem fugiat, quos error eligendi.
                Inventore cumque magnam quas aliquid iusto, assumenda autem,
                culpa ducimus voluptates placeat suscipit. Cum nam tenetur modi
                animi doloremque quibusdam enim autem, natus magnam. Adipisci
                eos nemo, nostrum laboriosam, blanditiis aut quae molestiae
                tenetur ut harum illum temporibus eius fugiat quod molestias sed
                obcaecati nam. Quos illum velit vero. Deleniti voluptas illo
                rem, sunt, odit quidem asperiores accusantium odio sit officiis
                error consequuntur, veniam saepe explicabo! Quam, laborum soluta
                saepe harum ipsa exercitationem, ullam rerum porro aut
                dignissimos odio provident atque consequatur aspernatur ad,
                maiores itaque. A fugit natus perferendis aliquid numquam quod,
                enim assumenda voluptatibus eum perspiciatis, aperiam fuga
                accusantium quae, voluptatum culpa eveniet consequatur
                blanditiis consectetur reiciendis. Nesciunt magnam, voluptatibus
                quas repudiandae consequatur repellat cupiditate eveniet vitae
                sint ullam voluptates veniam doloribus repellendus aliquam iusto
                dolorum? Sequi, dolorum! Error ratione enim earum, perferendis
                aliquid porro saepe ipsum repellat! Voluptatem, modi alias neque
                ea totam quo eos cum tempora, vel eveniet recusandae corporis
                iste aliquam dolorum exercitationem, optio earum. Repellendus
                minima laboriosam tempore facilis tenetur enim nulla soluta
                recusandae! Ducimus, error totam adipisci dolorem molestias
                beatae omnis.
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideNav;
const Wrap = styled.div`
  position: fixed;
  min-height: 100vh;
  width: 400px;
  background-color: white;
  z-index: 1000;
  left: ${(props) => (props.open ? "0" : "-101%")};
`;
