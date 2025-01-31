# 🎮 Buzzer Game  

It's a simple multiplayer buzzer game using **Vue 3** and **Socket.io**.  

## 🚀 Getting Started  

### Pre-Settings
Before starting the game, you must set a login password so only the host can access the **/host** and **/dashboard** pages. This can be put in the Login.vue component.
Additionally, you need to change the **URL** of the socket clients in each component. For this, you can set the IP address of your Computer in your local wifi.

### **1️⃣ Run the WebSocket Server**  
**run the socket server**:  
```sh
node socket.js
```

### **2️⃣ Build & Run the App**  
First, build the app:  
```sh
npm run build
```  
Then, serve it:  
```sh
npm run serve
```

## 📌 Features  
✅ Teams can join and buzz. 
✅ Teams can only buzz once per round.
✅ Host sees the buzz order, can assign points, and reset buzzers and teams. 
✅ A Dashboard shows the current buzzword and each team's total points.

## 📜 License  
MIT License  
