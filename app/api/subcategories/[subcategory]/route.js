import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(request, { params }) {
  console.log('Received request for subcategory:', params?.subcategory);

  try {
    await client.connect();
    const db = client.db();
    console.log('Connected to MongoDB');

    // Build subcategory query
    const subcategoryQuery = {
      $or: [
        { slug: params.subcategory },
        { subcategory: params.subcategory.replace(/-/g, ' ') },
        ObjectId.isValid(params.subcategory)
          ? { _id: new ObjectId(params.subcategory) }
          : null
      ].filter(Boolean)
    };

    console.log('Subcategory query:', JSON.stringify(subcategoryQuery, null, 2));

    const subcategory = await db.collection('subcategories').findOne(subcategoryQuery);
    console.log('Subcategory result:', subcategory);

    if (!subcategory) {
      console.log('Subcategory not found');
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Build products query
    const productsQuery = {
      $or: [
        { subcategory: subcategory.subcategory },
        { subcategoryId: subcategory._id },
        { subcategorySlug: subcategory.slug || params.subcategory }
      ]
    };

    console.log('Products query:', JSON.stringify(productsQuery, null, 2));

    const products = await db.collection('products')
      .find(productsQuery)
      .sort({ createdAt: -1 })
      .toArray();

    console.log('Products found:', products.length);

    // Format product response
    const formattedProducts = products.map(product => {
      const image = Array.isArray(product.image_paths)
        ? product.image_paths[0]
        : product.image_paths;

      // console.log('Image Path:', image); // Debug print

      return {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image_path: image,
        slug: product.slug,
        features: product.features || [],
        createdAt: product.createdAt
      };
    });

    // Return response
    return NextResponse.json({
      success: true,
      subcategory: {
        _id: subcategory._id,
        title: subcategory.subcategory || subcategory.title,
        description: subcategory.description,
        image_path: subcategory.image_path,
        category: subcategory.category,
        slug: subcategory.slug,
        metadata: subcategory.metadata || {}
      },
      products: formattedProducts,
      count: formattedProducts.length
    });

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
    await client.close();
    console.log('MongoDB connection closed');
  }
}
