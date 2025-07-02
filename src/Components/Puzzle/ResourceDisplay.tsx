import type { Resource } from "./puzzleTypes";
import ResourceIcon from "./ResourceIcon";

const ResourceDisplay = ({
  resource,
  count,
}: {
  resource: Resource;
  count: number;
}) => {
  return (
    <span className={`resource-display ${resource}`}>
      <ResourceIcon resource={resource} />
      {count}
    </span>
  );
};

export default ResourceDisplay;
