#!/bin/bash

# ===========================================
# KaliRat Bot - Setup Script
# ===========================================
# This script helps you set up the KaliRat server
# Run with: bash setup.sh
# ===========================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Print banner
echo -e "${BLUE}"
echo "  _  __     _ _ ____       _   "
echo " | |/ /__ _| (_)  _ \ __ _| |_ "
echo " | ' // _\` | | | |_) / _\` | __|"
echo " | . \ (_| | | |  _ < (_| | |_ "
echo " |_|\_\__,_|_|_|_| \_\__,_|\__|"
echo ""
echo -e "${NC}        Setup Script v2.0"
echo "========================================"
echo ""

# Check if Node.js is installed
echo -e "${YELLOW}[1/6] Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js not found!${NC}"
    echo "Please install Node.js first:"
    echo "  - Termux: pkg install nodejs"
    echo "  - Linux:  sudo apt install nodejs"
    echo "  - Mac:    brew install node"
    exit 1
fi

# Check if npm is installed
echo -e "${YELLOW}[2/6] Checking npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ npm installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm not found!${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}[3/6] Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

# Create .env if not exists
echo -e "${YELLOW}[4/6] Setting up environment configuration...${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env file exists${NC}"
    echo -e "${YELLOW}  Checking configuration...${NC}"

    # Check if required vars are set
    source .env 2>/dev/null
    if [ -z "$BOT_TOKEN" ] || [ -z "$ADMIN_CHAT_ID" ]; then
        echo -e "${RED}  ! Required variables not set in .env${NC}"
        NEEDS_CONFIG=true
    else
        echo -e "${GREEN}  ✓ Configuration looks good${NC}"
        NEEDS_CONFIG=false
    fi
else
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env from template${NC}"
        NEEDS_CONFIG=true
    else
        echo -e "${RED}✗ No .env.example found${NC}"
        exit 1
    fi
fi

# Interactive configuration
if [ "$NEEDS_CONFIG" = true ]; then
    echo ""
    echo -e "${CYAN}========================================"
    echo "       Interactive Configuration"
    echo -e "========================================${NC}"
    echo ""

    # Get Bot Token
    echo -e "${YELLOW}Enter your Telegram Bot Token${NC}"
    echo -e "${CYAN}(Get from @BotFather on Telegram)${NC}"
    read -p "> " BOT_TOKEN_INPUT

    if [ ! -z "$BOT_TOKEN_INPUT" ]; then
        # Update .env file
        if grep -q "^BOT_TOKEN=" .env; then
            sed -i "s|^BOT_TOKEN=.*|BOT_TOKEN=$BOT_TOKEN_INPUT|" .env
        else
            echo "BOT_TOKEN=$BOT_TOKEN_INPUT" >> .env
        fi
        echo -e "${GREEN}✓ Bot token saved${NC}"
    fi

    echo ""

    # Get Admin Chat ID
    echo -e "${YELLOW}Enter your Telegram Chat ID${NC}"
    echo -e "${CYAN}(Get from @userinfobot on Telegram)${NC}"
    read -p "> " CHAT_ID_INPUT

    if [ ! -z "$CHAT_ID_INPUT" ]; then
        if grep -q "^ADMIN_CHAT_ID=" .env; then
            sed -i "s|^ADMIN_CHAT_ID=.*|ADMIN_CHAT_ID=$CHAT_ID_INPUT|" .env
        else
            echo "ADMIN_CHAT_ID=$CHAT_ID_INPUT" >> .env
        fi
        echo -e "${GREEN}✓ Chat ID saved${NC}"
    fi

    echo ""

    # Get Host URL (optional)
    echo -e "${YELLOW}Enter your server URL (optional, press Enter to skip)${NC}"
    echo -e "${CYAN}(e.g., https://your-app.onrender.com/)${NC}"
    read -p "> " HOST_URL_INPUT

    if [ ! -z "$HOST_URL_INPUT" ]; then
        if grep -q "^HOST_URL=" .env; then
            sed -i "s|^HOST_URL=.*|HOST_URL=$HOST_URL_INPUT|" .env
        else
            echo "HOST_URL=$HOST_URL_INPUT" >> .env
        fi
        echo -e "${GREEN}✓ Host URL saved${NC}"
    fi
fi

# Verify configuration
echo ""
echo -e "${YELLOW}[5/6] Verifying configuration...${NC}"
source .env 2>/dev/null

if [ -z "$BOT_TOKEN" ]; then
    echo -e "${RED}✗ BOT_TOKEN is not set!${NC}"
    CONFIG_OK=false
else
    echo -e "${GREEN}✓ BOT_TOKEN is set${NC}"
    CONFIG_OK=true
fi

if [ -z "$ADMIN_CHAT_ID" ]; then
    echo -e "${RED}✗ ADMIN_CHAT_ID is not set!${NC}"
    CONFIG_OK=false
else
    echo -e "${GREEN}✓ ADMIN_CHAT_ID is set${NC}"
fi

# Summary
echo ""
echo -e "${YELLOW}[6/6] Setup Summary${NC}"
echo "========================================"

if [ "$CONFIG_OK" = true ]; then
    echo -e "${GREEN}Setup Complete!${NC}"
    echo ""
    echo "Your configuration (.env):"
    echo -e "  BOT_TOKEN:     ${CYAN}${BOT_TOKEN:0:20}...${NC}"
    echo -e "  ADMIN_CHAT_ID: ${CYAN}$ADMIN_CHAT_ID${NC}"
    echo -e "  HOST_URL:      ${CYAN}${HOST_URL:-not set}${NC}"
    echo -e "  PORT:          ${CYAN}${PORT:-3000}${NC}"
    echo ""
    echo "========================================"
    echo ""
    echo -e "${GREEN}Ready to start!${NC}"
    echo ""
    echo "Run the server with:"
    echo -e "  ${CYAN}npm start${NC}"
    echo "  or"
    echo -e "  ${CYAN}node main.js${NC}"
    echo ""
else
    echo -e "${RED}Setup Incomplete!${NC}"
    echo ""
    echo "Please edit .env file manually:"
    echo -e "  ${CYAN}nano .env${NC}"
    echo ""
    echo "Required variables:"
    echo "  - BOT_TOKEN (from @BotFather)"
    echo "  - ADMIN_CHAT_ID (from @userinfobot)"
    echo ""
fi

echo "========================================"
