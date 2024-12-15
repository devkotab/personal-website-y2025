"use client";
import { useState, useCallback, FormEvent, KeyboardEvent, Key } from "react";
import { handleCommand, getAvailableCommands } from "../utils/commandHandler";

import styles from "../styles/terminal.module.css";

type Output = string[];

const WELCOME_TEXT: Output = [
  "Hi, my name is Bipin Devkota",
  "Welcome to my custom terminal!",
  "Type a command to know more about me.",
  "Type 'help' to see the list of available commands.",
];

export default function Terminal() {
  const [output, setOutput] = useState<Output>(WELCOME_TEXT);
  const [command, setCommand] = useState<string>("");

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmedCommand = command.trim();

      if (trimmedCommand) {
        if (trimmedCommand === "clear") {
          clearOutput();
        } else {
          processCommand(trimmedCommand);
        }
      }
      setCommand("");
    },
    [command]
  );

  const clearOutput = () => {
    setOutput([]);
  };

  const processCommand = (cmd: string) => {
    setOutput((prev: Output) => [...prev, `> ${cmd}`, handleCommand(cmd)]);
  };

  const handleTabCompletion = useCallback(() => {
    const availableCommands = getAvailableCommands();
    const matchingCommands = availableCommands.filter((cmd) =>
      cmd.startsWith(command)
    );

    if (matchingCommands.length === 1) {
      setCommand(matchingCommands[0]);
    }
  }, [command]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.terminal}>
        <div className={styles.output}>
          {output.map((line: string, index: number) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: line }}></div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={styles.inputContainer}>
          <span className={styles.prompt}>&gt;</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.input}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
