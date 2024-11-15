"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Search } from "lucide-react"

// Dummy product data
const products = [
  {
    id: 1,
    name: "Tesla Model S",
    description: "Price $79000 Model 2023",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 2,
    name: "BMW i4",
    description: "Price $51400 Model 2023",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 3,
    name: "Audi e-tron GT",
    description: "Price $104900 Model 2023",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 4,
    name: "Porsche Taycan",
    description: "Price $86700 Model 2023",
    image: "/placeholder.svg?height=200&width=200"
  }
]

export default function ProductDescription() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="mb-2">{product.name}</CardTitle>
              <p className="text-gray-600">{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">See Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No products found.</p>
      )}
    </div>
  )
}
