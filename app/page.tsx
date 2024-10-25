"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  FileText,
  MessageSquare,
  Calculator,
  Settings,
  LogOut,
  DollarSign,
  TrendingUp,
  Sun,
  Moon,
  CheckCircle,
  Cpu,
  PieChart,
  BarChart,
  FileSpreadsheet,
  BookOpen,
  BellRing,
  Search,
  ArrowLeft,
  CalendarIcon,
  IndianRupee,
  Weight,
  ShoppingCart,
  Upload,
  Download,
  Eye,
  GitCompareArrows,
  Check,
  X,
  Trash2,
  Plus,
  FileCheck,
  CreditCard,
  Truck,
  Trash,
  Edit,
  Filter,
  ArrowRightIcon,
  TrendingDown,
  ArrowUpIcon,
  BarChart2,
  AlertTriangle,
  CalendarCheck,
  XCircle,
  HelpCircle,
  Send,
  Bot,
  Info,
  Menu,
  Bell,
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  ClipboardList,
  Briefcase,
  Hash,
  AlertCircle,
  CalendarRange,
  ChevronRight
} from "lucide-react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as Tooltips,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart as BarCharts,
  Bar,
 LineChart, 
 Line
} from "recharts";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { GSTResources } from "@/components/gst-resources";
import { BillingScreenProps, DashboardCardProps, GstReturnsType, InvoiceCreatedItemProps, InvoiceItemProps, InvoiceItems, ITCEntry, ITCEntryDialogProps, MicroserviceIconProps, SidebarItemProps, Transaction, TransactionForCompare, TransactionListProps } from "@/types";
import GSTReturnFilingAssistant from "@/components/gst-filing-return";
import GSTFilingProcess from "@/components/gst-filing-return";





const MicroserviceIcon = ({ icon: Icon, title }: MicroserviceIconProps) => (
  <div className="flex flex-col items-center justify-center p-4">
    <Icon className="w-8 h-8 mb-2 text-primary" />
    <p className="text-xs text-center">{title}</p>
  </div>
);

const sampleTransactions: Transaction[] = [
  {
    id: "S001",
    type: "sales",
    date: "2024-10-15",
    invoiceNum: "INV-001",
    partyName: "TechCorp Solutions",
    gstinNum: "29ABCDE1234F1Z5",
    items: [{ description: "IT Services", quantity: "1", unitPrice: 50000, totalPrice: 59000, gstPercentage: 18 }],
    totalAmountWithoutGST: 50000,
    gst: { cgst: 4500, sgst: 4500 },
    totalAmount: 59000
  },
  {
    id: "P001",
    type: "purchase",
    date: "2024-10-14",
    invoiceNum: "BILL-001",
    partyName: "Office Supplies Co.",
    gstinNum: "27FGHIJ5678K2Y6",
    items: [{ description: "Office Furniture", quantity: "5", unitPrice: 10000, totalPrice: 59000, gstPercentage: 18 }],
    totalAmountWithoutGST: 50000,
    gst: { cgst: 4500, sgst: 4500 },
    totalAmount: 59000
  },
  {
    id: "S002",
    type: "sales",
    date: "2024-10-13",
    invoiceNum: "INV-002",
    partyName: "Global Traders Inc.",
    gstinNum: "03KLMNO9012P3Q7",
    items: [{ description: "Export Goods", quantity: "100", unitPrice: 1000, totalPrice: 118000, gstPercentage: 18 }],
    totalAmountWithoutGST: 100000,
    gst: { cgst: 9000, sgst: 9000 },
    totalAmount: 118000
  },
  {
    id: "P002",
    type: "purchase",
    date: "2024-10-12",
    invoiceNum: "BILL-002",
    partyName: "Tech Hardware Ltd.",
    gstinNum: "19PQRST3456U4V8",
    items: [{ description: "Computer Equipment", quantity: "10", unitPrice: 25000, totalPrice: 295000, gstPercentage: 18 }],
    totalAmountWithoutGST: 250000,
    gst: { cgst: 22500, sgst: 22500 },
    totalAmount: 295000
  },
  {
    id: "S003",
    type: "sales",
    date: "2024-10-11",
    invoiceNum: "INV-003",
    partyName: "Local Retail Store",
    gstinNum: "08UVWXY7890Z5A9",
    items: [{ description: "Consumer Goods", quantity: "50", unitPrice: 500, totalPrice: 29500, gstPercentage: 18 }],
    totalAmountWithoutGST: 25000,
    gst: { cgst: 2250, sgst: 2250 },
    totalAmount: 29500
  }
]


const InvoiceItem: React.FC<InvoiceItemProps> = ({ transaction, onView }) => (
  <div className="flex items-center justify-between py-3 border-b last:border-b-0">
    <div className="flex items-center space-x-4">
      <div className={`p-2 rounded-full ${transaction.type === 'sales' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
        {transaction.type === 'sales' ? (
          <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
        ) : (
          <ArrowDownLeft className="h-5 w-5 text-red-600 dark:text-red-400" />
        )}
      </div>
      <div>
        <p className="text-sm font-medium">{transaction.partyName}</p>
        <p className="text-xs text-muted-foreground">
          {transaction.type === "sales" ? "Invoice" : "Bill"} #{transaction.invoiceNum}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <p className={`text-sm font-medium ${transaction.type === 'sales' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {transaction.type === "sales" ? "+" : "-"}₹{transaction.totalAmount.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground">{transaction.date}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onView(transaction)}>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  </div>
)


const InvoiceCreatedItem = ({
  transaction,
  onView,
  onSelect,
  isSelected,
}: InvoiceCreatedItemProps) => (
  <div className="flex items-center justify-between py-3 px-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
    <div className="flex items-center space-x-4">
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onSelect(transaction.id)}
      />
      
      <div>
        <p className="text-sm font-medium">{transaction.partyName}</p>
        <p className="text-xs text-muted-foreground">
          {transaction.type === "sales" ? "Invoice" : "Bill"} #{transaction.invoiceNum}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <p className={`text-sm font-medium ${transaction.type === 'sales' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {transaction.type === "sales" ? "+" : "-"}₹{transaction.totalAmount.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground">{transaction.date}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onView(transaction)}>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const SidebarItem = ({
  title,
  icon: Icon,
  isActive,
  onClick,
}: SidebarItemProps) => (
  <Button
    variant="ghost"
    className={`w-full justify-start mb-2 ${
      isActive ? "bg-primary/10 text-primary" : ""
    }`}
    onClick={onClick}
  >
    <Icon className="mr-2 h-4 w-4" />
    {title}
  </Button>
);



const DashboardCard: React.FC<DashboardCardProps> = ({ title, amount, icon, description, trend, colorScheme }) => {
  const getGradient = () => {
    switch (colorScheme) {
      case 'blue':
        return 'from-blue-500 to-blue-600'
      case 'green':
        return 'from-green-500 to-green-600'
      case 'purple':
        return 'from-purple-500 to-purple-600'
      case 'orange':
        return 'from-orange-500 to-orange-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <Card className={`bg-gradient-to-br ${getGradient()} text-white overflow-hidden relative`}>
      <div className="absolute inset-0 bg-white opacity-10 transform rotate-12 translate-x-12 -translate-y-12 rounded-full"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-white/20 rounded-full">{icon}</div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">{amount}</div>
        <p className="text-xs mt-1 flex items-center justify-between">
        <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">{trend}</span>
        </div>
        </p>
      </CardContent>
      
    </Card>
  )
}





const DashboardContent = ({ transactions, onViewInvoice }: any) => {
  const { toast } = useToast();

  const gstMessages = [
    {
      message: "GST filing deadline: 30th September 2024 (Quarterly)",
      icon: CalendarIcon,
      color: "bg-blue-500 dark:bg-blue-600",
    },
    {
      message: "Annual GST filing due: 31st December 2024",
      icon: FileText,
      color: "bg-green-500 dark:bg-green-600",
    },
    {
      message: "Next GST payment: 10th October 2024",
      icon: CreditCard,
      color: "bg-purple-500 dark:bg-purple-600",
    },
    {
      message: "Quarterly GST audit review: 10th November 2024",
      icon: AlertTriangle,
      color: "bg-yellow-500 dark:bg-yellow-600",
    },
    {
      message: "Upcoming GST rate revision: 1st January 2025",
      icon: Bell,
      color: "bg-red-500 dark:bg-red-600",
    },
  ]
  

  const showRandomMessage = () => {
    const randomMessage = gstMessages[Math.floor(Math.random() * gstMessages.length)]
    const Icon = randomMessage.icon

    toast({
      description: (
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-white/20 rounded-full">
            <Icon className="h-5 w-5" />
          </div>
          <p className="font-medium">{randomMessage.message}</p>
        </div>
      ),
      duration: 5000,
      className: `${randomMessage.color} text-white`,
      // action: (
      //   <ToastAction altText="Close" className="text-white hover:text-white/80">
      //     <X className="h-4 w-4" />
      //   </ToastAction>
      // ),
    })
  }

  useEffect(() => {
    // Show the first message on mount
    showRandomMessage()

    // Show a random message every 1 minute (60,000 ms)
    const intervalId = setInterval(showRandomMessage, 60000)

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId)
  }, [])

  const totalSalesAmount = transactions
    .filter((t: any) => t.type === "sales")
    .reduce((sum: number, t: any) => sum + t.totalAmount, 0);

  // Filter by "purchases" and calculate total purchases amount
  const totalPurchasesAmount = transactions
    .filter((t: any) => t.type === "purchase")
    .reduce((sum: number, t: any) => sum + t.totalAmount, 0);
  const totalProfit = totalSalesAmount - totalPurchasesAmount;
  const filedReturns = 9; // This should be calculated based on actual data
  const itcBalance = 12234.56; // This should be calculated based on actual data

  
  
  const MicroserviceIcon: React.FC<MicroserviceIconProps> = ({ icon: Icon, title, color }) => {
    return (
      <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50 dark:bg-background/20 backdrop-blur-sm ">
        <div className={`p-3 rounded-full ${color} text-white mb-3`}>
          <Icon className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-foreground text-center">{title}</p>
      </div>
    )
  }

  const microservices = [
    { icon: CheckCircle, title: "GST Verification", color: "bg-green-500 dark:bg-green-600" },
    { icon: Calculator, title: "GST Calculator", color: "bg-blue-500 dark:bg-blue-600" },
    { icon: FileText, title: "Invoice Creation", color: "bg-purple-500 dark:bg-purple-600" },
    { icon: Cpu, title: "AI Assistant", color: "bg-indigo-500 dark:bg-indigo-600" },
    { icon: PieChart, title: "Financial Reports", color: "bg-yellow-500 dark:bg-yellow-600" },
    { icon: BarChart, title: "Tax Analytics", color: "bg-red-500 dark:bg-red-600" },
    { icon: FileSpreadsheet, title: "Expense Tracker", color: "bg-teal-500 dark:bg-teal-600" },
    { icon: BookOpen, title: "Compliance Guide", color: "bg-pink-500 dark:bg-pink-600" },
  ]
  const areaChartData = [
    { name: "Jan", Sales: 4000, Purchases: 2400 },
    { name: "Feb", Sales: 3000, Purchases: 1398 },
    { name: "Mar", Sales: 2000, Purchases: 9800 },
    { name: "Apr", Sales: 2780, Purchases: 3908 },
    { name: "May", Sales: 1890, Purchases: 4800 },
    { name: "Jun", Sales: 2390, Purchases: 3800 },
  ];

  const pieChartData = [
    { name: "CGST", value: 25 },
    { name: "SGST", value: 25 },
    { name: "IGST", value: 35 },
    { name: "Cess", value: 15 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const currentYear = new Date().getFullYear()
const years = Array.from({ length: 5 }, (_, i) => currentYear - i)
  const [selectedYear, setSelectedYear] = useState(currentYear.toString())

  const handleExport = (type: string) => {
    // Implement export logic here
    toast({
      title: "Export Initiated",
      description: `Exporting ${type} data for the year ${selectedYear}`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex justify-between items-center w-full sm:justify-normal sm:w-auto sm:flex-row gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-500 text-white dark:hover:bg-blue-400">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Choose export type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleExport("GSTR-1")}>
              GSTR-1 Data
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("GSTR-3B")}>
              GSTR-3B Data
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("Invoice")}>
              Invoice Data
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("Financial Summary")}>
              Financial Summary
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <CalendarRange className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                FY {year - 1}-{year.toString().slice(-2)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg w-full sm:w-auto">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">Next Filing Due: 20th Oct</span>
      </div>
    </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Monthly Sales"
          amount={`₹${totalSalesAmount.toFixed(2)}`}
          icon={<TrendingUp className="h-5 w-5" />}
          description="from last month"
          trend="+20.1%"
          colorScheme="blue"
        />
        <DashboardCard
          title="Monthly Purchase"
          amount={`₹${totalPurchasesAmount.toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5" />}
          description={`Profit`}
          trend={`Profit  ₹${totalProfit.toFixed(2)}`}
          colorScheme="green"
        />
        <DashboardCard
          title="Filed Returns"
          amount={`${filedReturns}/12`}
          icon={<FileText className="h-5 w-5" />}
          description="pending"
          trend="Pending 3"
          colorScheme="purple"
        />
        <DashboardCard
          title="ITC Balance"
          amount={`₹${itcBalance.toFixed(2)}`}
          icon={<CreditCard className="h-5 w-5" />}
          description="Available credit"
          trend="Available credit"
          colorScheme="orange"
        />
      </div>
    <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
      {microservices.map((service, index) => (
        <MicroserviceIcon
          key={index}
          icon={service.icon}
          title={service.title}
          color={service.color}
        />
      ))}
    </div>
     
      <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Transactions</span>
          <DollarSign className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
        <CardDescription>
          You have {transactions.length===0 ? sampleTransactions.length : transactions.length} total transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <ScrollArea className="h-[300px] pr-0">
          {(transactions.length===0 ? sampleTransactions : transactions).map((transaction :any) => (
            <InvoiceItem
              key={transaction.id}
              transaction={transaction}
              onView={onViewInvoice}
            />
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full bg-blue-500 text-white dark:bg-blue-600">
          <ArrowRight className="mr-2 h-4 w-4" />
          View All Transactions
        </Button>
      </CardFooter>
    </Card>
  
    <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2 pr-0">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={areaChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltips />
              <Area
                type="monotone"
                dataKey="Sales"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
              <Area
                type="monotone"
                dataKey="Purchases"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPurchases)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> 
      
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Tax Breakdown</CardTitle>
          <CardDescription>Current month's tax liability</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltips />
            </RePieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {pieChartData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2`}
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm">
                  {entry.name}: {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Financial Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cashflow">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
              <TabsTrigger value="profitability">Profitability</TabsTrigger>
              <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            </TabsList>
            <TabsContent value="cashflow" className="space-y-4">
              <div className="flex items-center">
                <ArrowUpIcon className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-medium text-green-500">
                  8.2% increase in operating cash flow
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your business generated more cash from its core operations this
                month compared to last month.
              </p>
            </TabsContent>
            <TabsContent value="profitability" className="space-y-4">
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-medium text-green-500">
                  Gross profit margin improved by 3.5%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your business is becoming more efficient at producing goods or
                services, resulting in higher profitability.
              </p>
            </TabsContent>
            <TabsContent value="efficiency" className="space-y-4">
              <div className="flex items-center">
                <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                <span className="font-medium text-red-500">
                  Inventory turnover decreased by 2.1 days
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your business is taking slightly longer to sell through its
                inventory. Consider reviewing your inventory management
                practices.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const BillingScreen = ({ onSave }: BillingScreenProps) => {
  const [entryType, setEntryType] = useState<"sales" | "purchase">("sales");
  const [items, setItems] = useState<InvoiceItems[]>([
    { description: "", quantity: "1", unitPrice: 0, totalPrice: 0, gstPercentage: 18 },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      { description: "", quantity: "1", unitPrice: 0, totalPrice: 0, gstPercentage: 18 },
    ]);
  };

  const { toast } = useToast();
  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItems,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "unitPrice" || field === "gstPercentage") {
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const unitPrice = parseFloat(newItems[index].unitPrice.toString()) || 0;
      const gstPercentage = parseFloat(newItems[index].gstPercentage.toString()) || 0;
      const priceWithoutGST = quantity * unitPrice;
      const gstAmount = (priceWithoutGST * gstPercentage) / 100;
      newItems[index].totalPrice = priceWithoutGST + gstAmount;
    }

    setItems(newItems);
  };

  const calculateTotals = () => {
    const totalAmountWithoutGST = items.reduce(
      (sum, item) => sum + (parseFloat(item.quantity) * item.unitPrice),
      0
    );
    const totalGST = items.reduce(
      (sum, item) => sum + ((parseFloat(item.quantity) * item.unitPrice * item.gstPercentage) / 100),
      0
    );
    const totalAmount = totalAmountWithoutGST + totalGST;

    return {
      totalAmountWithoutGST,
      gst: {
        cgst: totalGST / 2,
        sgst: totalGST / 2,
      },
      totalAmount,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { totalAmountWithoutGST, gst, totalAmount } = calculateTotals();

    const transaction: Transaction = {
      id: `${entryType.toUpperCase()}-${Date.now()}`,
      type: entryType,
      date: formData.get("date") as string,
      invoiceNum: formData.get("invoiceNum") as string,
      partyName: formData.get("partyName") as string,
      gstinNum: formData.get("gstinNum") as string,
      items,
      totalAmountWithoutGST,
      gst,
      totalAmount,
    };

    onSave(entryType, transaction);
    toast({
      title: "Transaction Saved",
      description: `${entryType.charAt(0).toUpperCase() + entryType.slice(1)} entry has been saved successfully.`,
    });

    // Reset form
    setItems([{ description: "", quantity: "1", unitPrice: 0, totalPrice: 0, gstPercentage: 18 }]);
    (e.target as HTMLFormElement).reset();
  };



  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold">Billing</h2>
      <div className="flex space-x-2 sm:space-x-4">
        <Button
          onClick={() => setEntryType("sales")}
          variant={entryType === "sales" ? "default" : "outline"}
          className="text-xs sm:text-sm"
        >
          Sales Entry
        </Button>
        <Button
          onClick={() => setEntryType("purchase")}
          variant={entryType === "purchase" ? "default" : "outline"}
          className="text-xs sm:text-sm"
        >
          Purchase Entry
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceNum" className="text-sm">
              Invoice Number
            </Label>
            <Input
              id="invoiceNum"
              name="invoiceNum"
              required
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm">
              Date
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="partyName" className="text-sm">
              {entryType === "sales" ? "Customer Name" : "Vendor Name"}
            </Label>
            <Input
              id="partyName"
              name="partyName"
              required
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gstinNum" className="text-sm">
              GSTIN
            </Label>
            <Input id="gstinNum" name="gstinNum" required className="text-sm" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Items</Label>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap items-end gap-2 pb-2 border-b"
            >
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor={`description-${index}`} className="text-xs">
                  Description
                </Label>
                <Input
                  id={`description-${index}`}
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  className="text-sm"
                  required
                />
              </div>
              <div className="w-20">
                <Label htmlFor={`quantity-${index}`} className="text-xs">
                  Quantity
                </Label>
                <Input
                  id={`quantity-${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="text-sm"
                  required
                />
              </div>
              <div className="w-28">
                <Label htmlFor={`unitPrice-${index}`} className="text-xs">
                  Unit Price
                </Label>
                <Input
                  id={`unitPrice-${index}`}
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "unitPrice",
                      parseFloat(e.target.value)
                    )
                  }
                  className="text-sm"
                  required
                />
              </div>
              <div className="w-28">
                <Label htmlFor={`gstPercentage-${index}`} className="text-xs">
                  GST %
                </Label>
                <Select
                  value={item.gstPercentage.toString()}
                  onValueChange={(value) => handleItemChange(index, "gstPercentage", parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="GST %" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-28">
                <Label className="text-xs">Total Price</Label>
                <Input
                  value={item.totalPrice.toFixed(2)}
                  readOnly
                  className="text-sm bg-muted"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveItem(index)}
                disabled={items.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddItem}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Item
          </Button>
        </div>

        <div className="space-y-2 text-right">
          <p className="text-sm">
            Total (without GST): ₹
            {calculateTotals().totalAmountWithoutGST.toFixed(2)}
          </p>
          <p className="text-sm">
            CGST: ₹
            {calculateTotals().gst.cgst.toFixed(2)}
          </p>
          <p className="text-sm">
            SGST: ₹
            {calculateTotals().gst.sgst.toFixed(2)}
          </p>
          <p className="text-lg font-semibold">
            Total Amount: ₹{calculateTotals().totalAmount.toFixed(2)}
          </p>
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Save {entryType.charAt(0).toUpperCase() + entryType.slice(1)} Entry
        </Button>
      </form>
    </div>
  );
};

type Message = {
  role: 'user' | 'assistant' | 'typing'
  content: string
}

const initialMessages: Message[] = [
  { role: 'assistant', content: `Hello! I'm your GST AI Assistant. How can I help you today?` },
]

const AIBotScreen = () => {

  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [baseAmount, setBaseAmount] = useState<string>('')
  const [gstRate, setGstRate] = useState<string>('18')
  const [calculatedGST, setCalculatedGST] = useState<{
    cgst: number;
    sgst: number;
    igst: number;
    total: number;
  } | null>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }])
      setInput('')
      setIsTyping(true)

      // Simulate AI typing
      setMessages(prev => [...prev, { role: 'typing', content: '' }])

      // Simulate AI response after 5 seconds
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => {
          const newMessages = prev.filter(msg => msg.role !== 'typing')
          return [...newMessages, { role: 'assistant', content: getSimulatedResponse(input) }]
        })
      }, 5000)
    }
  }

  const getSimulatedResponse = (query: string): string => {
    // This is a very basic simulation. In a real app, this would be replaced with actual AI responses.
    if (query.toLowerCase().includes('gst rates')) {
      return "GST rates in India typically fall into four brackets: 5%, 12%, 18%, and 28%. Some essential items are taxed at 0% or are exempt. The specific rate depends on the type of good or service."
    } else if (query.toLowerCase().includes('file gstr')) {
      return "To file your GSTR, log into the GST portal, navigate to Returns dashboard, select the appropriate form (e.g., GSTR-1 for outward supplies), fill in the required details, and submit. Remember to file within the due dates to avoid penalties."
    } else if (query.toLowerCase().includes('input tax credit')) {
      return "Input Tax Credit (ITC) is the credit you get for the tax paid on inputs used for your business. You can claim ITC in your GSTR-3B return. Ensure you have valid tax invoices and that the supplier has filed their returns for you to claim ITC."
    } else {
      return "I'm sorry, I don't have specific information about that. Is there anything else related to GST that I can help you with?"
    }
  }

  const calculateGST = () => {
    const amount = parseFloat(baseAmount)
    const rate = parseFloat(gstRate)

    if (isNaN(amount) || isNaN(rate)) {
      setCalculatedGST(null)
      return
    }

    const totalGST = (amount * rate) / 100
    const halfGST = totalGST / 2

    setCalculatedGST({
      cgst: halfGST,
      sgst: halfGST,
      igst: totalGST,
      total: amount + totalGST
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-xl sm:text-2xl">
          <Bot className="mr-2 h-6 w-6" />
          GST AI Assistant
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">Get help with GST-related queries and calculations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="chat" className="text-xs sm:text-sm">Chat</TabsTrigger>
            <TabsTrigger value="calculator" className="text-xs sm:text-sm">Calculator</TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs sm:text-sm">Due Dates</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs sm:text-sm">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="mt-0">
            <ScrollArea className="h-[300px] lg:h-[400px] w-full  border rounded-md" ref={scrollAreaRef}>
              <div className="p-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'assistant' || message.role === 'typing' ? 'justify-start' : 'justify-end'} mb-4`}>
                    <div className={`flex items-start max-w-[100%] ${message.role === 'assistant' || message.role === 'typing' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <Avatar className="w-8 h-8  sm:block">
                        <AvatarFallback>{message.role === 'assistant' || message.role === 'typing' ? 'AI' : 'U'}</AvatarFallback>
                      </Avatar>
                      <div className={`mx-2 p-2 rounded-lg text-sm sm:text-base ${
                        message.role === 'assistant' ? 'bg-secondary' : 
                        message.role === 'typing' ? 'bg-secondary animate-pulse' : 
                        'bg-primary text-primary-foreground'
                      }`}>
                        {message.role === 'typing' ? (
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex w-full items-center space-x-2 mt-4">
              <Input
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-grow"
                disabled={isTyping}
              />
              <Button onClick={handleSend} className="px-3 sm:px-4" disabled={isTyping}>
                <Send className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="calculator" className="mt-0">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="text-lg font-semibold mb-2">GST Calculator</h3>
              <p className="text-sm text-muted-foreground mb-4">Calculate GST for your transactions quickly.</p>
              {/* Add GST calculator UI here */}
              <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="baseAmount">Base Amount (₹)</Label>
              <Input
                id="baseAmount"
                placeholder="Enter base amount"
                value={baseAmount}
                onChange={(e) => setBaseAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gstRate">GST Rate (%)</Label>
              <Select value={gstRate} onValueChange={setGstRate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select GST rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="18">18%</SelectItem>
                  <SelectItem value="28">28%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={calculateGST} className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate GST
              </Button>
            </div>
          </div>
          {calculatedGST && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">GST Calculation Results:</h4>
              <div className="grid grid-cols-2 gap-2">
                <p>CGST (₹{parseFloat(gstRate) / 2}%): ₹{calculatedGST.cgst.toFixed(2)}</p>
                <p>SGST (₹{parseFloat(gstRate) / 2}%): ₹{calculatedGST.sgst.toFixed(2)}</p>
                <p>IGST (₹{gstRate}%): ₹{calculatedGST.igst.toFixed(2)}</p>
                <p className="font-semibold">Total Amount: ₹{calculatedGST.total.toFixed(2)}</p>
              </div>
            </div>
          )}
              
            </div>
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="text-lg font-semibold mb-2">GST Filing Calendar</h3>
              <p className="text-sm text-muted-foreground mb-4">Keep track of important GST filing dates.</p>
              <ul className="list-disc list-inside text-sm">
                <li>GSTR-1: 11th of next month</li>
                <li>GSTR-3B: 20th of next month</li>
                <li>GSTR-9: 31st December</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="insights" className="mt-0">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="text-lg font-semibold mb-2">GST Insights</h3>
              <p className="text-sm text-muted-foreground mb-4">Get valuable insights about your GST data.</p>
              <ul className="list-disc list-inside text-sm">
                <li>Your GST liability has increased by 5% this month</li>
                <li>You have unclaimed Input Tax Credit of ₹10,000</li>
                <li>3 invoices are pending reconciliation</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row">
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <FileText className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filing</span> Guide
          </Button>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <HelpCircle className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">GST</span> FAQs
          </Button>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <AlertTriangle className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Compliance</span> Alerts
          </Button>
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <TrendingUp className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">GST</span> Analytics
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
};





const GSTDashboardScreen = () => {

  

  const pieChartData = [
    { name: 'CGST', value: 25 },
    { name: 'SGST', value: 25 },
    { name: 'IGST', value: 35 },
    { name: 'Cess', value: 15 },
  ]
  
  const gstComplianceData = [
    { name: 'GSTR-1', filed: 80 },
    { name: 'GSTR-3B', filed: 75 },
    { name: 'GSTR-9', filed: 90 },
  ]

  const gstTrendData = [
    { month: 'Jan', gstCollected: 5000, gstPaid: 4500 },
    { month: 'Feb', gstCollected: 5500, gstPaid: 5000 },
    { month: 'Mar', gstCollected: 6000, gstPaid: 5500 },
    { month: 'Apr', gstCollected: 5800, gstPaid: 5300 },
    { month: 'May', gstCollected: 6200, gstPaid: 5700 },
    { month: 'Jun', gstCollected: 6500, gstPaid: 6000 },
  ]
  
  const topGSTPayingCustomers = [
    { name: 'ABC Corp', gstPaid: 15000 },
    { name: 'XYZ Ltd', gstPaid: 12000 },
    { name: 'PQR Industries', gstPaid: 10000 },
    { name: 'LMN Enterprises', gstPaid: 8000 },
    { name: 'EFG Solutions', gstPaid: 7500 },
  ]
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  
 return (
  <div className="space-y-4">
    <h2 className="text-xl sm:text-2xl font-semibold">GST Dashboard</h2>
    {/* <Input placeholder="Search GSTIN" className="text-sm" /> */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Company Name</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">XYZ Enterprises Pvt Ltd</div>
          </CardContent>
          <Building2 className="absolute right-4 bottom-4 h-16 w-16 opacity-20" />
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Business Type</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">Private Limited Company</div>
          </CardContent>
          <Briefcase className="absolute right-4 bottom-4 h-16 w-16 opacity-20" />
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Registration Date</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">01/04/2019</div>
          </CardContent>
          <ClipboardList className="absolute right-4 bottom-4 h-16 w-16 opacity-20" />
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80">GSTIN Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl font-bold">Active</div>
          </CardContent>
          <CheckCircle className="absolute right-4 bottom-4 h-16 w-16 opacity-20" />
        </Card>
        
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white opacity-10 transform rotate-12 translate-x-12 -translate-y-12 rounded-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total GST Collected</CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs opacity-80">
              <ArrowUpIcon className="inline mr-1" />
              20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-cyan-400 to-cyan-500 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white opacity-10 transform -rotate-12 -translate-x-12 translate-y-12 rounded-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Input Tax Credit</CardTitle>
            <CreditCard className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,234.50</div>
            <p className="text-xs opacity-80">
              <ArrowUpIcon className="inline mr-1" />
              4.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-400 to-red-500 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white opacity-10 transform rotate-45 translate-x-12 translate-y-12 rounded-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
            <FileText className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs opacity-80">GSTR-1 and GSTR-3B</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-400 to-emerald-500 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white opacity-10 transform -rotate-45 -translate-x-12 -translate-y-12 rounded-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
            <CalendarIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11 Jun</div>
            <p className="text-xs opacity-80">GSTR-1 for May</p>
          </CardContent>
        </Card>
      </div>
        <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>GST Breakdown</CardTitle>
            <CardDescription>Current month's GST composition</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltips />
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {pieChartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>GST Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarCharts data={gstComplianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltips />
                <Bar dataKey="filed" fill="#8884d8" />
              </BarCharts>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>  
      <Card>
        <CardHeader>
          <CardTitle>GST Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="returns">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="itc">ITC</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
            <TabsContent value="returns" className="space-y-4">
              <div className="flex items-center">
              <CalendarCheck className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-medium">Next GSTR-1 due on 11th of next month</span>
              </div>
              <p className="text-sm text-muted-foreground">Ensure all your sales invoices for the current month are recorded to file GSTR-1 on time.</p>
            </TabsContent>
            <TabsContent value="itc" className="space-y-4">
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-medium">ITC utilization improved by 5.2%</span>
              </div>
              <p className="text-sm text-muted-foreground">Your business is efficiently utilizing available input tax credits, reducing overall GST liability.</p>
            </TabsContent>
            <TabsContent value="compliance" className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-medium">All GST returns filed on time for the last 6 months</span>
              </div>
              <p className="text-sm text-muted-foreground">Maintaining timely compliance helps avoid penalties and keeps your business in good standing with tax authorities.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card> 
      <Card>
        <CardHeader>
          <CardTitle>GST Collection vs Payment Trend</CardTitle>
          <CardDescription>6-month overview of GST collected and paid</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gstTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltips />
              <Line type="monotone" dataKey="gstCollected" stroke="#8884d8" name="GST Collected" />
              <Line type="monotone" dataKey="gstPaid" stroke="#82ca9d" name="GST Paid" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top GST Paying Customers</CardTitle>
          <CardDescription>Customers contributing the most to your GST collection</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead className="text-right">GST Paid (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topGSTPayingCustomers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell className="text-right">{customer.gstPaid.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>GST Insights and Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="insights">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="insights" className="space-y-4">
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-medium">GST collection increased by 8% this quarter</span>
              </div>
              <p className="text-sm text-muted-foreground">Your business has shown consistent growth in GST collection, indicating improved sales performance.</p>
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                <span className="font-medium">20% of your customers are contributing to 80% of your GST collection</span>
              </div>
              <p className="text-sm text-muted-foreground">Consider diversifying your customer base to reduce dependency on a small group of high-value customers.</p>
            </TabsContent>
            <TabsContent value="recommendations" className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-medium">Optimize your Input Tax Credit utilization</span>
              </div>
              <p className="text-sm text-muted-foreground">Review your purchases and ensure you're claiming all eligible ITCs to reduce your overall GST liability.</p>
              <div className="flex items-center">
                <BarChart2 className="mr-2 h-4 w-4 text-blue-500" />
                <span className="font-medium">Consider GST rate changes for certain products</span>
              </div>
              <p className="text-sm text-muted-foreground">Analyze your product mix an
d consider adjusting prices or exploring different GST rate categories to optimize your tax structure.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GST Resources and Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Download GST Return Templates
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              GST Compliance Checklist
            </Button>
            <Button variant="outline" className="justify-start">
              <Calculator className="mr-2 h-4 w-4" />
              HSN Code Finder
            </Button>
            <Button variant="outline" className="justify-start">
              <CalendarCheck className="mr-2 h-4 w-4" />
              GST Filing Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
   

  </div>
 )
};

const SettingsScreen = () => (
  <div className="space-y-4">
    <h2 className="text-xl sm:text-2xl font-semibold">Settings</h2>
    {/* Add settings options here */}
  </div>
);

const TransactionList = ({
  transactions,
  type,
  onViewInvoice,
}: TransactionListProps) => {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSelect = (id: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleDownloadSelected = () => {
    // Implement download functionality for selected invoices
    console.log("Downloading selected invoices:", selectedInvoices)
  }

  const handleImport = () => {
    // Implement import functionality
    console.log("Importing invoices")
  }

  const filteredTransactions = transactions
    .filter((t) => t.type === type)
    .filter((t) =>
      t.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.invoiceNum.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold">
          {type === "sales" ? "Sales" : "Purchases"}
        </h2>
        <div className="space-x-2">
          <Button
            onClick={handleDownloadSelected}
            disabled={selectedInvoices.length === 0}
          >
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
          <Button onClick={handleImport}>
            <Upload className="w-4 h-4 mr-2" /> Import
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>
      <ScrollArea className="h-[400px] border rounded-md py-2">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <InvoiceCreatedItem
              key={transaction.id}
              transaction={transaction}
              onView={onViewInvoice}
              onSelect={handleSelect}
              isSelected={selectedInvoices.includes(transaction.id)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">
            No {type === "sales" ? "sales" : "purchases"} transactions
            available.
          </div>
        )}
      </ScrollArea>
    </div>
  )
};

const CompareInvoicesScreen = ({ transactions }: TransactionForCompare) => {
  const [compareType, setCompareType] = useState<"inwards" | "outwards">(
    "outwards"
  );
  const [uploadedInvoices, setUploadedInvoices] = useState<Transaction[]>([]);
  const [comparisonResults, setComparisonResults] = useState<{
    matched: number;
    unmatched: number;
    details: any[];
  }>({ matched: 0, unmatched: 0, details: [] });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const parsedData = JSON.parse(content) as Transaction[];
          setUploadedInvoices(parsedData);
          compareInvoices(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          // Handle error (e.g., show a toast notification)
        }
      };
      reader.readAsText(file);
    }
  };

  const compareInvoices = (uploadedInvoices: Transaction[]) => {
    const results = uploadedInvoices.map((uploaded) => {
      const match = transactions.find(
        (t) =>
          t.type === (compareType === "outwards" ? "sales" : "purchase") &&
          t.gstinNum === uploaded.gstinNum &&
          t.totalAmount === uploaded.totalAmount &&
          t.invoiceNum === uploaded.invoiceNum
      );
      return {
        uploaded,
        match: !!match,
      };
    });

    const matched = results.filter((r) => r.match).length;
    const unmatched = results.length - matched;

    setComparisonResults({
      matched,
      unmatched,
      details: results,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold">Compare Invoices</h2>
      <div className="flex space-x-2 sm:space-x-4">
        <Button
          onClick={() => setCompareType("outwards")}
          variant={compareType === "outwards" ? "default" : "outline"}
          className="text-xs sm:text-sm"
        >
          Outwards
        </Button>
        <Button
          onClick={() => setCompareType("inwards")}
          variant={compareType === "inwards" ? "default" : "outline"}
          className="text-xs sm:text-sm"
        >
          Inwards
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="text-sm"
        />
        <Button className="text-xs sm:text-sm">Upload</Button>
      </div>
      {comparisonResults.details.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-sm">Matched: {comparisonResults.matched}</p>
            <p className="text-sm">Unmatched: {comparisonResults.unmatched}</p>
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px]">
                        Invoice ID
                      </TableHead>
                      <TableHead className="min-w-[120px]">GSTIN</TableHead>
                      <TableHead className="min-w-[120px]">
                        Total Amount
                      </TableHead>
                      <TableHead className="min-w-[80px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonResults.details.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {result.uploaded.invoiceNum}
                        </TableCell>
                        <TableCell>{result.uploaded.gstinNum}</TableCell>
                        <TableCell>
                          ₹{result.uploaded.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {result.match ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



const ITCManagement = () => {
  const [itcEntries, setItcEntries] = useState<ITCEntry[]>([
    {
      id: "1",
      description: "Office Supplies",
      amount: 1000,
      category: "Goods",
      date: "2024-03-15",
      invoiceNumber: "INV-001",
    },
    {
      id: "2",
      description: "Consulting Services",
      amount: 5000,
      category: "Services",
      date: "2024-03-20",
      invoiceNumber: "INV-002",
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<ITCEntry | null>(null);
  const [filter, setFilter] = useState("");

  const { toast } = useToast();

  const handleAddEntry = (entry: Omit<ITCEntry, "id">) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    setItcEntries([...itcEntries, newEntry]);
    setIsAddDialogOpen(false);
    toast({
      title: "ITC Entry Added",
      description: "New ITC entry has been added successfully.",
    });
  };

  const handleEditEntry = (entry: ITCEntry | Omit<ITCEntry, "id">) => {
    if ("id" in entry) {
      // Handle the case when the entry has an id (ITCEntry)
      setItcEntries(itcEntries.map((e) => (e.id === entry.id ? entry : e)));
      setIsEditDialogOpen(false);
      toast({
        title: "ITC Entry Updated",
        description: "ITC entry has been updated successfully.",
      });
    } else {
      // Handle the case when the entry doesn't have an id (Omit<ITCEntry, 'id'>)
      console.error("Entry without an ID cannot be updated.");
    }
  };

  const handleDeleteEntry = (id: string) => {
    setItcEntries(itcEntries.filter((e) => e.id !== id));
    toast({
      title: "ITC Entry Deleted",
      description: "ITC entry has been deleted successfully.",
    });
  };

  const filteredEntries = itcEntries.filter(
    (entry) =>
      entry.description.toLowerCase().includes(filter.toLowerCase()) ||
      entry.category.toLowerCase().includes(filter.toLowerCase()) ||
      entry.invoiceNumber.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle>Input Tax Credit Management</CardTitle>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add ITC Entry
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Label htmlFor="filter" className="sr-only">
              Filter
            </Label>
            <Input
              id="filter"
              placeholder="Filter entries..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-[250px]"
            />
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Upload className="w-4 h-4 mr-2" /> Import
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>₹{entry.amount.toFixed(2)}</TableCell>
                  <TableCell>{entry.category}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.invoiceNumber}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCurrentEntry(entry);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile view */}
        <div className="sm:hidden">
          <Accordion type="single" collapsible className="w-full">
            {filteredEntries.map((entry) => (
              <AccordionItem value={entry.id} key={entry.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium">{entry.description}</span>
                    <span className="text-sm text-gray-500">
                      ₹{entry.amount.toFixed(2)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Category:</strong> {entry.category}
                    </p>
                    <p>
                      <strong>Date:</strong> {entry.date}
                    </p>
                    <p>
                      <strong>Invoice Number:</strong> {entry.invoiceNumber}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentEntry(entry);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        <Trash className="w-4 h-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>

      <ITCEntryDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddEntry}
        title="Add ITC Entry"
      />

      <ITCEntryDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEditEntry}
        title="Edit ITC Entry"
        initialData={currentEntry}
      />
    </Card>
  );
};

function ITCEntryDialog({
  isOpen,
  onClose,
  onSave,
  title,
  initialData,
}: ITCEntryDialogProps) {
  const [formData, setFormData] = useState<Omit<ITCEntry, "id">>({
    description: initialData?.description || "",
    amount: initialData?.amount || 0,
    category: initialData?.category || "",
    date: initialData?.date || "",
    invoiceNumber: initialData?.invoiceNumber || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(initialData ? { ...formData, id: initialData.id } : formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Goods">Goods</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
                <SelectItem value="Capital Goods">Capital Goods</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Mock data for HSN/SAC codes
type HSNSACItem = {
  code: string;
  description: string;
  gstRate: string;
};

// Define the valid search keys (this is the fix)
type SearchType = keyof HSNSACItem;

const mockHSNSACData: HSNSACItem[] = [
  { code: '0101', description: 'Live horses, asses, mules and hinnies', gstRate: '12%' },
  { code: '0201', description: 'Meat of bovine animals, fresh or chilled', gstRate: '0%' },
  { code: '1006', description: 'Rice', gstRate: '5%' },
  { code: '2201', description: 'Waters, including natural or artificial mineral waters', gstRate: '18%' },
  { code: '3004', description: 'Medicaments (excluding goods of heading 30.02, 30.05 or 30.06)', gstRate: '12%' },
];

const HSNSACLookup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("code"); // Use the SearchType here
  const [results, setResults] = useState(mockHSNSACData);

  const handleSearch = () => {
    const filteredResults = mockHSNSACData.filter(item =>
      item[searchType].toLowerCase().includes(searchTerm.toLowerCase()) // This is safe now
    );
    setResults(filteredResults);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">HSN/SAC Code Lookup</CardTitle>
        <CardDescription>
          Search for Harmonized System of Nomenclature (HSN) or Services Accounting Code (SAC)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search HSN/SAC code or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={searchType} onValueChange={(value) => setSearchType(value as keyof HSNSACItem)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Search by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="code">Code</SelectItem>
              <SelectItem value="description">Description</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} className="w-full sm:w-auto">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>HSN/SAC Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>GST Rate</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.gstRate}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View detailed information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download HSN/SAC details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Showing {results.length} results</p>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Results
        </Button>
      </CardFooter>
    </Card>
  );
};

const mockVerifyGST = async (gstNumber: string) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock data for demonstration
  const mockData: Record<string, any> = {
    '29AABCU9603R1ZJ': { 
      valid: true, 
      name: 'ABC Company Ltd', 
      address: '123 Main St, Bangalore', 
      status: 'Active',
      lastFiled: '2024-02-15',
      riskScore: 'Low'
    },
    '27AADCB2230M1Z3': { 
      valid: true, 
      name: 'XYZ Industries', 
      address: '456 Park Ave, Mumbai', 
      status: 'Active',
      lastFiled: '2024-01-31',
      riskScore: 'Medium'
    },
    '07AAACP0000Q1Z4': { 
      valid: false, 
      name: 'Fake Enterprises', 
      address: 'Unknown', 
      status: 'Suspended',
      lastFiled: '2023-06-30',
      riskScore: 'High'
    }
  }

  return mockData[gstNumber] || { valid: false, name: 'Not Found', address: 'N/A', status: 'Invalid', lastFiled: 'N/A', riskScore: 'Unknown' }
}

const GSTVerification =() => {
  const [gstNumber, setGstNumber] = useState('')
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recentVerifications, setRecentVerifications] = useState<any[]>([])

  const handleVerify = async () => {
    setIsLoading(true)
    try {
      const result = await mockVerifyGST(gstNumber)
      setVerificationResult(result)
      setRecentVerifications(prev => [{ gstNumber, ...result }, ...prev.slice(0, 4)])
    } catch (error) {
      console.error('Verification failed:', error)
      setVerificationResult({ valid: false, name: 'Error', address: 'Verification failed', status: 'Error', lastFiled: 'N/A', riskScore: 'Unknown' })
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-500 dark:text-green-400'
      case 'medium': return 'text-yellow-500 dark:text-yellow-400'
      case 'high': return 'text-red-500 dark:text-red-400'
      default: return 'text-gray-500 dark:text-gray-400'
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>GST Transaction Verification</CardTitle>
        <CardDescription>Verify GST numbers and assess potential risks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Label htmlFor="gstNumber">GST Number</Label>
            <Input
              id="gstNumber"
              placeholder="Enter GST Number"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleVerify} disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify'}
              <Search className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {verificationResult && (
          <Alert className={`mt-4 ${verificationResult.valid ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'}`}>
            <AlertTitle className="flex items-center">
              {verificationResult.valid ? (
                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 dark:text-red-400 mr-2" />
              )}
              {verificationResult.valid ? 'Valid GST Number' : 'Invalid GST Number'}
            </AlertTitle>
            <AlertDescription>
              <p><strong>Name:</strong> {verificationResult.name}</p>
              <p><strong>Address:</strong> {verificationResult.address}</p>
              <p><strong>Status:</strong> {verificationResult.status}</p>
              <p><strong>Last Filed:</strong> {verificationResult.lastFiled}</p>
              <p className={`font-bold ${getRiskColor(verificationResult.riskScore)}`}>
                <strong>Risk Score:</strong> {verificationResult.riskScore}
              </p>
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Recent Verifications</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>GST Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentVerifications.map((verification, index) => (
                <TableRow key={index}>
                  <TableCell>{verification.gstNumber}</TableCell>
                  <TableCell>{verification.name}</TableCell>
                  <TableCell>{verification.status}</TableCell>
                  <TableCell className={getRiskColor(verification.riskScore)}>{verification.riskScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Always verify the GST details of your business partners to ensure compliance and reduce the risk of fraud.
        </p>
      </CardFooter>
    </Card>
  )
}


export default function EnhancedFinancialApp() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Transaction | null>(
    null
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const calculateItemGST = (item: InvoiceItems) => {
    const gstAmount = (parseFloat(item.quantity) * item.unitPrice * item.gstPercentage) / 100;
    return {
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
    };
  };

  const totalGST = selectedInvoice?.items.reduce((sum, item) => {
    const { cgst, sgst } = calculateItemGST(item);
    return {
      cgst: sum.cgst + cgst,
      sgst: sum.sgst + sgst,
    };
  }, { cgst: 0, sgst: 0 });


  
  const sidebarItems = [
    { title: "Dashboard", icon: Home, color: "text-blue-500 dark:text-blue-400" },
    { title: "Billing", icon: FileText, color: "text-green-500 dark:text-green-400" },
    { title: "Sales", icon: Weight, color: "text-yellow-500 dark:text-yellow-400" },
    { title: "Purchases", icon: ShoppingCart, color: "text-purple-500 dark:text-purple-400" },
    { title: "Compare Invoices", icon: GitCompareArrows, color: "text-indigo-500 dark:text-indigo-400" },
    { title: "GST Returns", icon: FileCheck, color: "text-red-500 dark:text-red-400" },
    { title: "ITC Management", icon: CreditCard, color: "text-pink-500 dark:text-pink-400" },
    { title: "GST Verification", icon: CheckCircle, color: "text-teal-500 dark:text-teal-400" },
    { title: "HSN/SAC Lookup", icon: Search, color: "text-orange-500 dark:text-orange-400" },
    { title: "AI Bot", icon: MessageSquare, color: "text-cyan-500 dark:text-cyan-400" },
    { title: "Resources", icon: BookOpen, color: "text-emerald-500 dark:text-emerald-400" },
    { title: "GST Dashboard", icon: Calculator, color: "text-amber-500 dark:text-amber-400" },
    { title: "Settings", icon: Settings, color: "text-gray-500 dark:text-gray-400" },
  ]

  const handleNavigation = (item: any) => {
    setActiveItem(item);
    setSidebarOpen(false);
  };

  const handleViewInvoice = (transaction: Transaction) => {
    setSelectedInvoice(transaction);
    setInvoiceDialogOpen(true);
  };

  const handleSaveEntry = (
    type: "sales" | "purchase",
    data: Omit<Transaction, "id" | "type">
  ) => {
    const newTransaction: Transaction = {
      id: `${type.toUpperCase()}-${Date.now()}`,
      type,
      ...data,
    };
    setTransactions([newTransaction, ...transactions]);
    setActiveItem("Dashboard");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  

  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return (
          <DashboardContent
            transactions={transactions}
            onViewInvoice={handleViewInvoice}
          />
        );
      case "Billing":
        return <BillingScreen onSave={handleSaveEntry} />;
      case "AI Bot":
        return <AIBotScreen />;
      case "GST Dashboard":
        return <GSTDashboardScreen />;
      case "Settings":
        return <SettingsScreen />;
      case "Sales":
        return (
          <TransactionList
            transactions={transactions}
            type="sales"
            onViewInvoice={handleViewInvoice}
          />
        );
      case "Purchases":
        return (
          <TransactionList
            transactions={transactions}
            type="purchase"
            onViewInvoice={handleViewInvoice}
          />
        );
      case "Compare Invoices":
        return <CompareInvoicesScreen transactions={transactions} />;
      case "GST Returns":
        return <GSTFilingProcess />;
      case "ITC Management":
        return <ITCManagement />;
      case "GST Verification":
        return <GSTVerification />;
      case "HSN/SAC Lookup":
        return <HSNSACLookup />;
      case "Resources":
          return <GSTResources />;  

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
      className={`w-64 bg-background border-r transition-all duration-300 ${ sidebarOpen ? "translate-x-0" : "-translate-x-full" } md:translate-x-0 fixed md:static top-0 left-0 bottom-0 z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between mb-6">
            <ArrowLeft
              onClick={() => setSidebarOpen(false)}
              className="h-7 w-7 text-foreground/80 hover:text-foreground transition-colors"
            />
            <div className="flex items-center flex-1 ml-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold ml-2 text-foreground">FinApp</h1>
            </div>
          </div>
        </div>
        <ScrollArea className="flex-1 w-full">
          <div className="px-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className={`w-full justify-start py-2 ${
                    activeItem === item.title
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5"
                  }`}
                  onClick={() => handleNavigation(item.title)}
                >
                  <div className={`mr-3 p-1 rounded-md ${item.color} bg-opacity-20`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.title}</span>
                </Button>
              ))}
            </nav>
          </div>
        </ScrollArea>
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start py-2 hover:bg-primary/5"
            onClick={() => {
              /* Handle logout */
            }}
          >
            <div className="mr-3 p-1 rounded-md text-red-500 dark:text-red-400 bg-opacity-20">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-foreground">Logout</span>
          </Button>
        </div>
      </div>
    </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-background/30 backdrop-blur-sm p-2 flex justify-between items-center sticky top-0 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <CgMenuLeftAlt className="h-8 w-8" />
              
            </Button>
            {/* <h2 className="text-lg font-semibold">FinApp</h2> */}
            <div>
            <Button variant="ghost" size="icon">
                <Search className="h-7 w-7" />
              </Button>
              <Button variant="ghost" size="icon">
                <BellRing className="h-7 w-7" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {darkMode ? (
                  <Sun className="h-7 w-7" />
                ) : (
                  <Moon className="h-7 w-7" />
                )}
              </Button>
              
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Invoice Dialog */}
      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
  <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-4">
    <DialogHeader>
      <DialogTitle className="text-base sm:text-lg text-center">Invoice Details</DialogTitle>
    </DialogHeader>

    <ScrollArea className="max-h-[calc(90vh-120px)] overflow-y-auto">
      <div className="space-y-4">
        {/* Invoice header */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Invoice</h2>
            <p className="text-sm text-gray-600">Invoice #: {selectedInvoice?.invoiceNum}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end">
            <p className="text-sm font-semibold">
              {selectedInvoice?.type === "sales" ? "Customer GSTIN" : "Vendor GSTIN"}:
            </p>
            <p className="text-sm font-bold">{selectedInvoice?.gstinNum}</p>
          </div>
        </div>

        {/* Date and party info */}
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{selectedInvoice?.date}</span>
          </div>
          <div>{selectedInvoice?.partyName}</div>
        </div>

        {/* Items table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Description</th>
                <th className="text-right py-2">Qty</th>
                <th className="text-right py-2">Unit Price</th>
                <th className="text-right py-2">GST %</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedInvoice?.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-1">{item.description}</td>
                  <td className="py-1 text-right">{item.quantity}</td>
                  <td className="py-1 text-right">₹{item.unitPrice.toFixed(2)}</td>
                  <td className="py-1 text-right">{item.gstPercentage}%</td>
                  <td className="py-1 text-right">₹{item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GST and total breakdown */}
        <div className="space-y-2 text-right text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{selectedInvoice?.totalAmountWithoutGST.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>CGST:</span>
            <span>₹{totalGST?.cgst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>SGST:</span>
            <span>₹{totalGST?.sgst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total Amount:</span>
            <span className="flex items-center">
              <IndianRupee className="h-4 w-4 text-green-500 mr-1" />
              ₹{selectedInvoice?.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </ScrollArea>
  </DialogContent>
</Dialog>



      <Toaster />
    </div>
  );
}
