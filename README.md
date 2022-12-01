# Multistart

Multistart - light-weight extension to run multiple process in vscode embedded terminal.

## Features

1. Add extensions config in your workspace settings.
2. Press `Ctrl` + `Shift` + `P` and find command with name "Multistart"
3. Now you can see your tasks in newly created terminals

## Extension Settings

- `multistart.tasks`: Array of objects, that describes each terminals an instruction to run in it. Each object contains set of properties:
  - `name` - human-readable name of terminal
  - `location` - (optional) path to directory from which the command will be executed
  - `commands` - list of commands in execution order
  ```json
  "multistart.tasks": [
    {
      "name": "echo",
      "commands": [
        ["echo", "\"Hello World\""],
        ["cat", "/etc/os-release"]
      ]
    },
    {
      "name": "tests",
      "location": "./smart-contracts",
      "commands": [["npx", "hardhat", "test", "--network", "hardhat"]]
    }
  ]
  ```

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of multistart vscode extension. Implemented features:

- tasks configuration in workspace settings
- running tasks from command palette
- configuring many instruction to execute in one task(in one terminal)
