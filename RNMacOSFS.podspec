Pod::Spec.new do |s|
  s.name         = "RNMacOSFS"
  s.version      = "0.1.0"
  s.summary      = "A macOS filesystem module for React Native"
  s.description  = <<-DESC
                   Read files natively in macOS using Swift.
                   DESC
  s.homepage     = "https://github.com/m-szopinski/react-native-macos-fs"
  s.license      = { :type => "MIT" }
  s.author       = { "Your Name" => "m-szopinski" }
  s.platform     = :osx, "10.14"
  s.source       = { :path => "." }
  s.source_files = "macos/**/*.{h,m,mm,swift}"
  s.requires_arc = true
  s.swift_version = "5.0"
  s.dependency "React-Core"
end
