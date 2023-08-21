import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

interface ProfileInfo {
	profilePath: string;
	name: string;
}

function getProfilePaths(): ProfileInfo[] {
	let userProfile = process.env.USERPROFILE || '';
	return [
		{
			profilePath: path.join(userProfile, 'Documents', 'WindowsPowerShell', 'profile.ps1'),
			name: 'Windows PowerShell'
		},
		{
			profilePath: path.join(userProfile, 'cmdProfile.cmd'), // Directly in the user's home directory
			name: 'Command Prompt'
		},
		{
			profilePath: path.join(userProfile, 'Documents', 'PowerShell', 'Microsoft.PowerShell_profile.ps1'),
			name: 'PowerShell'
		}
	];
}

export function activate(context: vscode.ExtensionContext) {
	let profiles = getProfilePaths();

	profiles.forEach(paths => {
		let psProfilePath = paths.profilePath;
		let backupPath = psProfilePath + '.backup';
		let psProfileDir = path.dirname(psProfilePath);

		// Ensure the directory exists
		if (!fs.existsSync(psProfileDir)) {
			fs.mkdirSync(psProfileDir, { recursive: true });
		}

		// Backup logic
		if (!fs.existsSync(backupPath)) {
			if (fs.existsSync(psProfilePath)) {
				fs.copyFileSync(psProfilePath, backupPath);
			}
		}

		let newPromptFunction: string = ''; // Set default value to an empty string

		switch (paths.name) {
			case 'Windows PowerShell':
			case 'PowerShell':
				newPromptFunction =
					"function prompt {\n" +
					"    $currentPath = $PWD.Path\n" +
					"    Write-Host $currentPath -NoNewline -ForegroundColor Green\n" +
					"    Write-Host \"`n> \" -NoNewline\n" +
					"    return \" \"\n" +
					"}";
				break;
			case 'Command Prompt':
				newPromptFunction =
					"@echo off\n" +
					"echo | set /p nul=%cd%\n" +
					"echo ^>\n";
				break;
		}

		if (fs.existsSync(psProfilePath)) {
			let content = fs.readFileSync(psProfilePath, 'utf8');
			if (!content.includes('function prompt') && (paths.name === 'Windows PowerShell' || paths.name === 'PowerShell')) {
				content += newPromptFunction;
				fs.writeFileSync(psProfilePath, content, 'utf8');
			} else if (!content.includes('@echo off') && paths.name === 'Command Prompt') {
				content += newPromptFunction;
				fs.writeFileSync(psProfilePath, content, 'utf8');
			}
		} else {
			fs.writeFileSync(psProfilePath, newPromptFunction, 'utf8');
		}

		vscode.window.showInformationMessage(`${paths.name} profile customized!`);
	});
}

export function deactivate() {
	let profiles = getProfilePaths();

	profiles.forEach(paths => {
		let psProfilePath = paths.profilePath;
		let backupPath = psProfilePath + '.backup';

		// Check if backup exists
		if (fs.existsSync(backupPath)) {
			vscode.window.showInformationMessage(`Do you want to restore your original ${paths.name} profile?`, 'Yes', 'No').then(selection => {
				if (selection === 'Yes') {
					fs.copyFileSync(backupPath, psProfilePath);
					fs.unlinkSync(backupPath);
					vscode.window.showInformationMessage(`Original ${paths.name} profile restored.`);
				}
			});
		}
	});
}
