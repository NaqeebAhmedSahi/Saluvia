import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    // Fetch all subcategories
    const subcategories = await db.collection('subcategories').find({}, {
      projection: {
        _id: 0,
        id: { $toString: "$_id" }, // Convert ObjectId to string
        slug: 1,
        url: 1,
        title: 1,
        description: 1,
        category: 1,
        subcategory: 1,
        image_path: 1
      }
    }).toArray();

    // Clean HTML tags from description
    const cleanedSubcategories = subcategories.map(item => ({
      ...item,
      description: item.description.replace(/<[^>]*>?/gm, '') // Remove HTML tags
    }));

    console.log("Fetched subcategories:", cleanedSubcategories);

    await client.close();

    return NextResponse.json(cleanedSubcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}