import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.VITE_MONGODB_URI;
const DB_NAME = 'pcdomain';

let db;
let usersCollection;
let componentImagesCollection;

const connectDB = async () => {
  try {
    const client = new MongoClient(MONGODB_URI, {
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    await client.connect();
    db = client.db(DB_NAME);
    usersCollection = db.collection('users');
    componentImagesCollection = db.collection('componentImages');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes

// Get user by Clerk ID
app.get('/api/users/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await usersCollection.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create or update user
app.post('/api/users', async (req, res) => {
  try {
    const { clerkId, email } = req.body;

    const existingUser = await usersCollection.findOne({ clerkId });

    if (existingUser) {
      return res.json(existingUser);
    }

    const newUser = {
      clerkId,
      email,
      createdAt: new Date(),
      savedBuilds: []
    };

    await usersCollection.insertOne(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Save a build
app.post('/api/users/:clerkId/builds', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { name, totalPrice, components } = req.body;

    // Generate unique build ID
    const buildId = new ObjectId().toString();

    const newBuild = {
      _id: buildId,
      name,
      totalPrice,
      components,
      createdAt: new Date(),
      userId: clerkId,
      isPublic: true // Make builds shareable by default
    };

    const existingUser = await usersCollection.findOne({ clerkId });

    if (existingUser) {
      await usersCollection.updateOne(
        { clerkId },
        { $push: { savedBuilds: newBuild } }
      );
    } else {
      await usersCollection.insertOne({
        clerkId,
        email: req.body.email || '',
        createdAt: new Date(),
        savedBuilds: [newBuild]
      });
    }

    res.status(201).json({ message: 'Build saved successfully', build: newBuild, buildId });
  } catch (error) {
    console.error('Error saving build:', error);
    res.status(500).json({ error: 'Failed to save build' });
  }
});

// Get a public build by ID
app.get('/api/builds/:buildId', async (req, res) => {
  try {
    const { buildId } = req.params;

    // Find the user who has this build
    const user = await usersCollection.findOne({
      'savedBuilds._id': buildId,
      'savedBuilds.isPublic': true
    });

    if (!user) {
      return res.status(404).json({ error: 'Build not found or not public' });
    }

    // Find the specific build
    const build = user.savedBuilds.find(b => b._id === buildId);

    if (!build) {
      return res.status(404).json({ error: 'Build not found' });
    }

    res.json(build);
  } catch (error) {
    console.error('Error fetching build:', error);
    res.status(500).json({ error: 'Failed to fetch build' });
  }
});

// Delete a build
app.delete('/api/users/:clerkId/builds/:buildIndex', async (req, res) => {
  try {
    const { clerkId, buildIndex } = req.params;
    const index = parseInt(buildIndex);

    const user = await usersCollection.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedBuilds = user.savedBuilds.filter((_, i) => i !== index);

    await usersCollection.updateOne(
      { clerkId },
      { $set: { savedBuilds: updatedBuilds } }
    );

    res.json({ message: 'Build deleted successfully' });
  } catch (error) {
    console.error('Error deleting build:', error);
    res.status(500).json({ error: 'Failed to delete build' });
  }
});

// Get component image (check cache first)
app.get('/api/component-image/:componentName', async (req, res) => {
  try {
    const { componentName } = req.params;

    // Check if image is cached in database
    const cached = await componentImagesCollection.findOne({ componentName });

    if (cached) {
      return res.json({ imageUrl: cached.imageUrl, cached: true });
    }

    // If not cached, fetch from Google API
    const apiKey = process.env.VITE_GOOGLE_API_KEY;
    const cx = process.env.VITE_GOOGLE_CX;
    const query = encodeURIComponent(componentName);

    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&searchType=image&num=1`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const imageUrl = data.items[0].link;

      // Save to database for future use
      await componentImagesCollection.insertOne({
        componentName,
        imageUrl,
        cachedAt: new Date()
      });

      return res.json({ imageUrl, cached: false });
    }

    res.status(404).json({ error: 'No image found' });
  } catch (error) {
    console.error('Error fetching component image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
