import * as vscode from 'vscode'
import fs from 'fs'
import path from 'path'
import os from 'os'
import JSON5 from 'json5'

interface ConfigOutput {
  filePath: string
  updates: ConfigUpdate[]
}

interface ConfigPause {
  min: number
  max: number
}

interface ConfigPauseDict {
  [key: string]: ConfigPause
}

interface ConfigRoot {
  outputs: ConfigOutput[]
  settings: ConfigSettings
}

interface ConfigSettings {
  debug: boolean
  pauses: ConfigPauseDict
}

interface ConfigUpdate {
  action: string
  kind?: string
  count?: number
  text?: string
}

// async function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

function loadConfig(path: string): ConfigRoot {
  const data = fs.readFileSync(path, 'utf8')
  const config: ConfigRoot = JSON5.parse(data)
  return config
}

// function randomNumBetween(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

async function doOutput(output: ConfigOutput, settings: ConfigSettings) {
  ////////////////////////////////////////////////////////
  // TODO: Make this work so it either opens the
  // existing file or creates a new one in the
  // desired location
  // let uri = vscode.Uri.file(output.filePath);
  // if (!uri) {
  // 	vscode.Uri.parse(`untitled:${output.filePath}`);
  // }
  // Doing this in the mean time:
  const uri = vscode.Uri.parse(`untitled:${output.filePath}`)
  ////////////////////////////////////////////////////////
  const doc = await vscode.workspace.openTextDocument(uri)
  await vscode.window.showTextDocument(doc, { preview: false })
  for (let u = 0; u < output.updates.length; u++) {
    await doUpdate(output.updates[u], settings)
  }

  // const editor = await vscode.window.activeTextEditor;
  // if (editor) {
  // 	await output.updates.forEach(async (update) => {
  // 		await doUpdate(editor, update);
  // 	});
  // }
}

async function doPause(kind: string, settings: ConfigSettings) {
  if (settings.debug === true) {
    return new Promise((resolve) => setTimeout(resolve, 0))
  } else {
    const delay = Math.floor(
      Math.random() *
        (settings.pauses[kind].max - settings.pauses[kind].min + 1) +
        settings.pauses[kind].min
    )
    return new Promise((resolve) => setTimeout(resolve, delay))
  }
}

async function doUpdate(update: ConfigUpdate, settings: ConfigSettings) {
  if (update.action === 'write' && update.text) {
    const characters = await update.text.split('')
    for (let i = 0; i < characters.length; i++) {
      await writeCharacter(characters[i], settings)
    }
  } else if (update.action === 'pause' && update.kind) {
    await doPause(update.kind, settings)
  } else if (update.action === 'tab' && update.count) {
    for (let i = 0; i < update.count; i++) {
      await writeCharacter('\t', settings)
    }
	await doPause('tab', settings)
  } else if (update.action === 'newline' && update.count) {
    for (let i = 0; i < update.count; i++) {
      await writeCharacter('\n', settings)
    }
	await doPause('newline', settings)
  }
}

async function writeCharacter(character: string, settings: ConfigSettings) {
  const editor = await vscode.window.activeTextEditor
  if (editor) {
    await editor.edit(async (eb) => {
      await eb.replace(editor.selection, character)
    })
    await doPause('character', settings)
  }
}

export function activate(context: vscode.ExtensionContext) {
  const cmd: string = 'vs-code-auto-typer.autoTypeScript'
  const configPath = path.join(os.homedir(), 'Desktop', 'auto-type.json5')
  const disposable = vscode.commands.registerCommand(cmd, async () => {
    const config: ConfigRoot = loadConfig(configPath)
    // The script only handles one output for now so
    // just grab the first one. (Adding multiple file
    // edits is a target for the next version. It'll
    // mostly work with this set up, but there might
    // be an issue with trying to edit a file a second
    // time due to the `untitled:` uri schema. That
    // needs to be looked at.
    const output = config.outputs[0]
    await doOutput(output, config.settings)

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
  })
  context.subscriptions.push(disposable)
}

export function deactivate() {}
