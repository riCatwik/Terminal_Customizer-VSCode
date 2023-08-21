# Terminal Customizer for VSCode

This VS Code extension customizes your PowerShell, Windows PowerShell, and Command Prompt profiles to change the prompt display. The new prompt displays the current directory on one line, followed by a `>` symbol on the next, making it more visually separated and easier to read.

## Features

- Customizes the profiles for PowerShell, Windows PowerShell, and Command Prompt upon activation.
- Makes the prompt in the integrated terminal more readable.

## Requirements

- Windows OS with PowerShell or Command Prompt installed.
- A valid PowerShell, Windows PowerShell, or Command Prompt profile. If one doesn't exist, the extension will create it.
  
## How to Use

1. Install the extension from the VS Code Marketplace or by manually adding the `.vsix` file.
2. Activate the extension, and it will automatically modify the profiles for PowerShell, Windows PowerShell, and Command Prompt.
3. Open a new terminal in VS Code to see the changes.

### Special Instructions for Command Prompt Customization

For the Command Prompt customization to take effect, the `AutoRun` key in the Windows Registry needs to be set to execute the `cmdProfile.cmd` located in the user's home directory. Here's how you can do it:

1. Press `Win + R`, type `regedit`, and press Enter to open the Registry Editor.
2. Navigate to `HKEY_CURRENT_USER\Software\Microsoft\Command Processor`.
3. Check for an `AutoRun` key. If it doesn't exist, right-click on the right pane, select `New` -> `String Value`, and name it `AutoRun`.
4. Double-click the `AutoRun` key, and in the `Value data` field, input the path to your `cmdProfile.cmd`. It would typically be something like `C:\Users\<YourUsername>\cmdProfile.cmd`.
5. Click OK and close the Registry Editor.

Please ensure you're careful while editing the Windows Registry. Making incorrect changes can affect system behavior.

## Known Issues

- Please make sure to back up your profiles (PowerShell, Windows PowerShell, Command Prompt) before using the extension.
- If you encounter any issues, please report them on the [GitHub repository](https://github.com/riCatwik/Terminal_Customizer-VSCode).

## Feedback

Your feedback is invaluable! If you have any suggestions or run into any issues, please don't hesitate to open an issue on [my GitHub repo](https://github.com/riCatwik/Terminal_Customizer-VSCode).

## Disclaimer

This extension modifies the `Microsoft.PowerShell_profile.ps1`, Windows PowerShell's `profile.ps1`, and Command Prompt's profile files (`cmdProfile.cmd` in the user's home directory). While care has been taken to ensure the modifications are safe, always ensure you have backups of any important files. Please proceed with caution when editing the Windows Registry as per the instructions above.

## **Enjoy!**

---

Copyright © 2023 - [Ritwik Das](https://ritwikdas.gitlab.io)
