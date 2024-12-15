import data from "../data/commands.json";

type CommandData = {
  [key: string]: string;
};

export const handleCommand = (command: string): string => {
  if (command === "help") {
    return `Available commands: ${Object.keys(data).join(", ")}, clear`;
  }
  if ((data as CommandData)[command]) {
    return (data as CommandData)[command];
  } else {
    return `Command not recognized: ${command}\nType 'help' to see available commands.`;
  }
};

export const getAvailableCommands = (): string[] => {
  return [...Object.keys(data), "clear"];
};
