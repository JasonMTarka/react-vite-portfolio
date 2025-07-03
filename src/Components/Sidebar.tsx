import SideBarLink from "./SideBarLink";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

const SideBar = () => {
  return (
    <div className="sidebar ">
      <SideBarLink
        link="https://github.com/JasonMTarka/"
        text="GitHub"
        icon={<FaGithub />}
      />
      <SideBarLink
        link="https://www.linkedin.com/in/jason-t-342b371a6/"
        text="LinkedIn"
        icon={<FaLinkedin />}
      />
      <SideBarLink
        link="/react-vite-portfolio/resume.docx"
        text="Resume"
        icon={<IoMdDownload />}
      />
    </div>
  );
};

export default SideBar;
