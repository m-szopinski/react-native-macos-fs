# react-native-macos-fs

A native file system module for React Native macOS written in Swift.

## Installation

```bash
npm install react-native-macos-fs
cd macos && pod install
```

## Usage (TypeScript/JavaScript)

```ts
import {
  readFile,
  writeFile,
  readFileBinary,
  writeFileBinary,
  unlink,
  exists,
  mkdir,
  getConstants,
  readDir,
  stat,
  pick,
  pickDirectory,
  DocumentDirectoryPath,
} from 'react-native-macos-fs';

await writeFile('/Users/me/test.txt', 'Hello macOS!', 'utf8');
const text = await readFile('/Users/me/test.txt');

await writeFileBinary('/Users/me/photo.png', base64String);
const imageData = await readFileBinary('/Users/me/photo.png');

const fileExists = await exists('/Users/me/test.txt');
await unlink('/Users/me/test.txt');
await mkdir('/Users/me/new-folder');

const files = await readDir('/Users/me/new-folder');
const stats = await stat('/Users/me/photo.png');

const pickedFile = await pick();
const pickedDir = await pickDirectory();
```

## API

### Text File Operations

- `readFile(filepath: string, encoding?: string): Promise<string>`
- `writeFile(filepath: string, contents: string, encoding?: string): Promise<void>`

### Binary Operations

- `readFileBinary(filepath: string): Promise<string>` _(returns base64 string)_
- `writeFileBinary(filepath: string, base64: string): Promise<void>`

### File System Operations

- `unlink(filepath: string): Promise<void>`
- `exists(filepath: string): Promise<boolean>`
- `mkdir(filepath: string): Promise<void>`
- `readDir(filepath: string): Promise<ReadDirItem[]>`
- `stat(filepath: string): Promise<StatResult>`

### Directory Constants

- `DocumentDirectoryPath`
- `TemporaryDirectoryPath`
- `CachesDirectoryPath`
- `DownloadsDirectoryPath?`
- `DesktopDirectoryPath?`

| Constant Name              | Description                                                  |
|----------------------------|-------------------------------------------------------------|
| `DocumentDirectoryPath`    | App's documents folder (user-visible, sandboxed)            |
| `TemporaryDirectoryPath`   | Temporary directory, may be cleared by the system           |
| `CachesDirectoryPath`      | Cache files, may be cleared by the system                   |
| `DownloadsDirectoryPath?`  | (Optional) User's Downloads folder                          |
| `DesktopDirectoryPath?`    | (Optional) User's Desktop folder                            |

### File and Directory Pickers

- `pick(): Promise<string>` — Opens a file picker dialog, returns the selected file path.
- `pickDirectory(): Promise<string>` — Opens a folder picker dialog, returns the selected directory path.

### Cross-platform Example (with react-native-fs)

```ts
import { Platform } from 'react-native';
import * as RNFS from 'react-native-fs';
import * as RNMacFS from 'react-native-macos-fs';

const FS = Platform.OS === 'macos' ? RNMacFS : RNFS;

export const readFile = async (filepath: string, encoding: 'utf8' | 'utf16' | 'utf32' | 'ascii' = 'utf8') =>
  FS.readFile(filepath, encoding);

export const writeFile = async (filepath: string, contents: string, encoding: 'utf8' | 'utf16' | 'utf32' | 'ascii' = 'utf8') =>
  FS.writeFile(filepath, contents, encoding);

export const readFileBinary = async (filepath: string) =>
  FS.readFileBinary(filepath);

export const writeFileBinary = async (filepath: string, base64: string) =>
  FS.writeFileBinary(filepath, base64);

export const unlink = async (filepath: string) =>
  FS.unlink(filepath);

export const exists = async (filepath: string) =>
  FS.exists(filepath);

export const mkdir = async (filepath: string) =>
  FS.mkdir(filepath);

export const readDir = async (filepath: string) =>
  FS.readDir(filepath);

export const stat = async (filepath: string) =>
  FS.stat(filepath);

export const docs = () =>
  FS.DocumentDirectoryPath;
```
