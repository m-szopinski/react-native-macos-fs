type Encoding = 'utf8' | 'utf16' | 'utf32' | 'ascii';
export declare const readFile: (path: string, encoding?: Encoding) => Promise<string>;
export declare const writeFile: (path: string, contents: string, encoding?: Encoding) => Promise<void>;
export declare const unlink: (path: string) => Promise<void>;
export declare const exists: (path: string) => Promise<boolean>;
export declare const mkdir: (path: string) => Promise<void>;
export declare const readFileBinary: (path: string) => Promise<string>;
export declare const writeFileBinary: (path: string, base64: string) => Promise<void>;
export declare const getConstants: () => Promise<{
    DocumentDirectoryPath: string;
    TemporaryDirectoryPath: string;
    CachesDirectoryPath: string;
    DownloadsDirectoryPath?: string;
    DesktopDirectoryPath?: string;
}>;
export declare const pick: () => Promise<string>;
export declare const pickDirectory: () => Promise<string>;
export {};
