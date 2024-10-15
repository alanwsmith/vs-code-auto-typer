import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';
import os from 'os';

interface ConfigOptions {
	outputs: string[];
	edits: string[];
}

function loadConfig(configPath: string): ConfigOptions {
	const fileData = fs.readFileSync(configPath, 'utf8');
	return JSON.parse(fileData);
}

export function activate(context: vscode.ExtensionContext) {
	const cmd: string = 'vs-code-auto-typer.autoTypeScript';
	const configPath = path.join(os.homedir(), "Desktop", "auto-type.json");
	const disposable = vscode.commands.registerCommand(cmd, async () => {
		const config: ConfigOptions = loadConfig(configPath);
		console.log(config);

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