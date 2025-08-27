'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Plus, X, Save, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCategories } from '@/hooks/use-categories';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    images: [] as Array<{ url: string; alt: string; publicId: string }>,
    specifications: {} as Record<string, string>,
    features: [] as string[],
    applications: [] as string[],
    tags: [] as string[],
    inStock: true,
    featured: false,
    rating: 0,
    reviews: 0,
  });

  console.log('formData', formData);

  const [newSpec, setNewSpec] = useState({ key: '', value: '' });
  const [newFeature, setNewFeature] = useState('');
  const [newApplication, setNewApplication] = useState('');
  const [newTag, setNewTag] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  const { categories, loading: categoriesLoading } = useCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create product');
      }
    } catch (err) {
      setError('Error creating product. Please try again.');
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSpecification = () => {
    if (newSpec.key && newSpec.value) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpec.key]: newSpec.value,
        },
      }));
      setNewSpec({ key: '', value: '' });
    }
  };

  const removeSpecification = (key: string) => {
    const { [key]: removed, ...rest } = formData.specifications;
    setFormData((prev) => ({ ...prev, specifications: rest }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addApplication = () => {
    if (newApplication.trim()) {
      setFormData((prev) => ({
        ...prev,
        applications: [...prev.applications, newApplication.trim()],
      }));
      setNewApplication('');
    }
  };

  const removeApplication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      applications: prev.applications.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            { url: data.secure_url, alt: prev.name, publicId: data.public_id },
          ],
        }));
      }
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Image upload error:', err);
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center space-x-4'>
          <Link href='/admin/products'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Add New Product
            </h1>
            <p className='text-gray-600'>Create a new product listing</p>
          </div>
        </div>
      </div>

      {error && (
        <Alert className='mb-6 border-red-200 bg-red-50'>
          <AlertDescription className='text-red-800'>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='name'>Product Name *</Label>
                  <Input
                    id='name'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder='Enter product name'
                    required
                  />
                </div>

                <div>
                  <Label htmlFor='description'>Description *</Label>
                  <Textarea
                    id='description'
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder='Enter product description'
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor='category'>Category *</Label>
                  {categoriesLoading ? (
                    <div>Loading categories...</div>
                  ) : categories.length === 0 ? (
                    <div>
                      No categories found. <a href="/admin/categories" className="text-blue-600 underline">Create a category</a>
                    </div>
                  ) : (
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select category' />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='hidden'
                    id='image-upload'
                    disabled={imageUploading}
                  />
                  <label htmlFor='image-upload' className='cursor-pointer'>
                    <div className='space-y-4'>
                      {imageUploading ? (
                        <div className='flex items-center justify-center'>
                          <div className='w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin' />
                        </div>
                      ) : (
                        <ImageIcon className='h-12 w-12 text-gray-400 mx-auto' />
                      )}
                      <div>
                        <p className='text-gray-600'>
                          {imageUploading
                            ? 'Uploading...'
                            : 'Click to upload or drag and drop'}
                        </p>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, WEBP up to 10MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {formData.images.map((image, index) => (
                      <div key={index} className='relative group'>
                        <Image
                          src={image.url || '/placeholder.svg'}
                          alt={image.alt}
                          width={200}
                          height={150}
                          className='w-full h-32 object-cover rounded-lg'
                        />
                        <Button
                          type='button'
                          variant='destructive'
                          size='icon'
                          className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
                          onClick={() => removeImage(index)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Specification name'
                    value={newSpec.key}
                    onChange={(e) =>
                      setNewSpec((prev) => ({ ...prev, key: e.target.value }))
                    }
                  />
                  <Input
                    placeholder='Value'
                    value={newSpec.value}
                    onChange={(e) =>
                      setNewSpec((prev) => ({ ...prev, value: e.target.value }))
                    }
                  />
                  <Button type='button' onClick={addSpecification}>
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>

                <div className='space-y-2'>
                  {Object.entries(formData.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                      >
                        <div>
                          <span className='font-medium'>{key}:</span> {value}
                        </div>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => removeSpecification(key)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Add feature'
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addFeature())
                    }
                  />
                  <Button type='button' onClick={addFeature}>
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>

                <div className='space-y-2'>
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                    >
                      <span>{feature}</span>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() => removeFeature(index)}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Add application'
                    value={newApplication}
                    onChange={(e) => setNewApplication(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addApplication())
                    }
                  />
                  <Button type='button' onClick={addApplication}>
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>

                <div className='space-y-2'>
                  {formData.applications.map((application, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                    >
                      <span>{application}</span>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() => removeApplication(index)}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='inStock'>In Stock</Label>
                  <Switch
                    id='inStock'
                    checked={formData.inStock}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, inStock: checked }))
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <Label htmlFor='featured'>Featured Product</Label>
                  <Switch
                    id='featured'
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, featured: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='rating'>Rating (0-5 stars)</Label>
                  <div className='flex items-center space-x-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                        className={`text-2xl ${
                          star <= formData.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      >
                        ★
                      </button>
                    ))}
                    <span className='ml-2 text-sm text-gray-600'>
                      {formData.rating}/5
                    </span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='reviews'>Total Reviews</Label>
                  <Input
                    id='reviews'
                    type='number'
                    min='0'
                    value={formData.reviews}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        reviews: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder='0'
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Add tag'
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type='button' onClick={addTag}>
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      {tag}
                      <button
                        type='button'
                        onClick={() => removeTag(index)}
                        className='ml-1 hover:text-red-500'
                      >
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className='pt-6'>
                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                  disabled={loading || imageUploading}
                >
                  {loading ? (
                    <div className='flex items-center space-x-2'>
                      <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    <div className='flex items-center space-x-2'>
                      <Save className='h-4 w-4' />
                      <span>Create Product</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
