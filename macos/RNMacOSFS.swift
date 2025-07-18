import Foundation

@objc(RNMacOSFS)
class RNMacOSFS: NSObject {

  @objc static func moduleName() -> String! {
    return "RNMacOSFS"
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  private func encodingFromString(_ encoding: String) -> String.Encoding? {
    switch encoding.lowercased() {
    case "utf8": return .utf8
    case "utf16": return .utf16
    case "utf32": return .utf32
    case "ascii": return .ascii
    default: return nil
    }
  }

  @objc
  func readFile(_ path: NSString, withEncoding encoding: NSString, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let encoding = encodingFromString(encoding as String) else {
      reject("ENCODING_ERROR", "Unsupported encoding type: \(encoding)", nil)
      return
    }

    do {
      let contents = try String(contentsOfFile: path as String, encoding: encoding)
      resolve(contents)
    } catch {
      reject("READ_ERROR", "Failed to read file at path: \(path)", error)
    }
  }

  @objc
  func writeFile(_ path: NSString, withContents contents: NSString, withEncoding encoding: NSString, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let encoding = encodingFromString(encoding as String) else {
      reject("ENCODING_ERROR", "Unsupported encoding type: \(encoding)", nil)
      return
    }

    do {
      try contents.write(toFile: path as String, atomically: true, encoding: encoding.rawValue)
      resolve(nil)
    } catch {
      reject("WRITE_ERROR", "Failed to write file at path: \(path)", error)
    }
  }

  @objc
  func unlink(_ path: NSString, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    do {
      try FileManager.default.removeItem(atPath: path as String)
      resolve(nil)
    } catch {
      reject("UNLINK_ERROR", "Failed to delete file at path: \(path)", error)
    }
  }

  @objc
  func exists(_ path: NSString, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    let exists = FileManager.default.fileExists(atPath: path as String)
    resolve(exists)
  }

  @objc
  func mkdir(_ path: NSString, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    do {
      try FileManager.default.createDirectory(atPath: path as String, withIntermediateDirectories: true, attributes: nil)
      resolve(nil)
    } catch {
      reject("MKDIR_ERROR", "Failed to create directory at path: \(path)", error)
    }
  }

  @objc
  func readFileBinary(_ path: NSString, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    do {
      let data = try Data(contentsOf: URL(fileURLWithPath: path as String))
      let base64String = data.base64EncodedString()
      resolve(base64String)
    } catch {
      reject("READ_BINARY_ERROR", "Failed to read binary file at path: \(path)", error)
    }
  }

  @objc
  func writeFileBinary(_ path: NSString, withBase64 base64: NSString, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let data = Data(base64Encoded: base64 as String) else {
      reject("DECODE_ERROR", "Invalid base64 string", nil)
      return
    }

    do {
      try data.write(to: URL(fileURLWithPath: path as String))
      resolve(nil)
    } catch {
      reject("WRITE_BINARY_ERROR", "Failed to write binary file at path: \(path)", error)
    }
  }

  @objc
  func readDir(_ path: NSString, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let fileManager = FileManager.default
    do {
      let contents = try fileManager.contentsOfDirectory(atPath: path as String)
      var result: [[String: Any]] = []

      for item in contents {
        let fullPath = (path as String) + "/" + item
        var isDir: ObjCBool = false
        fileManager.fileExists(atPath: fullPath, isDirectory: &isDir)

        let entry: [String: Any] = [
          "name": item,
          "path": fullPath,
          "isFile": !isDir.boolValue,
          "isDirectory": isDir.boolValue
        ]
        result.append(entry)
      }

      resolve(result)
    } catch {
      reject("READDIR_ERROR", "Failed to read directory at path: \(path)", error)
    }
  }

  @objc
  func pick(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      let panel = NSOpenPanel()
      panel.allowsMultipleSelection = false
      panel.canChooseDirectories = false
      panel.canChooseFiles = true
      panel.begin { response in
        if response == .OK, let url = panel.url {
          resolve(url.path)
        } else {
          reject("PICK_CANCELLED", "User cancelled file picking", nil)
        }
      }
    }
  }

  @objc
  func pickDirectory(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      let panel = NSOpenPanel()
      panel.canChooseDirectories = true
      panel.canChooseFiles = false
      panel.allowsMultipleSelection = false
      panel.begin { response in
        if response == .OK, let url = panel.url {
          resolve(url.path)
        } else {
          reject("PICK_DIRECTORY_CANCELLED", "User cancelled directory picking", nil)
        }
      }
    }
  }

  @objc
  func constantsToExport() -> [String: Any]! {
    let fileManager = FileManager.default

    return [
      "DocumentDirectoryPath": fileManager.urls(for: .documentDirectory, in: .userDomainMask).first?.path ?? "",
      "TemporaryDirectoryPath": NSTemporaryDirectory(),
      "CachesDirectoryPath": fileManager.urls(for: .cachesDirectory, in: .userDomainMask).first?.path ?? "",
      "DownloadsDirectoryPath": fileManager.urls(for: .downloadsDirectory, in: .userDomainMask).first?.path ?? "",
      "DesktopDirectoryPath": fileManager.urls(for: .desktopDirectory, in: .userDomainMask).first?.path ?? ""
    ]
  }
}
