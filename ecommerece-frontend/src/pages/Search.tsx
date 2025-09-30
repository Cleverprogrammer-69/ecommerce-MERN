"use client"

import React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import ProductCard from "@/components/custom/ProductCard"
import { products as allProducts, type Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { SearchIcon, X } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"

type SortKey = "byName" | "byPriceLowToHigh" | "byPriceHighToLow"

export default function Search() {
  // filters state
  const [sortBy, setSortBy] = React.useState<SortKey>("byName")
  const [category, setCategory] = React.useState<"all" | "headphone" | "camera" | "smartWatch">("all")
  const [search, setSearch] = React.useState<string>("")
  const [debouncedSearch, setDebouncedSearch] = React.useState<string>(search)

  const PAGE_SIZE = 8
  const [page, setPage] = React.useState(1)

  // Compute price bounds from data and keep as stable refs
  const prices = React.useMemo(() => allProducts.map((p) => p.price), [])
  const minPrice = React.useMemo(() => Math.min(...prices), [prices])
  const maxPrice = React.useMemo(() => Math.max(...prices), [prices])
  // Slider is a range; default to full span
  const [priceRange, setPriceRange] = React.useState<[number, number]>([minPrice, maxPrice])

  React.useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(id)
  }, [search])

  React.useEffect(() => {
    setPage(1)
  }, [sortBy, category, priceRange, debouncedSearch])

  const resetFilters = () => {
    setSortBy("byName")
    setCategory("all")
    setPriceRange([minPrice, maxPrice])
    setSearch("")
  }

  // Derived filtered + sorted products
  const products = React.useMemo(() => {
    let list: Product[] = allProducts

    // filter by category
    if (category !== "all") {
      list = list.filter((p) => p.category === category)
    }

    // filter by price range
    const [min, max] = priceRange
    list = list.filter((p) => p.price >= min && p.price <= max)

    const q = debouncedSearch.trim().toLowerCase()
    if (q) {
      list = list.filter((p) => {
        const name = p.name.toLowerCase()
        const desc = (p as any).description?.toLowerCase?.() ?? ""
        return name.includes(q) || desc.includes(q)
      })
    }

    // sort
    switch (sortBy) {
      case "byName":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      case "byPriceLowToHigh":
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case "byPriceHighToLow":
        list = [...list].sort((a, b) => b.price - a.price)
        break
    }

    return list
  }, [category, priceRange, sortBy, debouncedSearch])

  const totalPages = React.useMemo(() => Math.max(1, Math.ceil(products.length / PAGE_SIZE)), [products.length])
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const pagedProducts = React.useMemo(() => products.slice(start, end), [products, start, end])

  const pageNumbers = React.useMemo<(number | "ellipsis")[]>(() => {
    const pages: (number | "ellipsis")[] = []
    const window = 1
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage - window > 2) pages.push("ellipsis")
      for (let p = Math.max(2, currentPage - window); p <= Math.min(totalPages - 1, currentPage + window); p++) {
        pages.push(p)
      }
      if (currentPage + window < totalPages - 1) pages.push("ellipsis")
      pages.push(totalPages)
    }
    return pages
  }, [currentPage, totalPages])

  // Formatting helpers
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)

  return (
    <SidebarProvider>
      <Sidebar className="top-14">
        <SidebarHeader className="text-center">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium">Filters</span>
            <Button size="sm" variant="ghost" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </SidebarHeader>

        {/* Scrollable filter content */}
        <SidebarContent>
          {/* Sort */}
          <SidebarGroup>
            <SidebarGroupLabel>Sort by</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={sortBy} onValueChange={(v: SortKey) => setSortBy(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select the sort-by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort</SelectLabel>
                    <SelectItem value="byName">By name</SelectItem>
                    <SelectItem value="byPriceLowToHigh">By price (low to high)</SelectItem>
                    <SelectItem value="byPriceHighToLow">By price (high to low)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Price */}
          <SidebarGroup>
            <SidebarGroupLabel>Price range</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2">
                <Slider
                  value={priceRange}
                  onValueChange={(v) => setPriceRange([v[0], v[1]])}
                  min={Math.floor(minPrice)}
                  max={Math.ceil(maxPrice)}
                  step={1}
                  minStepsBetweenThumbs={5}
                />
                <div className="text-xs text-muted-foreground flex items-center justify-between">
                  <span>{formatCurrency(priceRange[0])}</span>
                  <span>{formatCurrency(priceRange[1])}</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Category */}
          <SidebarGroup>
            <SidebarGroupLabel>Category</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="headphone">Headphone</SelectItem>
                    <SelectItem value="camera">Camera</SelectItem>
                    <SelectItem value="smartWatch">Smart Watch</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header row */}
          <div className="flex items-center justify-between gap-2">
            <SidebarTrigger className="ml-1" />
            <form role="search" className="flex-1 max-w-md">
              <label htmlFor="search-products" className="sr-only">
                Search products
              </label>
              <div className="relative">
                <SearchIcon
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="search-products"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                  autoComplete="off"
                />
                {search ? (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </form>
            <h1 className="text-xl font-semibold tracking-tight">Products</h1>
            <div className="w-8" />
          </div>

          <Separator />

          {/* Product grid */}
          {products.length === 0 ? (
            <div className="text-sm text-muted-foreground py-12 text-center">No products match your filters.</div>
          ) : (
            <>
              <div id="products-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pagedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setPage((p) => Math.max(1, p - 1))
                          }}
                        />
                      </PaginationItem>

                      {pageNumbers.map((p, idx) =>
                        p === "ellipsis" ? (
                          <PaginationItem key={`ellipsis-${idx}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem key={p}>
                            <PaginationLink
                              href="#"
                              isActive={p === currentPage}
                              onClick={(e) => {
                                e.preventDefault()
                                setPage(p as number)
                              }}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        ),
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setPage((p) => Math.min(totalPages, p + 1))
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
