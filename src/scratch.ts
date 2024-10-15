import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {



	// const myScheme = "autotyper";
	// const myProvider = new (class implements vscode.TextDocumentContentProvider {
	// 	onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
	// 	onDidChange = this.onDidChangeEmitter.event;
	// 	provideTextDocumentContent(uri: vscode.Uri): string {
	// 	  return "";
	// 	}
	//   })();
	// context.subscriptions.push(
	// 	vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider)
	// );

	const disposable = vscode.commands.registerCommand('vs-code-auto-typer.autoTypeScript', async () => {
		
		const doc = await vscode.workspace.openTextDocument();
		await vscode.window.showTextDocument(doc, { preview: false });
		// const editor = await vscode.window.activeTextEditor;
		
		// // const uri = vscode.Uri.parse('autotyper:example-name');
		// const uri = vscode.Uri.parse('file:///Users/alan/Desktop/tmp.txt');
		// const doc = await vscode.workspace.openTextDocument(uri);
		// await vscode.window.showTextDocument(doc, { preview: false });
		// const editor = await vscode.window.activeTextEditor;
		// const pos = new vscode.Position(0, 0);
		// if (editor) {
		// 	console.log("aaaaa");
		// 	await editor.edit((editBuilder) => {
		// 		editBuilder.insert(
		// 			pos, "this is the text"
		// 		);
		// 	});

		// 	console.log("cccc");
		// } else {
		// 	console.log("bbbbbb");
		// }

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}




/////

// import * as vscode from 'vscode';

// export function activate(context: vscode.ExtensionContext) {
// 	const disposable = vscode.commands.registerCommand('vs-code-auto-typer.autoTypeScript', async () => {
// 		const doc = await vscode.workspace.openTextDocument({ language: "python" });
// 		await vscode.window.showTextDocument(doc, { preview: false });
// 		const editor = await vscode.window.activeTextEditor;
// 		const pos = new vscode.Position(0, 0);
// 		if (editor) {
// 			await editor.edit((editBuilder) => {
// 				editBuilder.insert(
// 					pos, `print("hello, extension")`
// 				);
// 			});
// 		}
// 	});
// 	context.subscriptions.push(disposable);
// }

// export function deactivate() {}




// import * as vscode from 'vscode';

// export function activate(context: vscode.ExtensionContext) {
// 	const cmd: string = 'vs-code-auto-typer.autoTypeScript';
// 	const path: string = '/Users/alan/Desktop/example2.py';
// 	const disposable = vscode.commands.registerCommand(cmd, async () => {
// 		const uri = vscode.Uri.parse(`untitled:${path}`);
// 		const doc = await vscode.workspace.openTextDocument(uri);
// 		await vscode.window.showTextDocument(doc, { preview: false });
// 		const editor = await vscode.window.activeTextEditor;
// 		const pos = new vscode.Position(0, 0);
// 		if (editor) {
// 			await editor.edit((editBuilder) => {
// 				editBuilder.insert(
// 					pos, `print("hello, new python file")`
// 				);
// 			});
// 		}
// 	});
// 	context.subscriptions.push(disposable);
// }

// export function deactivate() {}