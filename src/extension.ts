// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	let psProfilePath = path.join(process.env.USERPROFILE || '', 'Documents', 'PowerShell', 'Microsoft.PowerShell_profile.ps1');
	let backupPath = psProfilePath + '.backup';
	let psProfileDir = path.dirname(psProfilePath);

	// Ensure the directory exists
	if (!fs.existsSync(psProfileDir)) {
		fs.mkdirSync(psProfileDir, { recursive: true });
	}

	if (!fs.existsSync(backupPath)) {
		if (fs.existsSync(psProfilePath)) {
			fs.copyFileSync(psProfilePath, backupPath);  // Create a backup before modifying
		}
	}

	let newPromptFunction =
		"function prompt {\n" +
		"    # Display the current path in green\n" +
		"    $currentPath = $PWD.Path\n" +
		"    Write-Host $currentPath -NoNewline -ForegroundColor Green\n" +
		"    Write-Host \"`n> \" -NoNewline\n" +
		"    return \" \"\n" +
		"}";

	if (fs.existsSync(psProfilePath)) {
		let content = fs.readFileSync(psProfilePath, 'utf8');
		if (!content.includes('function prompt')) {
			content += newPromptFunction;
			fs.writeFileSync(psProfilePath, content, 'utf8');
		}
	} else {
		fs.writeFileSync(psProfilePath, newPromptFunction, 'utf8');
	}

	vscode.window.showInformationMessage('PowerShell profile customized!');
}




// This method is called when your extension is deactivated
export function deactivate() {
	let psProfilePath = path.join(process.env.USERPROFILE || '', 'Documents', 'PowerShell', 'Microsoft.PowerShell_profile.ps1');
	let backupPath = psProfilePath + '.backup';

	// Check if backup exists
	if (fs.existsSync(backupPath)) {
		// Ask the user if they want to restore their original profile
		vscode.window.showInformationMessage('Do you want to restore your original PowerShell profile?', 'Yes', 'No').then(selection => {
			if (selection === 'Yes') {
				fs.copyFileSync(backupPath, psProfilePath);  // Restore from backup
				fs.unlinkSync(backupPath);  // Delete the backup after restoring
				vscode.window.showInformationMessage('Original PowerShell profile restored.');
			}
		});
	}
}
