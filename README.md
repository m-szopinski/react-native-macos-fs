# react-native-macos-fs

Native filesystem module for React Native macOS written in Swift.

## Installation

```bash
npm install react-native-macos-fs
cd macos && pod install
```

## Usage (TypeScript or JavaScript)

```ts
import {
    readFile,
    writeFile,
    readFileBinary,
    writeFileBinary,
    unlink,
    exists,
    mkdir,
    getConstants
} from 'react-native-macos-fs';

await writeFile('/Users/me/test.txt', 'Hello macOS!', 'utf8');
const text = await readFile('/Users/me/test.txt');

await writeFileBinary('/Users/me/photo.png', base64String);
const imageData = await readFileBinary('/Users/me/photo.png');

const fileExists = await exists('/Users/me/test.txt');
await unlink('/Users/me/test.txt');
await mkdir('/Users/me/new-folder');

const paths = await getConstants();
console.log(paths.DocumentDirectoryPath);
```

## Methods (React Native FS-style)

### Text-based
- `readFile(filepath: string, encoding?: string): Promise<string>`
- `writeFile(filepath: string, contents: string, encoding?: string): Promise<void>`

### Binary
- `readFileBinary(filepath: string): Promise<string>` _(base64 encoded)_
- `writeFileBinary(filepath: string, base64: string): Promise<void>`

### File system utilities
- `unlink(filepath: string): Promise<void>`
- `exists(filepath: string): Promise<boolean>`
- `mkdir(filepath: string): Promise<void>`

### Directory constants
- `getConstants(): Promise<{ ... }>` — Returns common file system directory paths:

  | Constant Name              | Description                                           |
    |----------------------------|-------------------------------------------------------|
  | `DocumentDirectoryPath`    | App's documents folder (user-visible, sandboxed)     |
  | `TemporaryDirectoryPath`   | Temp storage, cleared automatically by the system    |
  | `CachesDirectoryPath`      | For cache files that can be deleted by the system    |
  | `DownloadsDirectoryPath?`  | (Optional) User's Downloads folder (if accessible)   |
  | `DesktopDirectoryPath?`    | (Optional) User's Desktop folder (if accessible)     |

  These paths can be used to construct file paths for safe, platform-correct storage.

### File & Directory Picker

- `pick(): Promise<{ ... }>` — Opens a file picker dialog and resolves with the selected file path.
- `pickDirectory(): Promise<string>` — Opens a folder picker dialog and resolves with the selected folder path.
