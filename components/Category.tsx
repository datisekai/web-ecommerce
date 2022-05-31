import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NextPage } from "next";
import React from "react";

interface ListCategoryProps {
  categories: {
    id: string;
    name: string;
  }[];
}

const Category: NextPage<ListCategoryProps> = ({ categories }) => {
  return (
    <div className='bg-white rounded-[10px]'>
      {categories.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem key={value.id} disablePadding>
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  //   checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </div>
  );
};

export default Category;
