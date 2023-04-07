## 命令 (Provide commands)
- F1 > Search flutter assets
  - `Flutter Assets: Watch`
  - `Flutter Assets: Stop Watch`
  - `Flutter Assets: Generate`
  
![screenshot](./images/screenshot.png)

## 如何使用 (How to use)


- step 1. 在项目pubspec.yaml下添加 (Add under project pubspec.yaml)：

```yaml
flutter_assets:
  assets_path: assets/
  output_path: lib/constants/
  filename: assets.dart
```

  - **field_prefix为可选字段，如果想去掉assets前缀，则提供一个空，默认为assets** (**field_prefix is ​​an optional field, if you want to remove the assets prefix, provide an empty value, the default is assets**)
  ```yaml
  flutter_assets:
    assets_path: assets/
    output_path: lib/constants/
    filename: assets.dart
    field_prefix:
  ```
  - **修改prefix** (**Modify prefix**)
  ```yaml
  flutter_assets:
    assets_path: assets/
    output_path: lib/constants/
    filename: assets.dart
    field_prefix: resource
  ```

- step 2. 生成文件内容 (Generate file content)

```dart
class Assets {
  Assets._();

  /// Assets for loginLogo
  /// assets/images/login/logo.png
  static const String assetsImagesLoginLogo = "assets/images/login/logo.png";

  /// Assets for tabHome
  /// assets/images/tab/home.png
  static const String assetsImagesTabHome = "assets/images/tab/home.png";
}
```
- step 3. 引入 (introduce)

```dart
import 'constants/assets.dart';
/// example1:
Image.asset(Assets.assetsImagesLoginLogo, height: 30, width: 30),
/// example2:
Image(image: AssetImage(Assets.assetsImagesTabHome,), height: 30, width: 30),
```


