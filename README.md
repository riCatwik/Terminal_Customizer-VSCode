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

For the Command Prompt customization to take effect, the `AutoRun` key in the Windows Registry might need modification.

#### If the `AutoRun` Key is Present

1. Press `Win + R`, type `regedit`, and press Enter to open the Registry Editor.
2. Navigate to `HKEY_CURRENT_USER\Software\Microsoft\Command Processor`.
3. Double-click the `AutoRun` key. In the "Value data" field:

   - If it's empty, input the path to your `cmdProfile.cmd`, typically:

     ```
     "C:\Users\<YourUsername>\cmdProfile.cmd"
     ```

   - If there's an existing value, append the path for `cmdProfile.cmd` to the end. For example:

     ```
     "existing_commands" & "C:\Users\<YourUsername>\cmdProfile.cmd"
     ```

#### If the `AutoRun` Key is Not Present

1. Press `Win + R`, type `regedit`, and press Enter to open the Registry Editor.
2. Navigate to `HKEY_CURRENT_USER\Software\Microsoft\Command Processor`.
3. Right-click on the `Command Processor` folder, select `New`, and then choose `String Value`.
4. Rename the new string value to `AutoRun`.
5. Double-click the `AutoRun` string value. In the "Value data" field, input the path to your `cmdProfile.cmd`, typically:

   ```
   "C:\Users\<YourUsername>\cmdProfile.cmd"
   ```

**Note:** Replace `<YourUsername>` with your actual Windows username.

Ensure you're careful while editing the Windows Registry; incorrect changes can affect system behavior.

## Known Issues

- Please back up your profiles (PowerShell, Windows PowerShell, Command Prompt) before using the extension.
- Report issues on the [GitHub repository](https://github.com/riCatwik/Terminal_Customizer-VSCode).

## Feedback

Feedback is invaluable! For suggestions or issues, open an issue on [my GitHub repo](https://github.com/riCatwik/Terminal_Customizer-VSCode).

## Disclaimer

This extension modifies the `Microsoft.PowerShell_profile.ps1`, Windows PowerShell's `profile.ps1`, and Command Prompt's profile files (`cmdProfile.cmd` in the user's home directory). Please proceed with caution when editing the Windows Registry as per the instructions above.

## License, Contribution and Distribution

This project is licensed under the MIT License, allowing modifications, use, and distribution with appropriate credit. View the full license in the [`LICENSE`](https://marketplace.visualstudio.com/items/ritwikdas.terminalcustomizer-vscode/license) file in the root directory of the repository.

### Contribution

If you're interested in contributing, please follow these steps:

1. **Fork the Repository:** Click the 'Fork' button at the top right of the GitHub repo to create a copy of the repository in your GitHub account.
2. **Clone the Repository:** Clone the forked repository to your local machine.
3. **Create a New Branch:** Ensure you create a new branch for your changes to simplify merging your modifications into the main repository.
4. **Commit Your Changes:** After making any additions or modifications, commit the changes to your branch.
5. **Submit a Pull Request:** After pushing your changes to your GitHub repo, open a pull request to the main [`Terminal_Customizer-VSCode`](https://github.com/riCatwik/Terminal_Customizer-VSCode) repository. Your changes will undergo a review, and if deemed suitable, they'll integrate into the main codebase.

Contributions, whether they involve fixing bugs, adding features, or enhancing documentation, are greatly valued and appreciated.

### Distribution

While the MIT License permits the free distribution of this software, given the appropriate credit is maintained, we kindly ask distributors to adhere to the following guidelines:

1. **Maintain the Original Copyright Notice:** Ensure any distribution retains the original copyright notice, license, and any associated disclaimers.
2. **Declare Changes:** If you've adapted the software in any form for your distribution, please make these changes transparent.
3. **Compatibility:** Distributors should guarantee that their version aligns with the original extension's compatibility, especially if incorporating it into a broader software bundle.
4. **Provide a Direct Link:** Always include a direct link back to the original [GitHub repository](https://github.com/riCatwik/Terminal_Customizer-VSCode) to enable end-users to access the authentic source and its documentation.
5. **Avoid Misrepresentation:** Distributors should refrain from implying they are the creators of the original software. Furthermore, without express permission, they should not use the name of the original project for endorsements or promotions of derivative products.

We believe that distributors and contributors play a pivotal role in advancing and refining the software. Adhering to these guidelines ensures clarity and mutual respect in the community.

---

## **Enjoy!**

---

Copyright © 2023 - [Ritwik Das](https://ritwikdas.gitlab.io).

All rights reserved under the MIT License.
