import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import {
  BiMovie,
  BiColumns,
  BiUser,
  BiListUl,
  BiCart,
  BiCaretRightSquare,
} from "react-icons/bi";

const Sidebar = () => {
  return (
    <div
      style={{
        display: "inline-block",
        height: "100vh",
        overflow: "scroll initial",
        position: "fixed",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Movie shop
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <BiCaretRightSquare className="mr-4 fa-2x"></BiCaretRightSquare>
                Movie shop
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <BiColumns className="mr-4 fa-2x"></BiColumns>Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/cart" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <BiCart className="mr-4 fa-2x"></BiCart>Orders
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/movies" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <BiMovie className="mr-4 fa-2x"></BiMovie>Movies
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <BiUser className="mr-4 fa-2x"></BiUser>Users
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/categories" activeClassName="activeClicked">
              <CDBSidebarMenuItem>
                <BiListUl className="mr-4 fa-2x"></BiListUl>
                Categories
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/hero404"
              target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
