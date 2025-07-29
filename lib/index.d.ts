type Encoding = 'utf8' | 'utf16' | 'utf32' | 'ascii';
export declare const constants: {
    readonly DocumentDirectoryPath: string;
    readonly TemporaryDirectoryPath: string;
    readonly CachesDirectoryPath: string;
    readonly DownloadsDirectoryPath: string;
    readonly DesktopDirectoryPath: string;
};
export declare const readFile: (path: string, encoding?: Encoding) => Promise<string>;
export declare const writeFile: (path: string, contents: string, encoding?: Encoding) => Promise<void>;
export declare const unlink: (path: string) => Promise<void>;
export declare const exists: (path: string) => Promise<boolean>;
export declare const mkdir: (path: string) => Promise<void>;
export declare const readFileBinary: (path: string) => Promise<string>;
export declare const writeFileBinary: (path: string, base64: string) => Promise<void>;
export declare const pick: () => Promise<string>;
export declare const pickDirectory: () => Promise<string>;
export declare const readDir: (path: string) => Promise<{
    name: string;
    path: string;
    isFile: boolean;
    isDirectory: boolean;
}[]>;
export declare const stat: (path: string) => Promise<{
    ctime: number;
    mtime: number;
    size: number;
    mode: number;
    originalFilepath: string;
    isFile: boolean;
    isDirectory: boolean;
}>;
export {};
