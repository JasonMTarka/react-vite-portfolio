import SideBarLink from "./SideBarLink";

const SideBar = () => {
  return (
    <div className="sidebar">
      <SideBarLink link="https://github.com/JasonMTarka/" text="GitHub" />
      <SideBarLink
        link="https://www.linkedin.com/in/jason-t-342b371a6/"
        text="LinkedIn"
      />
    </div>
  );
};

export default SideBar;
