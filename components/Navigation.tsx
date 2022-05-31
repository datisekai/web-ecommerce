import { Breadcrumbs, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface NavigationProp {
  hasEndLink: string;
}

const Navigation: NextPage<NavigationProp> = ({ hasEndLink = null }) => {
  const router = useRouter();
  const arrLink = router.pathname.split("/").slice(1);
  let endLink = arrLink.pop();
  if (hasEndLink) {
    endLink = hasEndLink;
  }

  return (
    <div className='bg-white py-3 text-center capitalize'>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
        className='flex items-center justify-center'
      >
        <Link underline='hover' key='1' color='inherit' href='/'>
          Home
        </Link>
        {arrLink?.map((link) => (
          <Link underline='hover' key='2' color='inherit' href={`\\${link}`}>
            {link}
          </Link>
        ))}
        <Typography key='3' color='text.primary'>
          {endLink}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default Navigation;
