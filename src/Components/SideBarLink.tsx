const SideBarLink = ({ link, text }: { link: string; text: string }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="sidebar-link"
    >
      {text}
    </a>
  );
};

export default SideBarLink;
