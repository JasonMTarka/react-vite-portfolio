const MyList = ({ title, contents }: { title: string; contents: string[] }) => {
  return (
    <ul style={{ listStyle: "inside" }}>
      <b>{title}</b>
      {contents.map((text, i) => {
        return <li key={i}>{text}</li>;
      })}
    </ul>
  );
};

export default MyList;
