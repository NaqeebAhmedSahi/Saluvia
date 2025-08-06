import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    // Fetch all categories (no grouping needed)
    const categories = await db.collection('categories').find({}, {
      projection: {
        _id: 0,
        name: "$title",         // rename title to name
        image_path: 1,
        category:1,
      }
    }).toArray();

    // Log categories before returning
    console.log("Fetched categories:", categories);

    await client.close();

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
