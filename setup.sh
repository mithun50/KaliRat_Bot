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
NC='\033[0m' # No Color

# Print banner
echo -e "${BLUE}"
echo "  _  __     _ _ ____       _   "
echo " | |/ /__ _| (_)  _ \ __ _| |_ "
echo " | ' // _\` | | | |_) / _\` | __|"
echo " | . \ (_| | | |  _ < (_| | |_ "
echo " |_|\_\__,_|_|_|_| \_\__,_|\__|"
echo ""
echo -e "${NC}        Setup Script v1.0"
echo "========================================"
echo ""

# Check if Node.js is installed
echo -e "${YELLOW}[1/5] Checking Node.js...${NC}"
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
echo -e "${YELLOW}[2/5] Checking npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ npm installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm not found!${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}[3/5] Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

# Create data.json if not exists
echo -e "${YELLOW}[4/5] Checking configuration...${NC}"
if [ -f "data.json" ]; then
    echo -e "${GREEN}✓ data.json exists${NC}"
    echo -e "${YELLOW}  Make sure to update it with your credentials${NC}"
else
    if [ -f "data.json.example" ]; then
        cp data.json.example data.json
        echo -e "${GREEN}✓ Created data.json from template${NC}"
        echo -e "${RED}  ! You MUST edit data.json with your credentials${NC}"
    else
        echo -e "${RED}✗ No config template found${NC}"
        exit 1
    fi
fi

# Create .env if not exists
echo -e "${YELLOW}[5/5] Checking environment file...${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env exists${NC}"
else
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env from template${NC}"
        echo -e "${YELLOW}  Edit .env with your settings (optional)${NC}"
    fi
fi

# Summary
echo ""
echo "========================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo -e "${YELLOW}1. Configure your bot:${NC}"
echo "   nano data.json"
echo ""
echo -e "${YELLOW}2. Get Telegram Bot Token:${NC}"
echo "   - Message @BotFather on Telegram"
echo "   - Send /newbot and follow prompts"
echo "   - Copy the token to data.json"
echo ""
echo -e "${YELLOW}3. Get your Chat ID:${NC}"
echo "   - Message @userinfobot on Telegram"
echo "   - Copy the ID to data.json"
echo ""
echo -e "${YELLOW}4. Start the server:${NC}"
echo "   npm start"
echo "   # or"
echo "   node main.js"
echo ""
echo "========================================"
