import type React from "react"
import { Search, Bell, TrendingUp, TrendingDown, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { SidebarProvider } from "@/components/ui/sidebar"

const revenueData = [
  { month: "Jan", revenue: 200, transaction: 300 },
  { month: "Feb", revenue: 444, transaction: 144 },
  { month: "Mar", revenue: 343, transaction: 433 },
  { month: "Apr", revenue: 556, transaction: 655 },
  { month: "May", revenue: 778, transaction: 237 },
  { month: "Jun", revenue: 455, transaction: 755 },
  { month: "Jul", revenue: 990, transaction: 190 },
]

const genderData = [
  { name: "Female", value: 12, color: "hsl(340, 82%, 56%)" },
  { name: "Male", value: 19, color: "rgba(53, 162, 235, 0.8)" },
]

const mockData = {
  categories: [
    { heading: "Laptops", value: 40 },
    { heading: "Shoes", value: 60 },
    { heading: "Camera", value: 30 },
    { heading: "Jeans", value: 90 },
  ],
  transaction: [
    { _id: "1", amount: 685, quantity: 23, discount: 13, status: "Processing" },
    { _id: "2", amount: 845, quantity: 12, discount: 18, status: "Shipped" },
    { _id: "3", amount: 325, quantity: 7, discount: 8, status: "Delivered" },
  ],
}

const userImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp"

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for data, users, docs" className="pl-8 w-[300px]" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src={userImg || "/placeholder.svg"} alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <WidgetCard title="Revenue" value="₹340,000" percent={40} icon={TrendingUp} color="blue" />
          <WidgetCard title="Users" value="400" percent={-14} icon={Users} color="cyan" />
          <WidgetCard title="Transactions" value="23,000" percent={80} icon={TrendingUp} color="yellow" />
          <WidgetCard title="Products" value="1,000" percent={30} icon={TrendingUp} color="purple" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue & Transaction</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "rgb(0, 115, 255)",
                  },
                  transaction: {
                    label: "Transaction",
                    color: "rgba(53, 162, 235, 0.8)",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" />
                    <Bar dataKey="transaction" fill="var(--color-transaction)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.categories.map((category) => (
                  <CategoryItem key={category.heading} heading={category.heading} value={category.value} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Gender Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  female: {
                    label: "Female",
                    color: "hsl(340, 82%, 56%)",
                  },
                  male: {
                    label: "Male",
                    color: "rgba(53, 162, 235, 0.8)",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center mt-4">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionTable data={mockData.transaction} />
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  )
}

interface WidgetCardProps {
  title: string
  value: string
  percent: number
  icon: React.ElementType
  color: "blue" | "cyan" | "yellow" | "purple"
}

const WidgetCard = ({ title, value, percent, icon: Icon, color }: WidgetCardProps) => {
  const isPositive = percent > 0
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 border-blue-200",
    cyan: "text-cyan-600 bg-cyan-50 border-cyan-200",
    yellow: "text-yellow-600 bg-yellow-50 border-yellow-200",
    purple: "text-purple-600 bg-purple-50 border-purple-200",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          {isPositive ? (
            <Badge variant="secondary" className="text-green-600 bg-green-50">
              <TrendingUp className="h-3 w-3 mr-1" />+{percent}%
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-red-600 bg-red-50">
              <TrendingDown className="h-3 w-3 mr-1" />
              {percent}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface CategoryItemProps {
  heading: string
  value: number
}

const CategoryItem = ({ heading, value }: CategoryItemProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium">{heading}</span>
      <span className="text-muted-foreground">{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
)

interface TransactionTableProps {
  data: Array<{
    _id: string
    amount: number
    quantity: number
    discount: number
    status: string
  }>
}

const TransactionTable = ({ data }: TransactionTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Discount</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((transaction) => (
        <TableRow key={transaction._id}>
          <TableCell className="font-medium">{transaction._id}</TableCell>
          <TableCell>₹{transaction.amount}</TableCell>
          <TableCell>{transaction.quantity}</TableCell>
          <TableCell>{transaction.discount}%</TableCell>
          <TableCell>
            <Badge
              variant={
                transaction.status === "Delivered"
                  ? "default"
                  : transaction.status === "Shipped"
                    ? "secondary"
                    : "outline"
              }
            >
              {transaction.status}
            </Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default Dashboard
