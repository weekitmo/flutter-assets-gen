## 如何使用


- 1.在项目pubspec.yaml下添加：

```yaml
flutter_assets:
  assets_path: assets/images/
  output_path: lib/common/assets/
  filename: assets.dart
```

- 2. 生成文件内容

```dart
class Assets {
  Assets._();
  
  /// Assets for loginLogo
  /// login/2x/logo, login/3x/logo, login/logo
  static const String loginLogo = "assets/images/login/logo.png";

  /// Assets for tabHome
  /// tab/2x/home, tab/3x/home, tab/home
  static const String tabHome = "assets/images/tab/home.png";
}
```

