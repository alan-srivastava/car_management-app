"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { X, Upload, Edit, Trash } from "lucide-react"

export default function ProductCreation() {
  const [products, setProducts] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  const handleImageUpload = e => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 10) {
      alert("You can only upload up to 10 images")
      return
    }
    const newImages = files.map(file => URL.createObjectURL(file))
    setImages([...images, ...newImages])
  }

  const removeImage = index => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addProduct = () => {
    if (!title || !description || images.length === 0) {
      alert("Please fill in all fields and upload at least one image")
      return
    }
    const newProduct = {
      id: Date.now(),
      title,
      description,
      images
    }
    setProducts([...products, newProduct])
    setTitle("")
    setDescription("")
    setImages([])
  }

  const updateProduct = () => {
    if (!editingProduct) return
    const updatedProducts = products.map(p =>
      p.id === editingProduct.id ? editingProduct : p
    )
    setProducts(updatedProducts)
    setEditingProduct(null)
  }

  const deleteProduct = id => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Product Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Product Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Images (Max 10)
                  </span>
                </Button>
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={addProduct}>Add Product</Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(product => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product ${index}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Product Title"
                      value={editingProduct?.title || ""}
                      onChange={e =>
                        setEditingProduct(prev =>
                          prev ? { ...prev, title: e.target.value } : null
                        )
                      }
                    />
                    <Textarea
                      placeholder="Product Description"
                      value={editingProduct?.description || ""}
                      onChange={e =>
                        setEditingProduct(prev =>
                          prev ? { ...prev, description: e.target.value } : null
                        )
                      }
                    />
                    <Button onClick={updateProduct}>Update Product</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                onClick={() => deleteProduct(product.id)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
