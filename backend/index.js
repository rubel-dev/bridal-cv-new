 
// main
 const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
 // Load environment variables

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database URI (using environment variables)
 const uri = "mongodb+srv://rubel190024:opeB6dRxXSDuS1FB@cluster0.fgqcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Function to connect to MongoDB and get the database instance
async function connectDB() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log("Successfully connected to MongoDB!");
    }
    return client.db('bridalCVDB'); // Use the bridalCVDB database
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

// Save Bridal CV Data
app.post('/api/submit', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('bridalCVs');
    const { name, dob, height, hobbies, education, occupation, languages } = req.body;

    // Insert relevant data
    const data = { name, dob, height, hobbies, education, occupation, languages };
    await collection.insertOne(data);

    res.json({ message: 'Bridal CV submitted successfully!' });
  } catch (error) {
    console.error("Error saving CV:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch Bridal CV Data
app.get('/api/cv', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('bridalCVs');
    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error("Error fetching CV data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
