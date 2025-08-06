'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Divider,
  Chip,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack, Favorite, Share, Download } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SubcategoryPage = ({ params }) => {
  const [data, setData] = useState({
    subcategory: null,
    products: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure we have the subcategory parameter
        console.log("Enter");
        if (!params?.subcategory) {
          throw new Error('Subcategory parameter is missing');
        }

        setLoading(true);
        setError(null);

        // Make API call with the subcategory parameter
        const response = await fetch(
          `/api/subcategories/${encodeURIComponent(params.subcategory)}`
        );

        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }

        const result = await response.json();

        if (!result?.success) {
          throw new Error(result.error || 'Invalid data received');
        }

        setData({
          subcategory: result.subcategory,
          products: result.products || []
        });
        console.log("Data ", result.products);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params?.subcategory]);

  const renderDescription = (html) => {
    return { __html: html };
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="rectangular" width={200} height={40} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={400} />
        </Box>
        <Grid container spacing={4}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" sx={{ mt: 2 }} />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          Error loading data
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          startIcon={<ArrowBack />}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  if (!data.subcategory) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Subcategory not found
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.back()}
          startIcon={<ArrowBack />}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      {/* Back button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ mb: 4 }}
      >
        Back to Categories
      </Button>

      {/* Subcategory Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          mb: 6,
          alignItems: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ flex: 1 }}
        >
          <CardMedia
            component="img"
            image={`/${data.subcategory.image_path?.replace(/^\/?/, '')}` || '/images/medical-placeholder.jpg'}
            alt={data.subcategory.title}
            sx={{
              borderRadius: 2,
              width: '100%',
              maxHeight: 400,
              objectFit: 'cover',
              boxShadow: 3
            }}
          />
        </motion.div>

        <Box sx={{ flex: 1 }}>
          <Chip
            label={data.subcategory.category}
            color="primary"
            sx={{ mb: 2 }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {data.subcategory.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <IconButton aria-label="add to favorites" color="primary">
              <Favorite />
            </IconButton>
            <IconButton aria-label="share" color="primary">
              <Share />
            </IconButton>
            {data.subcategory.url && (
              <Button
                variant="contained"
                color="primary"
                endIcon={<Download />}
                component="a"
                href={data.subcategory.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Original
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Description with HTML content */}
      <Box sx={{ mb: 8 }}>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          About This Category
        </Typography>
        {data.subcategory.description ? (
          <Box
            dangerouslySetInnerHTML={renderDescription(data.subcategory.description)}
            sx={{
              '& p': {
                mb: 3,
                lineHeight: 1.8,
                fontSize: '1.1rem',
                color: '#f0f0f0', // ✅ Set to light gray or white
              },
              '& a': {
                color: '#90caf9', // ✅ Light blue for links
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }
            }}
          />
        ) : (
          <Typography variant="body1" color="text.secondary">
            No description available for this category.
          </Typography>
        )}
      </Box>

      {/* Products Section */}
      <Box>
        <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700 }}>
          Available Products ({data.products.length})
        </Typography>

        {data.products.length === 0 ? (
          <Typography variant="body1" sx={{ mb: 4 }}>
            No products found in this category.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {data.products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`/${product.image_path?.replace(/^\/?/, '')}` || '/images/product-placeholder.jpg'}
                      alt={product.name}
                      sx={{
                        height: 200,
                        objectFit: 'cover'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          mb: 1
                        }}
                      >
                        {product.name}
                      </Typography>
                      {product.price && (
                        <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                      )}
                      <Link href={{
                        pathname: `/products/${product._id}`,
                        query: {
                          name: product.name,
                          description: product.description,
                          image_path: product.image_path
                          // Add any other fields you need
                        }
                      }}>
                        <button className="view-details-btn">View Details</button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default SubcategoryPage;