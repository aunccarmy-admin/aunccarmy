import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { links } from "@/constants";

const GitHubLink = () => {
  return (
    <div className="flex items-center text-[0.65rem] font-medium tracking-wide dark:font-normal sm:text-xs">
      <a
        href={links.github.repo}
        target="_blank"
        aria-label="GitHub repository"
        className="opacity-70 hover:opacity-100"
      >
        <GitHubLogoIcon className="md:h-4 md:w-4" />
      </a>
      <span className="mx-2.5 h-4 w-[1px] bg-foreground opacity-40 sm:h-5" />
      <span>Built by</span>
      <a
        href={links.github.dev}
        target="_blank"
        aria-label="GitHub Account"
        className={
          "ml-1.5 font-bold underline-offset-4 opacity-90 hover:underline dark:font-normal"
        }
      >
        DenserMeerkat
      </a>
    </div>
  );
};

export default GitHubLink;
