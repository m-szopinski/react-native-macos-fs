import {NativeModules, Platform} from 'react-native';

const LINKING_ERROR =
    `The package 'react-native-macos-fs' doesn't seem to be linked. Make sure:\n\n` +
    Platform.select({macos: "- You have run 'pod install'\n", default: ''}) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo managed workflow\n';

type Encoding = 'utf8' | 'utf16' | 'utf32' | 'ascii';

export interface ReadDirItem {
    name: string;
    path: string;
    ctime: number;
    mtime: number;
    size: number;
    mode: number;

    isFile(): boolean;

    isDirectory(): boolean;
}

export interface StatResult {
    ctime: number;
    mtime: number;
    size: number;
    mode: number;
    originalFilepath: string;

    isFile(): boolean;

    isDirectory(): boolean;
}

interface RNMacOSFSInterface {
    readFile(path: string, encoding: Encoding): Promise<string>;

    writeFile(path: string, contents: string, encoding: Encoding): Promise<void>;

    unlink(path: string): Promise<void>;

    exists(path: string): Promise<boolean>;

    mkdir(path: string): Promise<void>;

    readFileBinary(path: string): Promise<string>;

    writeFileBinary(path: string, base64: string): Promise<void>;

    pick(): Promise<string>;

    pickDirectory(): Promise<string>;

    readDir(path: string): Promise<ReadDirItem[]>;

    stat(path: string): Promise<StatResult>;

    // Constants
    DocumentDirectoryPath: string;
    TemporaryDirectoryPath: string;
    CachesDirectoryPath: string;
    DownloadsDirectoryPath: string;
    DesktopDirectoryPath: string;
}

const isMacOS = Platform.OS === 'macos';
const RNMacOSFS = NativeModules.RNMacOSFS as RNMacOSFSInterface;
if (isMacOS && !RNMacOSFS) {
    throw new Error(LINKING_ERROR);
}

export const DocumentDirectoryPath = RNMacOSFS.DocumentDirectoryPath;
export const TemporaryDirectoryPath = RNMacOSFS.TemporaryDirectoryPath;
export const CachesDirectoryPath = RNMacOSFS.CachesDirectoryPath;
export const DownloadsDirectoryPath = RNMacOSFS.DownloadsDirectoryPath;
export const DesktopDirectoryPath = RNMacOSFS.DesktopDirectoryPath;

const defaultEncoding: Encoding = 'utf8';

function handleError(method: string, path: string, err: unknown): never {
    throw new Error(`[react-native-macos-fs] ${method} failed on '${path}': ${String(err)}`);
}

export const readFile = async (path: string, encoding: Encoding = defaultEncoding) => {
    try {
        return await RNMacOSFS.readFile(path, encoding);
    } catch (err) {
        handleError('readFile', path, err);
    }
};

export const writeFile = async (path: string, contents: string, encoding: Encoding = defaultEncoding) => {
    try {
        return await RNMacOSFS.writeFile(path, contents, encoding);
    } catch (err) {
        handleError('writeFile', path, err);
    }
};

export const unlink = async (path: string) => {
    try {
        return await RNMacOSFS.unlink(path);
    } catch (err) {
        handleError('unlink', path, err);
    }
};

export const exists = async (path: string) => {
    try {
        return await RNMacOSFS.exists(path);
    } catch (err) {
        handleError('exists', path, err);
    }
};

export const mkdir = async (path: string) => {
    try {
        return await RNMacOSFS.mkdir(path);
    } catch (err) {
        handleError('mkdir', path, err);
    }
};

export const readFileBinary = async (path: string) => {
    try {
        return await RNMacOSFS.readFileBinary(path);
    } catch (err) {
        handleError('readFileBinary', path, err);
    }
};

export const writeFileBinary = async (path: string, base64: string) => {
    try {
        return await RNMacOSFS.writeFileBinary(path, base64);
    } catch (err) {
        handleError('writeFileBinary', path, err);
    }
};

export const pick = async () => {
    try {
        return await RNMacOSFS.pick();
    } catch (err) {
        throw new Error(`[react-native-macos-fs] pick failed: ${String(err)}`);
    }
};

export const pickDirectory = async () => {
    try {
        return await RNMacOSFS.pickDirectory();
    } catch (err) {
        throw new Error(`[react-native-macos-fs] pickDirectory failed: ${String(err)}`);
    }
};

export const readDir = async (path: string): Promise<ReadDirItem[]> => {
    try {
        const rawItems = await RNMacOSFS.readDir(path);

        return rawItems.map((item: any): ReadDirItem => ({
            name: item.name,
            path: item.path,
            ctime: item.ctime,
            mtime: item.mtime,
            size: item.size,
            mode: item.mode,
            isFile: () => item.type === 'file',
            isDirectory: () => item.type === 'directory',
        }));
    } catch (err) {
        throw new Error(`[react-native-macos-fs] readDir failed on '${path}': ${String(err)}`);
    }
};

export const stat = async (path: string): Promise<StatResult> => {
    try {
        const result: any = await RNMacOSFS.stat(path);
        return {
            ctime: result.ctime,
            mtime: result.mtime,
            size: result.size,
            mode: result.mode,
            originalFilepath: result.originalFilepath,
            isFile: () => result.type === 'file',
            isDirectory: () => result.type === 'directory',
        };
    } catch (err) {
        throw new Error(`[react-native-macos-fs] stat failed on '${path}': ${String(err)}`);
    }
};

