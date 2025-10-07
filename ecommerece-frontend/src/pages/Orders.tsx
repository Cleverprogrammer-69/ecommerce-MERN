"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Filter, Eye, Trash2 } from "lucide-react"

interface Order {
  id: string
  quantity: number
  discount: number
  amount: number
  status: "Pending" | "Processing" | "Completed" | "Cancelled"
  date: string
  customer: string
}

const ordersData: Order[] = [
  {
    id: "ORD-001",
    quantity: 3,
    discount: 150,
    amount: 4500,
    status: "Processing",
    date: "2024-01-15",
    customer: "John Doe",
  },
  {
    id: "ORD-002",
    quantity: 6,
    discount: 400,
    amount: 6999,
    status: "Completed",
    date: "2024-01-14",
    customer: "Jane Smith",
  },
  {
    id: "ORD-003",
    quantity: 2,
    discount: 200,
    amount: 2999,
    status: "Pending",
    date: "2024-01-13",
    customer: "Sarah Johnson",
  },
  {
    id: "ORD-004",
    quantity: 4,
    discount: 850,
    amount: 8500,
    status: "Processing",
    date: "2024-01-12",
    customer: "Mike Chen",
  },
  {
    id: "ORD-005",
    quantity: 1,
    discount: 0,
    amount: 3200,
    status: "Cancelled",
    date: "2024-01-11",
    customer: "Emily Davis",
  },
  {
    id: "ORD-006",
    quantity: 3,
    discount: 540,
    amount: 5400,
    status: "Completed",
    date: "2024-01-10",
    customer: "Alex Rodriguez",
  },
  {
    id: "ORD-007",
    quantity: 5,
    discount: 720,
    amount: 7200,
    status: "Processing",
    date: "2024-01-09",
    customer: "Lisa Wang",
  },
  {
    id: "ORD-008",
    quantity: 1,
    discount: 100,
    amount: 1800,
    status: "Pending",
    date: "2024-01-08",
    customer: "David Brown",
  },
  {
    id: "ORD-009",
    quantity: 7,
    discount: 950,
    amount: 9500,
    status: "Completed",
    date: "2024-01-07",
    customer: "Jennifer Lee",
  },
  {
    id: "ORD-010",
    quantity: 2,
    discount: 300,
    amount: 4100,
    status: "Processing",
    date: "2024-01-06",
    customer: "Robert Taylor",
  },
  {
    id: "ORD-011",
    quantity: 4,
    discount: 600,
    amount: 6800,
    status: "Completed",
    date: "2024-01-05",
    customer: "Maria Garcia",
  },
  {
    id: "ORD-012",
    quantity: 3,
    discount: 250,
    amount: 3750,
    status: "Pending",
    date: "2024-01-04",
    customer: "James Wilson",
  },
]

type SortField = keyof Order
type SortDirection = "asc" | "desc" | null

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "Processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "Completed":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "Cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(ordersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = a[sortField]
        const bValue = b[sortField]

        if (typeof aValue === "string" && typeof bValue === "string") {
          if (sortDirection === "asc") {
            return aValue.toLowerCase() < bValue.toLowerCase()
              ? -1
              : aValue.toLowerCase() > bValue.toLowerCase()
                ? 1
                : 0
          } else {
            return aValue.toLowerCase() > bValue.toLowerCase()
              ? -1
              : aValue.toLowerCase() < bValue.toLowerCase()
                ? 1
                : 0
          }
        }

        if (sortDirection === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        }
      })
    }

    return filtered
  }, [orders, searchTerm, statusFilter, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
      if (sortDirection === "desc") {
        setSortField(null)
      }
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />
    if (sortDirection === "asc") return <ArrowUp className="ml-2 h-4 w-4" />
    if (sortDirection === "desc") return <ArrowDown className="ml-2 h-4 w-4" />
    return <ArrowUpDown className="ml-2 h-4 w-4" />
  }

  const handleDelete = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id))
    const newFilteredCount = filteredAndSortedOrders.filter((o) => o.id !== id).length
    const newTotalPages = Math.ceil(newFilteredCount / itemsPerPage)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
  }

  const totalAmount = filteredAndSortedOrders.reduce((sum, order) => sum + order.amount, 0)
  const totalDiscount = filteredAndSortedOrders.reduce((sum, order) => sum + order.discount, 0)
  const totalQuantity = filteredAndSortedOrders.reduce((sum, order) => sum + order.quantity, 0)

  return (
    <div className="space-y-6 p-3 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredAndSortedOrders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDiscount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage all orders with advanced filtering and sorting options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full md:w-[300px]"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {paginatedOrders.length} of {filteredAndSortedOrders.length} orders
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("id")} className="h-auto p-0 font-semibold">
                      Order ID
                      {getSortIcon("id")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("quantity")} className="h-auto p-0 font-semibold">
                      Quantity
                      {getSortIcon("quantity")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("discount")} className="h-auto p-0 font-semibold">
                      Discount
                      {getSortIcon("discount")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("amount")} className="h-auto p-0 font-semibold">
                      Amount
                      {getSortIcon("amount")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("status")} className="h-auto p-0 font-semibold">
                      Status
                      {getSortIcon("status")}
                    </Button>
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No orders found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">{order.customer}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{order.quantity}</TableCell>
                      <TableCell className="text-muted-foreground">${order.discount.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">${order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View order</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(order.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete order</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    return null
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
