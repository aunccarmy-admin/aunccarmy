import React from "react";
import LogoTitle from "../common/logo-title";
import MainNav from "./nav/main-nav";
import NavSheet from "./nav/nav-sheet";
import { BottomCornerBoxes, RDiamond } from "@/components/common/decoration";

const Header = () => {
  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-[radial-gradient(transparent_1px,var(--token-f32baa44-90b8-42a5-8bca-ffba9d95b23a,hsl(var(--background)))_1px)] bg-[length:4px_4px] backdrop-blur-sm">
      <div className="mx-auto max-w-8xl px-2">
        <div className="relative border-l border-r">
          <BottomCornerBoxes child={<RDiamond />} />
          <div className="relative z-[100] mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pb-3 pt-3">
            <div className="rounded-sm bg-background py-1.5 pl-3 pr-2">
              <LogoTitle />
            </div>
            <div className="flex items-center gap-4 xl:gap-6">
              <MainNav className="hidden md:block" />
            </div>
            <NavSheet />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
