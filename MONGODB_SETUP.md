# MongoDB Atlas Setup for SAT Chatbot Academy

Since local MongoDB isn't available, let's set up MongoDB Atlas (cloud database) for production.

## Quick Setup Steps:

### 1. Create MongoDB Atlas Account
- Go to [mongodb.com/atlas](https://mongodb.com/atlas)
- Sign up for free account
- Create a new project called "SAT-Academy"

### 2. Create Database Cluster
- Click "Build a Database"
- Choose "M0 Sandbox" (Free tier)
- Select your preferred cloud provider and region
- Name your cluster: `sat-academy-cluster`

### 3. Configure Database Access
- Go to "Database Access" in left sidebar
- Click "Add New Database User"
- Create username: `sat-admin`
- Generate secure password (save it!)
- Give "Read and write to any database" permissions

### 4. Configure Network Access
- Go to "Network Access" in left sidebar  
- Click "Add IP Address"
- Choose "Allow Access from Anywhere" (0.0.0.0/0)
- Or add your specific IP for better security

### 5. Get Connection String
- Go to "Database" in left sidebar
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string (looks like):
```
mongodb+srv://sat-admin:<password>@sat-academy-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6. Update Environment File
Replace the MONGODB_URI in your `.env` file:
```
MONGODB_URI=mongodb+srv://sat-admin:YOUR_PASSWORD@sat-academy-cluster.xxxxx.mongodb.net/sat-academy?retryWrites=true&w=majority
```

## Alternative: Use MongoDB Atlas Connection String

I can set up a temporary connection string for testing. Here's a sample format:

```bash
# In .env file, replace with your Atlas connection string:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sat-academy
```

## Test the Connection

After updating the connection string, run:
```bash
node scripts/setupMongoDB.js
```

This will:
- ✅ Connect to MongoDB Atlas
- ✅ Create the database and collections
- ✅ Seed with sample SAT questions
- ✅ Display database statistics

## Current Status

- ✅ OpenAI API key configured
- ✅ Mock data system working
- ⏳ MongoDB Atlas setup needed
- ⏳ Production database integration

Once MongoDB Atlas is connected, the SAT chatbot will have:
- ✅ Persistent question storage
- ✅ Chat session history
- ✅ User progress tracking
- ✅ Full production capabilities
