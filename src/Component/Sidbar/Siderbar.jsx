import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
 import EmojiFoodBeverageOutlinedIcon from '@mui/icons-material/EmojiFoodBeverageOutlined';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import "./Sidbar.css"
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function Siderbar() {
    const navigate = useNavigate(); // useNavigate hook for navigation

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    backgroundColor: '#f1ebf7', // Set the background color here
                    color: 'black',
                    display:'none'
                }}
            >
                
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        background: '#f1ebf7'
                    },
                }}
                variant="permanent"
            >
                {/* LOG */}
                <span className="">
                    <center onClick={() => { /* handle click */ }} className='logss'>
                        <p>Log</p>
                    </center>
                </span>
                <Toolbar />

                {/* Dashbord and user*/}
                <List>
                    {['Dashboard', 'User'].map((text, index) => (
                        <ListItem
                            key={text}

                            className={
                                sessionStorage.getItem("id") &&
                                    sessionStorage.getItem("id") === text
                                    ? "activeelement"
                                    : "Customeelement"
                            }
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => {
                                text === "Dashboard" ? (
                                    <>
                                        {navigate("/")}
                                        {sessionStorage.setItem("id", "Dashboard")}
                                    </>
                                ) : (
                                    <>
                                        {navigate("/")}
                                        {sessionStorage.setItem("id", "User")}
                                    </>
                                );
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        sessionStorage.getItem("id") &&
                                            sessionStorage.getItem("id") === text ? (
                                            <DashboardIcon className="sidebariconactive" />
                                        ) : (
                                            <DashboardCustomizeTwoToneIcon className="sidebaricon" />
                                        )
                                    ) : sessionStorage.getItem("id") &&
                                        sessionStorage.getItem("id") === text ? (
                                        <AccountBoxIcon className="sidebariconactive" />
                                    ) : (
                                        <AccountBoxIcon className="sidebaricon" />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Product */}
                <List>
                    {['Food', 'Catogrey'].map((text, index) => (
                        <ListItem
                            key={text}
                            className={
                                sessionStorage.getItem("id") &&
                                    sessionStorage.getItem("id") === text
                                    ? "activeelement"
                                    : "Customeelement"
                            }
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => {
                                text === "Food" ? (
                                    <>
                                        {navigate("/product")}
                                        {sessionStorage.setItem("id", "Food")}
                                    </>
                                ) : (
                                    <>
                                        {navigate("/Catogrey")}
                                        {sessionStorage.setItem("id", "Catogrey")}
                                    </>
                                );
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        sessionStorage.getItem("id") &&
                                            sessionStorage.getItem("id") === text ? (
                                            <EmojiFoodBeverageIcon className="sidebariconactive" />
                                        ) : (
                                            <EmojiFoodBeverageOutlinedIcon className="sidebaricon" />
                                        )
                                    ) : sessionStorage.getItem("id") &&
                                        sessionStorage.getItem("id") === text ? (
                                        <DashboardCustomizeTwoToneIcon className="sidebariconactive" />
                                    ) : (
                                        <DashboardCustomizeTwoToneIcon className="sidebaricon" />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <List>
                    {['PrinterTableData'].map((text, index) => (
                        <ListItem
                            key={text}
                            className={
                                sessionStorage.getItem("id") &&
                                    sessionStorage.getItem("id") === text
                                    ? "activeelement"
                                    : "Customeelement"
                            }
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => {
                                text === "PrinterTableData" ? (
                                    <>
                                        {navigate("/")}
                                        {sessionStorage.setItem("id", "PrinterTableData")}
                                    </>
                                ) : (
                                    <>
                                        {navigate("/PrinterTableData")}
                                        {sessionStorage.setItem("id", "PrinterTableData")}
                                    </>
                                );
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        sessionStorage.getItem("id") &&
                                            sessionStorage.getItem("id") === text ? (
                                            <EmojiFoodBeverageIcon className="sidebariconactive" />
                                        ) : (
                                            <EmojiFoodBeverageOutlinedIcon className="sidebaricon" />
                                        )
                                    ) : sessionStorage.getItem("id") &&
                                        sessionStorage.getItem("id") === text ? (
                                        <DashboardCustomizeTwoToneIcon className="sidebariconactive" />
                                    ) : (
                                        <DashboardCustomizeTwoToneIcon className="sidebaricon" />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}

export default Siderbar;
