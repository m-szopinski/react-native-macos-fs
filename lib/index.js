import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-macos-fs' doesn't seem to be linked. Make sure:\n\n` +
    Platform.select({ macos: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo managed workflow\n';
// Ensure RNMacOSFS is either the real native module or a proxy that throws
const RNMacOSFS = NativeModules.RNMacOSFS;
if (!RNMacOSFS) {
    throw new Error(LINKING_ERROR);
}
// Export constants immediately and synchronously
export const constants = {
    DocumentDirectoryPath: RNMacOSFS.DocumentDirectoryPath,
    TemporaryDirectoryPath: RNMacOSFS.TemporaryDirectoryPath,
    CachesDirectoryPath: RNMacOSFS.CachesDirectoryPath,
    DownloadsDirectoryPath: RNMacOSFS.DownloadsDirectoryPath,
    DesktopDirectoryPath: RNMacOSFS.DesktopDirectoryPath,
};
const defaultEncoding = 'utf8';
function handleError(method, path, err) {
    throw new Error(`[react-native-macos-fs] ${method} failed on '${path}': ${String(err)}`);
}
// API methods
export const readFile = async (path, encoding = defaultEncoding) => {
    try {
        return await RNMacOSFS.readFile(path, encoding);
    }
    catch (err) {
        handleError('readFile', path, err);
    }
};
export const writeFile = async (path, contents, encoding = defaultEncoding) => {
    try {
        return await RNMacOSFS.writeFile(path, contents, encoding);
    }
    catch (err) {
        handleError('writeFile', path, err);
    }
};
export const unlink = async (path) => {
    try {
        return await RNMacOSFS.unlink(path);
    }
    catch (err) {
        handleError('unlink', path, err);
    }
};
export const exists = async (path) => {
    try {
        return await RNMacOSFS.exists(path);
    }
    catch (err) {
        handleError('exists', path, err);
    }
};
export const mkdir = async (path) => {
    try {
        return await RNMacOSFS.mkdir(path);
    }
    catch (err) {
        handleError('mkdir', path, err);
    }
};
export const readFileBinary = async (path) => {
    try {
        return await RNMacOSFS.readFileBinary(path);
    }
    catch (err) {
        handleError('readFileBinary', path, err);
    }
};
export const writeFileBinary = async (path, base64) => {
    try {
        return await RNMacOSFS.writeFileBinary(path, base64);
    }
    catch (err) {
        handleError('writeFileBinary', path, err);
    }
};
export const pick = async () => {
    try {
        return await RNMacOSFS.pick();
    }
    catch (err) {
        throw new Error(`[react-native-macos-fs] pick failed: ${String(err)}`);
    }
};
export const pickDirectory = async () => {
    try {
        return await RNMacOSFS.pickDirectory();
    }
    catch (err) {
        throw new Error(`[react-native-macos-fs] pickDirectory failed: ${String(err)}`);
    }
};
export const readDir = async (path) => {
    try {
        return await RNMacOSFS.readDir(path);
    }
    catch (err) {
        throw new Error(`[react-native-macos-fs] readDir failed on '${path}': ${String(err)}`);
    }
};
export const stat = async (path) => {
    try {
        return await RNMacOSFS.stat(path);
    }
    catch (err) {
        throw new Error(`[react-native-macos-fs] stat failed on '${path}': ${String(err)}`);
    }
};
