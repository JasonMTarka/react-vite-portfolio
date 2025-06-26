import "../../CSS/Puzzle/Puzzle.css";
import React, { useCallback, useEffect, useState } from "react";
import {
  STATUSES,
  ROOMS,
  LAYOUT,
  RESOURCES,
  DIRECTIONS,
  STARTING_RESOURCES,
  REVERSED_DIRECTIONS,
  COLORS,
} from "./puzzleConstants";

import type {
  Blueprint,
  Direction,
  ManorData,
  RoomData,
  RoomId,
  Resource,
  Status,
} from "./puzzleTypes";
import {
  getDay,
  getExtraResourcesMessage,
  getFoundResourcesMessage,
  generateInventory,
  moveRooms,
  saveProgress,
  removePlural,
} from "./puzzleUtil";
import {
  getDoorDirections,
  getRandomBlueprints,
  resetBlueprints,
} from "./blueprints";
import startingManor from "./manorData";
import MESSAGES from "./messages";
import ResourceDisplay from "./ResourceDisplay";
import ResetButton from "./ResetButton";
import MessageDisplay from "./MessageDisplay";
import ChoiceBox from "./ChoiceBox";
import Shop from "./Shop";
import TutorialModal from "./TutorialModal";
import RoomRow from "./RoomRow";

const Puzzle: React.FC = () => {
  const [message, setMessage] = useState([
    MESSAGES.start,
    MESSAGES.spacer,
    MESSAGES.explainMovement,
  ]);

  const [manorState, setManorState] = useState<ManorData>(
    JSON.parse(startingManor)
  );
  const [resources, setResources] = useState(STARTING_RESOURCES);

  const [choices, setChoices] = useState<Blueprint[]>([]);
  const [choicesActive, setChoicesActive] = useState(false);
  const [shopActive, setShopActive] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState<RoomId>(
    ROOMS.entrance_hall
  );
  // Set openingRoom to Entrance Hall as placeholder (no intended effect)
  const [openingRoom, setOpeningRoom] = useState<RoomId>(ROOMS.entrance_hall);
  // Set draftingDir to 'up' as placeholder (no intended effect)
  const [draftingDir, setDraftingDir] = useState<Direction>(DIRECTIONS.up);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [resetActive, setResetBtnHighlight] = useState(false);
  const [isTutorial, setIsTutorial] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [day, setDay] = useState(getDay());

  const activateSurroundingRooms = useCallback(
    (roomId: RoomId) => {
      const newManorState = { ...manorState };
      const directions = manorState[roomId].blueprint?.directions;

      if (!directions) {
        return;
      }
      for (const direction of directions) {
        const neighborId = newManorState[roomId][direction];
        if (!neighborId) {
          continue;
        }
        const neighborStatus = newManorState[neighborId].status;
        if (neighborStatus === STATUSES.locked_hidden) {
          newManorState[neighborId].status = STATUSES.locked;
        } else if (neighborStatus === STATUSES.inactive) {
          newManorState[neighborId].status = STATUSES.active;
        }
      }
      newManorState[roomId].status = STATUSES.activated;
      setManorState(newManorState);
    },
    [manorState]
  );

  const saveNewManorState = useCallback(
    (
      roomId: string,
      property: string,
      // eslint-disable-next-line
      newVal: any
    ) => {
      const newManorState = { ...manorState };
      // @ts-expect-error: Used to help avoid repetition when saving state
      newManorState[roomId][property] = newVal;
      setManorState(newManorState);
    },
    [manorState]
  );

  const addTutorialMessage = useCallback(
    (messages: string[]): string[] => {
      if (isTutorial) {
        setIsTutorial(false);
        messages.push(MESSAGES.spacer);
        return messages;
      }
      return [];
    },
    [isTutorial]
  );

  const updateRoomStatus = useCallback(
    (roomId: RoomId, newStatus: Status) => {
      saveNewManorState(roomId, "status", newStatus);
      if (newStatus === STATUSES.activated) {
        activateSurroundingRooms(roomId);
      }
      if (newStatus === STATUSES.activated && roomId === ROOMS.antechamber) {
        setIsVictory(true);
      }
    },
    [activateSurroundingRooms, saveNewManorState]
  );

  const openRoom = useCallback(
    (roomId: RoomId, direction: Direction) => {
      const goToChoice = () => {
        setIsFrozen(true);
        setChoicesActive(true);
        setShopActive(false);
        setDraftingDir(direction);
        setOpeningRoom(roomId);
        const randomBlueprints = getRandomBlueprints();
        randomBlueprints.forEach((blueprint) => {
          blueprint.directions = getDoorDirections(blueprint.doors, direction);
        });
        setChoices(randomBlueprints);
      };

      const status = manorState[roomId].status;

      // Skip drafting when going to Antechamber
      if (status === STATUSES.active && roomId === ROOMS.antechamber) {
        updateRoomStatus(ROOMS.antechamber, STATUSES.activated);
        return;
      }

      // Begin drafting if unlocked
      if (status === STATUSES.active) {
        saveNewManorState(roomId, "status", STATUSES.current);

        setMessage([
          ...addTutorialMessage([MESSAGES.tutorialChoice]),
          MESSAGES.selectRoom,
        ]);

        goToChoice();
        return;
      }

      // Begin drafting if locked and have a key, or else reject if no keys
      if (status === STATUSES.locked) {
        if (!resources.keys) {
          setMessage([MESSAGES.noKeys]);
          return;
        }
        setMessage([MESSAGES.unlockedRoom, MESSAGES.selectRoom]);
        setResources(() => {
          const newResources = { ...resources };
          newResources.keys -= 1;
          return newResources;
        });
        saveNewManorState(roomId, "status", STATUSES.current);
        goToChoice();
        return;
      }
    },
    [
      resources,
      manorState,
      saveNewManorState,
      updateRoomStatus,
      addTutorialMessage,
    ]
  );

  // Set arrow display on surrounding rooms when drafting
  const highlightSurroundingRooms = (
    roomId: RoomId,
    choiceBlueprint: Blueprint
  ) => {
    if (!choiceBlueprint) {
      return;
    }
    const newManorState = { ...manorState };
    const currentRoomIdInfo = newManorState[roomId];
    const directions = choiceBlueprint.directions;
    if (directions) {
      directions.forEach((direction) => {
        if (!direction) {
          return;
        }
        if (!currentRoomIdInfo[direction]) return;
        const neighborStatus =
          newManorState[currentRoomIdInfo[direction]].status;
        if (
          neighborStatus === STATUSES.inactive ||
          neighborStatus === STATUSES.locked_hidden
        ) {
          newManorState[currentRoomIdInfo[direction]].arrow = direction;
        }
      });
    }
    setManorState(newManorState);
  };

  // Remove arrow display when mouse off
  const removeArrows = (roomId: RoomId) => {
    if (!roomId || !choicesActive) {
      return;
    }
    const newManorState = { ...manorState };
    const { up, down, left, right } = manorState[roomId];
    for (const neighborId of [up, down, left, right]) {
      if (!neighborId || !newManorState[neighborId]) {
        continue;
      }
      delete newManorState[neighborId].arrow;
    }
    setManorState(newManorState);
  };

  const updateShop = (room: RoomData) => {
    if (room.blueprint?.color === COLORS.yellow) {
      setShopActive(true);
    } else {
      setShopActive(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    localStorage.setItem("tutorialFinished", "true");
    setShowModal(false);
  };

  const handleChoiceClick = (blueprint: Blueprint) => {
    const disableInvalidDoors = () => {
      const dirsOfNeighborsToChange = Object.values(DIRECTIONS).filter(
        (dir) => !nextRoom.blueprint?.directions.includes(dir)
      );
      dirsOfNeighborsToChange.forEach((neighborDir) => {
        const neighborRoomId = nextRoom[neighborDir];
        if (
          !neighborRoomId ||
          newManorState[neighborRoomId].status !== STATUSES.activated ||
          neighborRoomId === currentRoomId
        ) {
          return;
        }
        const neighborDoors = manorState[neighborRoomId].blueprint?.directions;
        const newNeighborDoors = neighborDoors?.filter(
          (dir) => dir !== REVERSED_DIRECTIONS[neighborDir]
        );
        if (manorState[neighborRoomId].blueprint && newNeighborDoors) {
          manorState[neighborRoomId].blueprint.directions = newNeighborDoors;
        }
      });
    };

    const removeInvalidDirections = () => {
      // possible bug; when going down it's possible to move into
      // rooms where should be impossible *sometimes*
      nextRoom.blueprint?.directions.forEach((dir, i) => {
        if (!nextRoom[dir]) {
          return;
        }
        const neighborRoom = manorState[nextRoom[dir]];
        if (
          !neighborRoom.blueprint?.directions.includes(dir) &&
          neighborRoom.status === STATUSES.activated
        ) {
          nextRoom.blueprint?.directions.splice(i, 1);
        }
      });
    };

    const updateMessage = () => {
      const message: string[] = [];
      message.push(blueprint.message);
      message.push("　");
      [RESOURCES.keys, RESOURCES.gems, RESOURCES.coins].forEach((resource) => {
        message.push(getFoundResourcesMessage(resource, blueprint));
      });

      [
        { type: RESOURCES.keys, count: genKeys },
        { type: RESOURCES.gems, count: genGems },
        { type: RESOURCES.coins, count: genCoins },
      ].forEach((resource) => {
        message.push(getExtraResourcesMessage(resource.type, resource.count));
      });
      setMessage(message);
    };

    // Do nothing if clicking choice box while inactive
    if (!choicesActive) {
      return;
    }

    // If choice blueprint is too expensive
    if (resources.gems < blueprint.cost) {
      setMessage([MESSAGES.noGems]);
      return;
    }

    // If valid choice, update next room info
    const newManorState = { ...manorState };
    const nextRoom = newManorState[openingRoom];
    // Set blueprint to next room
    nextRoom.blueprint = blueprint;
    // Remove the chosen blueprint from the pool
    nextRoom.blueprint.draftable = false;

    // Disable doors which lead into new room but that new room doesn't have
    disableInvalidDoors();

    // Remove direction from drafted blueprint where there's an existing room without opposite direction
    removeInvalidDirections();

    // Allow movement from previous room and prevent duplicate directions
    const reversedDir = REVERSED_DIRECTIONS[draftingDir];
    if (!nextRoom.blueprint.directions.includes(reversedDir)) {
      nextRoom.blueprint.directions.push(REVERSED_DIRECTIONS[draftingDir]);
    }

    setManorState(newManorState);
    updateRoomStatus(openingRoom, STATUSES.activated);
    setCurrentRoomId(openingRoom);
    removeArrows(openingRoom);

    setChoices([]);
    setIsFrozen(false);
    setChoicesActive(false);
    updateShop(newManorState[openingRoom]);

    const { genKeys, genGems, genCoins } = generateInventory();

    updateMessage();

    setResources(() => {
      const newResources = { ...resources };
      newResources.keys += genKeys + (blueprint.keys ? blueprint.keys : 0);
      newResources.gems +=
        genGems + (blueprint.gems ? blueprint.gems : 0) + blueprint.cost * -1;
      newResources.coins += genCoins + (blueprint.coins ? blueprint.coins : 0);
      newResources.steps -= 1;

      saveProgress(newManorState, newResources, openingRoom);

      return newResources;
    });
  };

  const handleBuy = (resource: Resource, cost: number, amount: number) => {
    const newResources = { ...resources };
    newResources[RESOURCES.coins] -= cost;
    newResources[resource] += amount;
    if (newResources[RESOURCES.coins] < 0) {
      setMessage([
        MESSAGES.shopNotEnoughCoins,
        MESSAGES.spacer,
        MESSAGES.explainMovement,
      ]);
      return;
    }
    setMessage([
      `You bought ${amount} more ${removePlural(
        resource,
        amount
      )} for ${cost} coins!`,
      MESSAGES.spacer,
      MESSAGES.explainMovement,
    ]);
    setResources(newResources);
  };

  const handleReset = () => {
    setManorState(JSON.parse(startingManor));
    setIsVictory(false);
    setResetBtnHighlight(false);
    setIsFrozen(false);
    setChoices([]);
    setChoicesActive(false);
    setShopActive(false);
    setResources(STARTING_RESOURCES);
    setDay(day + 1);
    setMessage([MESSAGES.start, MESSAGES.spacer, MESSAGES.explainMovement]);
    setCurrentRoomId(ROOMS.entrance_hall);
    resetBlueprints();
    localStorage.setItem("manorState", "");
    localStorage.setItem("day", (day + 1).toString());
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Prevent movement while frozen
      if (isFrozen) {
        if (choicesActive) {
          setMessage([MESSAGES.chooseBeforeMove]);
        }
        return;
      }

      // Check the next room to see if it's a valid movement
      const checkNextRoom = (direction: Direction) => {
        const nextRoomId = moveRooms[direction](currentRoomId);
        if (nextRoomId === currentRoomId) {
          return;
        }
        // Block movement if no door
        if (
          !manorState[currentRoomId].blueprint?.directions.includes(direction)
        ) {
          setMessage([MESSAGES.noDoor]);
          return;
        }

        // If valid movement
        switch (manorState[nextRoomId].status) {
          // If existing room, move to and subtract a step
          case STATUSES.activated:
            setCurrentRoomId(nextRoomId);
            setResources(() => {
              const newResources = { ...resources };
              newResources.steps -= 1;
              return newResources;
            });
            updateShop(manorState[nextRoomId]);
            setMessage([MESSAGES.explainMovement]);
            break;
          // If opening new room
          case STATUSES.active:
          case STATUSES.locked:
            openRoom(nextRoomId, direction);
        }
      };

      switch (event.key) {
        case "ArrowUp":
        case "w":
          checkNextRoom(DIRECTIONS.up);
          break;
        case "ArrowDown":
        case "s":
          checkNextRoom(DIRECTIONS.down);
          break;
        case "ArrowLeft":
        case "a":
          checkNextRoom(DIRECTIONS.left);
          break;
        case "ArrowRight":
        case "d":
          checkNextRoom(DIRECTIONS.right);
          break;
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [currentRoomId, isFrozen, manorState, resources, openRoom, choicesActive]);

  useEffect(() => {
    // Show tutorial modal on page open if first time
    if (localStorage.getItem("tutorialFinished")) {
      return;
    }
    setShowModal(true);
  }, []);

  useEffect(() => {
    // Get saved manor state
    const savedData = localStorage.getItem("manorState");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        // If previous data then reset
        if (!parsedData.manor) {
          localStorage.setItem("manorState", "");
        }

        setManorState(parsedData.manor);
        setResources(parsedData.resources);
        setCurrentRoomId(parsedData.currentRoomId);
      } catch {
        localStorage.setItem("manorState", "");
      }
    }
  }, []);

  useEffect(() => {
    // Listen for victory
    if (isVictory) {
      setMessage([
        MESSAGES.reachedAntechamber,
        MESSAGES.spacer,
        MESSAGES.explainReset,
      ]);
      setResetBtnHighlight(true);
    }
  }, [isVictory]);

  useEffect(() => {
    // Listen for running out of steps
    if (!resources.steps) {
      setMessage([MESSAGES.outOfSteps, MESSAGES.explainReset]);
      setIsFrozen(true);
      setResetBtnHighlight(true);
    }
  }, [resources]);

  const renderTutorialModal = () => {
    return showModal ? <TutorialModal onClose={handleCloseModal} /> : null;
  };

  const renderResourceDisplay = () => {
    const resourceKeys = Object.values(RESOURCES);
    return (
      <div>
        {resourceKeys.map((resource, idx) => {
          return (
            <ResourceDisplay
              key={idx}
              resource={resource}
              count={resources[resource]}
            />
          );
        })}
      </div>
    );
  };

  const renderManorGrid = () => {
    return (
      <>
        {Array.from({ length: LAYOUT.rows }).map((_, rowIdx) => (
          <RoomRow
            key={rowIdx}
            rowIdx={rowIdx}
            manorState={manorState}
            currentRoomId={currentRoomId}
          />
        ))}
      </>
    );
  };

  const renderChoices = () => {
    return (
      <div className="choice-row">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <ChoiceBox
              key={index}
              blueprint={choices[index]}
              handleClick={handleChoiceClick}
              active={choicesActive}
              highlightSurroundingRooms={() => {
                highlightSurroundingRooms(openingRoom, choices[index]);
              }}
              removeArrows={() => {
                removeArrows(openingRoom);
              }}
            ></ChoiceBox>
          );
        })}
      </div>
    );
  };

  const renderShop = () => {
    return shopActive ? (
      <Shop room={manorState[currentRoomId]} buyCallback={handleBuy} />
    ) : null;
  };

  return (
    <>
      {renderTutorialModal()}
      <div className="puzzle-main-flex">
        <div className="choice-row-container">
          <div className="day-display">Day {day}</div>
          <button className="rule-button" onClick={handleOpenModal}>
            Rules
          </button>
          <MessageDisplay message={message} />
          {renderChoices()}
          {renderShop()}
        </div>
        <div className="room-grid">
          {renderResourceDisplay()}
          <ResetButton resetActive={resetActive} onClick={handleReset} />
          {renderManorGrid()}
        </div>
      </div>
    </>
  );
};

export default Puzzle;
