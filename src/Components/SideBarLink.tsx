const SideBarLink = ({
  link,
  text,
  icon,
}: {
  link: string;
  text: string;
  icon: React.ReactNode;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      download={link.includes("https") ? false : true}
      rel="noopener noreferrer"
      className="sidebar-link"
    >
      {icon && <span style={{ marginRight: "0.5em" }}>{icon}</span>}
      {text}
    </a>
  );
};

export default SideBarLink;
