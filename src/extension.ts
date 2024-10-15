import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const cmd: string = 'vs-code-auto-typer.autoTypeScript';
	const path: string = '/Users/alan/Desktop/example2.py';
	const disposable = vscode.commands.registerCommand(cmd, async () => {
		const uri = vscode.Uri.parse(`untitled:${path}`);
		const doc = await vscode.workspace.openTextDocument(uri);
		await vscode.window.showTextDocument(doc, { preview: false });
		const editor = await vscode.window.activeTextEditor;
		const pos = new vscode.Position(0, 0);
		if (editor) {
			await editor.edit((editBuilder) => {
				editBuilder.insert(
					pos, `print("hello, new python file")`
				);
			});
		}
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}