import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    // Fetch the main category
    const category = await db.collection('categories').findOne({ 
      category: params.category 
    });

    if (!category) {
      await client.close();
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Fetch all subcategories for this category
    const subcategories = await db.collection('subcategories').find({
      category: params.category
    }).toArray();

    await client.close();

    return NextResponse.json({ 
      category,
      subcategories 
    });

  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}
