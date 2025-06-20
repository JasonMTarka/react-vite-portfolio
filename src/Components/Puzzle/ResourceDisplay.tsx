import { useEffect, useState } from "react";
import { RESOURCES } from "./constants";
import type { Resource } from "./types";

const ResourceDisplay = ({
  resource,
  count,
}: {
  resource: Resource;
  count: number;
}) => {
  const [className, setClassName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    let className = "";
    let text = "";
    if (resource === RESOURCES.steps) {
      className = "steps-display";
      text = "Steps";
    } else if (resource === RESOURCES.gems) {
      className = "gems-display";
      text = "Gems";
    } else if (resource === RESOURCES.keys) {
      className = "keys-display";
      text = "Keys";
    }
    setClassName(`resource-display ${className}`);
    setText(`${text}: ${count}`);
  }, [className, text, count, resource]);

  return <span className={className}>{text}</span>;
};

export default ResourceDisplay;
