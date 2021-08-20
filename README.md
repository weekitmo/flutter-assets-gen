## 如何使用


- 1. 在项目pubspec.yaml下添加：

```yaml
flutter_assets:
  assets_path: assets/
  output_path: lib/constants/
  filename: assets.dart
```

- 2. 生成文件内容

```dart
class Assets {
  Assets._();
  
  /// Assets for loginLogo
  /// assets/images/login/logo.png
  static const String loginLogo = "assets/images/login/logo.png";

  /// Assets for tabHome
  /// assets/images/tab/home.png
  static const String tabHome = "assets/images/tab/home.png";
}
```

