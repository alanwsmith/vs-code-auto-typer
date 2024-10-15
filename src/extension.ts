import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import os from 'os';

interface ConfigOptions {
	outputs: ConfigOutput[];
	settings: ConfigSettings;
}

interface ConfigOutput {
	filePath: string;
	updates: ConfigUpdate[];
}

interface ConfigUpdate {
	action: string;
	values: string[];
}

interface ConfigSettings {
    smallPauseMs: number;
    mediumPauseMs: number;
    largePauseMs: number;
    editPauseMs: number;
}

async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
  
  

function loadConfig(configPath: string): ConfigOptions {
	const fileData = fs.readFileSync(configPath, 'utf8');
	return JSON.parse(fileData);
}

async function doOutput(output: ConfigOutput) {
	////////////////////////////////////////////////////////
	// TODO: Make this work so it either opens the
	// existing file or creates a new one in the
	// desired location
	// let uri = vscode.Uri.file(output.filePath);
	// if (!uri) {
	// 	vscode.Uri.parse(`untitled:${output.filePath}`);
	// }
	// Doing this in the mean time:
	const uri = vscode.Uri.parse(`untitled:${output.filePath}`);
	////////////////////////////////////////////////////////
	const doc = await vscode.workspace.openTextDocument(uri);
	await vscode.window.showTextDocument(doc, { preview: false });
	await output.updates.forEach(async (update) => {
		await doUpdate(update);
	}); 

	// const editor = await vscode.window.activeTextEditor;
	// if (editor) {
	// 	await output.updates.forEach(async (update) => {
	// 		await doUpdate(editor, update);
	// 	}); 
	// }

}

async function doUpdate(update: ConfigUpdate) {
	if (update.action === "write") {
		const characters = await update.values.join("").split("");
		for (let i = 0; i < characters.length; i++) {
			await writeCharacter(characters[i]);
		}
	}
}

async function writeCharacter(character: string) {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		editor.edit(async(eb) => {
			await eb.replace(editor.selection, character);
		});
		await sleep(100);
	}
}

export function activate(context: vscode.ExtensionContext) {
	const cmd: string = 'vs-code-auto-typer.autoTypeScript';
	const configPath = path.join(os.homedir(), "Desktop", "auto-type.json");
	const disposable = vscode.commands.registerCommand(cmd, async () => {
		const configFull: ConfigOptions = loadConfig(configPath);
		// The script only handles one output for now so
		// just grab the first one. (Adding multiple file 
		// edits is a target for the next version. It'll
		// mostly work with this set up, but there might
		// be an issue with trying to edit a file a second 
		// time due to the `untitled:` uri schema. That
		// needs to be looked at.
		const output0 = configFull.outputs[0];
		await doOutput(output0);
		

		// console.log(config);

		// const uri = vscode.Uri.parse(`untitled:${tmpFilePath}`);
		// const doc = await vscode.workspace.openTextDocument(uri);
		// await vscode.window.showTextDocument(doc, { preview: false });
		// const editor = await vscode.window.activeTextEditor;
		// const pos = new vscode.Position(0, 0);
		// if (editor) {
		// 	await editor.edit((editBuilder) => {
		// 		editBuilder.insert(
		// 			pos, `print("hello, new python file")`
		// 		);
		// 	});
		// }

	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}

