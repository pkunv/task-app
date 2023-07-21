import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  .activeLink {
    text-decoration: underline;
  }
`;

export const ZindexLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  .activeLink {
    text-decoration: underline;
  }
`;
