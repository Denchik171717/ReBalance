# 📦 APK Creation Guide (Capacitor)

## 🎯 Когда это нужно

Используйте этот метод, если PWA недостаточно и требуется:
- ✅ Реальный APK-файл для распространения
- ✅ Публикация в Google Play Store
- ✅ Доступ к нативным API (камера, уведомления, GPS)
- ✅ Иконка в лаунчере Android

**Время: ~2-3 часа (первый раз)**

---

## 📋 Требования

### На компьютере:
- ✅ **Node.js** 18+ (уже установлен)
- ✅ **Android Studio** (скачать: https://developer.android.com/studio)
- ✅ **JDK 17+** (обычно устанавливается с Android Studio)
- ✅ **8+ GB свободного места**

### Аккаунт:
- ✅ **Google Play Developer** ($25 разовый) - только для публикации в магазине

---

## 🚀 Шаг 1: Установка Capacitor

```bash
# Установить Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# Инициализировать Capacitor
npx cap init
```

**Введите при запросе:**
- App name: `Mindful Recharge`
- App ID: `com.yourdomain.mindfulrecharge` (измените на свой домен)
- Web Directory: `build/client`

---

## 🔧 Шаг 2: Настройка проекта

### Обновите `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourdomain.mindfulrecharge',
  appName: 'Mindful Recharge',
  webDir: 'build/client',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

---

## 📱 Шаг 3: Добавление Android платформы

```bash
# Собрать веб-проект
npm run build

# Добавить Android платформу
npx cap add android

# Синхронизировать файлы
npx cap sync
```

---

## 🛠️ Шаг 4: Открыть в Android Studio

```bash
npx cap open android
```

**Android Studio откроется автоматически**

### Первый запуск Android Studio:
1. Дождитесь индексации проекта (может занять 5-10 минут)
2. При запросе установите необходимые SDK компоненты
3. Примите лицензии Android SDK

---

## 🏗️ Шаг 5: Сборка APK

### A. Debug APK (для тестирования)

В Android Studio:
1. `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
2. Дождитесь завершения (~2-5 минут)
3. Нажмите `locate` в уведомлении

**Путь к файлу:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Этот файл можно установить на Android:**
```bash
# Подключите телефон через USB
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### B. Release APK (для производства)

**Требует подписи (signing key)**

#### Создание ключа подписи:

```bash
cd android/app
keytool -genkey -v -keystore mindful-release.keystore -alias mindful -keyalg RSA -keysize 2048 -validity 10000
```

**Введите:**
- Password: ваш пароль (запомните!)
- Name, Organization, etc.: ваши данные

#### Настройка подписи:

Создайте файл `android/gradle.properties`:

```properties
MYAPP_RELEASE_STORE_FILE=mindful-release.keystore
MYAPP_RELEASE_KEY_ALIAS=mindful
MYAPP_RELEASE_STORE_PASSWORD=ваш_пароль
MYAPP_RELEASE_KEY_PASSWORD=ваш_пароль
```

⚠️ **НЕ КОММИТЬТЕ** `gradle.properties` в Git!

#### Обновите `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            ...
        }
    }
}
```

#### Собрать Release APK:

В Android Studio:
1. `Build` → `Select Build Variant` → выберите `release`
2. `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`

**Путь:**
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📲 Шаг 6: Тестирование APK

### На эмуляторе:
1. В Android Studio: `Tools` → `Device Manager`
2. Create Device → выберите модель → Next
3. Выберите System Image (например, API 34) → Download → Next
4. Finish
5. Запустите эмулятор (▶️)
6. Drag & Drop APK на экран эмулятора

### На реальном устройстве:
1. **Включите "Режим разработчика"** на Android:
   - Настройки → О телефоне
   - 7 раз нажмите "Номер сборки"
2. **Включите "Отладку по USB"**:
   - Настройки → Для разработчиков → Отладка по USB
3. **Подключите через USB**
4. **Установите:**

```bash
adb install path/to/app-release.apk
```

Или отправьте APK на телефон и установите вручную (требуется разрешение "Неизвестные источники").

---

## 🌐 Шаг 7: Google Play Store (опционально)

### Требования:
- ✅ **Google Play Developer Account** ($25)
- ✅ **AAB файл** (Android App Bundle) вместо APK

### Создание AAB:

В Android Studio:
1. `Build` → `Generate Signed Bundle / APK`
2. Выберите `Android App Bundle`
3. Выберите keystore и введите пароли
4. `release` build variant
5. Finish

**Путь:**
```
android/app/build/outputs/bundle/release/app-release.aab
```

### Публикация:
1. https://play.google.com/console
2. Create App
3. Заполните Store Listing (описание, скриншоты, иконки)
4. Upload AAB в Production/Internal Testing
5. Submit for Review

**Время проверки:** 1-7 дней

---

## 🔄 Обновление приложения

### Изменили код веб-приложения?

```bash
# 1. Пересоберите веб
npm run build

# 2. Синхронизируйте с Android
npx cap sync

# 3. Соберите новый APK в Android Studio
```

### Новая версия для Play Store:

В `android/app/build.gradle` увеличьте:

```gradle
android {
    defaultConfig {
        versionCode 2        // Было 1
        versionName "1.1.0"  // Было "1.0.0"
    }
}
```

Затем соберите новый AAB и загрузите в консоль.

---

## 🎨 Настройка иконок и splash screen

### Иконки:

1. Создайте иконку 1024x1024 PNG
2. Используйте генератор: https://icon.kitchen
3. Скачайте Android assets
4. Замените в `android/app/src/main/res/`:
   - `mipmap-hdpi/ic_launcher.png`
   - `mipmap-mdpi/ic_launcher.png`
   - `mipmap-xhdpi/ic_launcher.png`
   - `mipmap-xxhdpi/ic_launcher.png`
   - `mipmap-xxxhdpi/ic_launcher.png`

### Splash Screen:

Установите плагин:

```bash
npm install @capacitor/splash-screen
npx cap sync
```

Добавьте изображения в `android/app/src/main/res/drawable/`:
- `splash.png` (2732x2732)

---

## 🐛 Troubleshooting

### "Gradle build failed":
```bash
cd android
./gradlew clean
./gradlew build
```

### "SDK not found":
- Android Studio → Preferences → Android SDK
- Install Android SDK Platform (API 34+)

### "Device not detected":
```bash
adb devices
# Должно показать ваше устройство
```

Если нет:
- Переустановите USB драйвер
- Попробуйте другой USB кабель/порт
- Убедитесь, что разрешили отладку на телефоне

### Приложение крашится:
- Проверьте логи: `adb logcat`
- Убедитесь, что `npm run build` завершился успешно
- Проверьте `capacitor.config.ts`

---

## 📝 Checklist

**Перед созданием APK:**
- [ ] `npm run build` без ошибок
- [ ] `npx cap sync` выполнен
- [ ] Android Studio открывается без ошибок
- [ ] Gradle sync завершился успешно

**Перед публикацией:**
- [ ] Подписан Release ключом
- [ ] Протестирован на реальном устройстве
- [ ] versionCode и versionName обновлены
- [ ] Иконки и splash screen настроены
- [ ] Скриншоты и описание подготовлены

---

## 💡 Альтернативы

### Если Android Studio слишком тяжелый:

**1. PWA Builder** (проще):
- https://www.pwabuilder.com
- Загрузите URL развернутого PWA
- Скачайте готовый APK
- ⚠️ Функционал ограничен

**2. Bubblewrap (CLI):**
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://yoursite.com/manifest.json
bubblewrap build
```

---

## 🎊 Итого

**APK создан!** Теперь можете:
- ✅ Установить на любой Android
- ✅ Распространять файлом
- ✅ Опубликовать в Play Store

**Нужна помощь?** Пишите на конкретном шаге!
