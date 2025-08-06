import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://saluvia:N2742a4633@cluster0.2opnnfp.mongodb.net/saluvia';
const client = new MongoClient(uri);

export async function GET(request, { params }) {
  // Validate params first
  if (!params || !params.subcategory) {
    return NextResponse.json(
      { error: 'Subcategory parameter is required' },
      { status: 400 }
    );
  }

  const subcategoryParam = params.subcategory;
  console.log('Received request for subcategory:', subcategoryParam);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();

    // Build safer subcategory query with proper checks
    const subcategoryQuery = {
      $or: [
        { slug: subcategoryParam },
        { subcategory: subcategoryParam.replace(/-/g, ' ') },
        ...(ObjectId.isValid(subcategoryParam) 
          ? [{ _id: new ObjectId(subcategoryParam) }] 
          : [])
      ]
    };

    console.log('Subcategory query:', JSON.stringify(subcategoryQuery, null, 2));

    const subcategory = await db.collection('subcategories').findOne(subcategoryQuery);
    
    if (!subcategory) {
      console.log('Subcategory not found');
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    console.log('Subcategory found:', subcategory._id);

    // Build products query with fallbacks
    const productsQuery = {
      $or: [
        { subcategory: subcategory.subcategory || '' },
        { subcategoryId: subcategory._id },
        { subcategorySlug: subcategory.slug || subcategoryParam }
      ].filter(condition => {
        // Filter out invalid conditions
        if (typeof condition === 'object' && condition.subcategoryId) return true;
        if (condition.subcategory) return true;
        if (condition.subcategorySlug) return true;
        return false;
      })
    };

    console.log('Products query:', JSON.stringify(productsQuery, null, 2));

    const products = await db.collection('products')
      .find(productsQuery)
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`Found ${products.length} products`);

    // Format products with safe property access
    const formattedProducts = products.map(product => ({
      _id: product._id,
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      image_path: Array.isArray(product.image_paths) 
        ? product.image_paths[0] || ''
        : product.image_paths || '',
      slug: product.slug || '',
      features: product.features || [],
      createdAt: product.createdAt || new Date()
    }));

    // Prepare response data
    const responseData = {
      success: true,
      subcategory: {
        _id: subcategory._id,
        title: subcategory.subcategory || subcategory.title || '',
        description: subcategory.description || '',
        image_path: subcategory.image_path || '',
        category: subcategory.category || '',
        slug: subcategory.slug || '',
        metadata: subcategory.metadata || {}
      },
      products: formattedProducts,
      count: formattedProducts.length
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error in subcategories API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch subcategory data',
        details: error.message
      },
      { status: 500 }
    );
  } finally {
    try {
      await client.close();
      console.log('MongoDB connection closed');
    } catch (closeError) {
      console.error('Error closing MongoDB connection:', closeError);
    }
  }
}