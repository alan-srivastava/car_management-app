"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

// Simulated car data (replace with actual data from logged-in user)
const cars = [
  {
    id: 1,
    name: "Tesla Model S",
    image: "/placeholder.svg?height=200&width=300",
    year: 2023,
    price: "$79,990"
  },
  {
    id: 2,
    name: "BMW i4",
    image: "/placeholder.svg?height=200&width=300",
    year: 2023,
    price: "$51,400"
  },
  {
    id: 3,
    name: "Audi e-tron GT",
    image: "/placeholder.svg?height=200&width=300",
    year: 2023,
    price: "$104,900"
  },
  {
    id: 4,
    name: "Porsche Taycan",
    image: "/placeholder.svg?height=200&width=300",
    year: 2023,
    price: "$86,700"
  }
]

export default function ProductList() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % filteredCars.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + filteredCars.length) % filteredCars.length
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search cars..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-video">
            {filteredCars.length > 0 ? (
              <>
                <img
                  src={filteredCars[currentIndex].image}
                  alt={filteredCars[currentIndex].name}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-white text-2xl font-bold">
                    {filteredCars[currentIndex].name}
                  </h2>
                  <p className="text-gray-300">
                    {filteredCars[currentIndex].year} -{" "}
                    {filteredCars[currentIndex].price}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <p className="text-gray-500">No cars found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-4 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={filteredCars.length === 0}
          className="transition-transform hover:scale-110"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={filteredCars.length === 0}
          className="transition-transform hover:scale-110"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
