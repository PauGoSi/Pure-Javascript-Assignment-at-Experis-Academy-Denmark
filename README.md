# 💻 Pure JavaScript Assignment – Experis Academy Denmark

This project is a simple JavaScript web application simulating a small bank loan and laptop purchase system.  
It fetches laptop data from a local mock API (`json-server`) and displays it dynamically in the browser.

---

## 🚀 Features

- Fetches computer data (title, description, specs, price, and image) from a local REST API  
- Dynamic dropdown for laptops  
- Bank system with balance, salary, and loan handling  
- Responsive webshop-style UI (with hover effects and rounded cards)  
- Built using **pure JavaScript**, **HTML**, and **CSS**

---

## 🧰 Prerequisites

Before running this project, make sure you have:

- **Windows 10+ with WSL** (Ubuntu recommended)
- **Git** installed
- **Node.js** and **npm** installed (via `nvm` is best)

To confirm Node is installed, run:

```bash
node -v
npm -v
```
## 🐧 Setup Instructions (for WSL / Linux)
### 1️⃣ Clone the repository
```bash
cd ~/projects
git clone git@github.com:PauGoSi/Pure-Javascript-Assignment-at-Experis-Academy-Denmark.git
cd Pure-Javascript-Assignment-at-Experis-Academy-Denmark
```
### 2️⃣ Install Node and npm (if not already installed)
Install nvm to manage Node versions:
```bash
sudo apt update
sudo apt install -y curl build-essential
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
```
### 3️⃣ Install project dependencies
```bash
npm install
```
> 💡 **Note:** This project uses json-server for the mock backend.
### 4️⃣ Start the local mock API
Run this inside your project folder:
```bash
npx json-server --watch db.json --port 3001
```
Then open your browser and check:
👉 http://localhost:3001/computers
If you see JSON data with 3 laptops, your API is running correctly ✅
### 5️⃣ Start the frontend (Live Server)
 - Open your project in VS Code
 - Right-click index.html → Open with Live Server
 - The app will open at something like:
👉 http://localhost:5501/

Make sure your mock API (json-server) is still running in another terminal window.
## 🖼️ Folder Structure
```bash
Pure-Javascript-Assignment-at-Experis-Academy-Denmark/
│
├── assets/
│   └── images/
│       ├── 1.jpg
│       ├── 2.jpg
│       └── 3.jpg
│
├── app.js          # Main JavaScript logic
├── index.html      # Frontend structure
├── style.css       # UI styling
├── db.json         # Local mock API data (ignored in Git)
├── package.json    # Project dependencies
├── .gitignore      # Ignored files and folders
└── README.md       # Project documentation
```
👨‍💻 Author
 - Pau Go Si (paugosi@hotmail.com)
