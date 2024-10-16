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
  Info
} from "lucide-react";
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
} from "@/components/ui/select";
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

type InvoiceItems = {
  description: string;
  quantity: string;
  unitPrice: number;
  totalPrice: number;
  gstPercentage: number;

};

type Transaction = {
  id: string;
  type: "sales" | "purchase";
  date: string;
  invoiceNum: string;
  partyName: string;
  gstinNum: string;
  items: InvoiceItems[];
  totalAmountWithoutGST: number;
  gst: {
    cgst: number;
    sgst: number;
  };
  totalAmount: number;
};

interface MicroserviceIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
}

interface TransactionProps extends Omit<Transaction, "id" | "type"> {
  id: string;
  type: "sales" | "purchase";
  date: string;
  totalAmount: number;
}

interface InvoiceCreatedItemProps {
  transaction: TransactionProps;
  onView: (transaction: TransactionProps) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

interface InvoiceItemProps {
  transaction: TransactionProps;
  onView: (transaction: TransactionProps) => void;
}

interface SidebarItemProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
  onClick: () => void;
}

type BillingScreenProps = {
  onSave: (
    type: "sales" | "purchase",
    data: Omit<Transaction, "id" | "type">
  ) => void;
};

interface TransactionListProps {
  transactions: TransactionProps[];
  type: string;
  onViewInvoice: (transaction: TransactionProps) => void;
}

interface TransactionForCompare {
  transactions: TransactionProps[];
}

type GstReturnsType = {
  totalTaxableValue: string;
  totalCGST: string;
  totalSGST: string;
  totalIGST: string;
  b2bInvoices: string[];
  b2cInvoices: string[];
};

type ITCEntry = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  invoiceNumber: string;
};

type ITCEntryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: ITCEntry | Omit<ITCEntry, "id">) => void;
  title: string;
  initialData?: ITCEntry | null;
};



const MicroserviceIcon = ({ icon: Icon, title }: MicroserviceIconProps) => (
  <div className="flex flex-col items-center justify-center p-4">
    <Icon className="w-8 h-8 mb-2 text-primary" />
    <p className="text-xs text-center">{title}</p>
  </div>
);

const InvoiceItem = ({ transaction, onView }: InvoiceItemProps) => (
  // <div className="flex justify-between items-center py-2 border-b last:border-b-0">
  //   <div>
  //     <Badge variant={transaction.type === "sales" ? "default" : "secondary"}>
  //       {transaction.type}
  //     </Badge>
  //     <p className="text-xs mt-1">{transaction.date}</p>
  //   </div>
  //   <div className="flex items-center">
  //     <span className="text-sm font-semibold mr-2">
  //       ₹{transaction.totalAmount.toFixed(2)}
  //     </span>
  //     <Button variant="ghost" size="sm" onClick={() => onView(transaction)}>
  //       <FileText className="h-4 w-4" />
  //     </Button>
  //   </div>

  // </div>
  <div key={transaction.id} className="flex items-center mb-4 last:mb-0">
    <Button variant="ghost" size="sm" onClick={() => onView(transaction)}>
      <Eye className="h-4 w-4" />
    </Button>
    <div className="ml-4 space-y-1">
      <p className="text-sm font-medium leading-none">
        {transaction.partyName}
      </p>
      <p className="text-sm text-muted-foreground">
        {transaction.type === "sales" ? "Invoice" : "Bill"} #
        {transaction.invoiceNum}
      </p>
    </div>
    <div className="ml-auto font-medium">
      {transaction.type === "sales" ? "+" : "-"}₹
      {transaction.totalAmount.toFixed(2)}
    </div>
  </div>
);

const InvoiceCreatedItem = ({
  transaction,
  onView,
  onSelect,
  isSelected,
}: InvoiceCreatedItemProps) => (
  <div className="flex justify-between items-center py-2 border-b last:border-b-0">
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onSelect(transaction.id)}
      />
      <div>
        <Badge variant={transaction.type === "sales" ? "default" : "secondary"}>
          {transaction.type}
        </Badge>
        <p className="text-xs mt-1">{transaction.date}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-sm font-semibold">
        ₹{transaction.totalAmount.toFixed(2)}
      </span>
      <Button variant="ghost" size="sm" onClick={() => onView(transaction)}>
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

const DashboardContent = ({ transactions, onViewInvoice }: any) => {
  const { toast } = useToast();

  const gstMessages = [
    "GST filing deadline: 30th September 2024 (Quarterly)",
    "Annual GST filing due: 31st December 2024",
    "Next GST payment: 10th October 2024",
    "Quarterly GST audit review: 10th November 2024",
    "Upcoming GST rate revision: 1st January 2025",
  ];

  useEffect(() => {
    const showRandomMessage = () => {
      const randomMessage =
        gstMessages[Math.floor(Math.random() * gstMessages.length)];
      toast({
        title: "Important Notice",
        description: randomMessage,
        duration: 5000,
      });
    };

    // Show the first message on mount
    showRandomMessage();

    // Show a random message every 2 minutes (120,000 ms)
    const intervalId = setInterval(showRandomMessage, 60000);

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const totalSalesAmount = transactions
    .filter((t: any) => t.type === "sales")
    .reduce((sum: number, t: any) => sum + t.totalAmount, 0);

  // Filter by "purchases" and calculate total purchases amount
  const totalPurchasesAmount = transactions
    .filter((t: any) => t.type === "purchase")
    .reduce((sum: number, t: any) => sum + t.totalAmount, 0);
  const totalProfit = totalSalesAmount - totalPurchasesAmount;
  const filedReturns = 12; // This should be calculated based on actual data
  const itcBalance = 12234.56; // This should be calculated based on actual data

  const microservices = [
    { icon: CheckCircle, title: "GST Verification" },
    { icon: Calculator, title: "GST Calculator" },
    { icon: FileText, title: "Invoice Creation" },
    { icon: Cpu, title: "AI Assistant" },
    { icon: PieChart, title: "Financial Reports" },
    { icon: BarChart, title: "Tax Analytics" },
    { icon: FileSpreadsheet, title: "Expense Tracker" },
    { icon: BookOpen, title: "Compliance Guide" },
  ];
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalSalesAmount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchase</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalPurchasesAmount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              ₹{totalProfit.toFixed(2)} profit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filed Returns</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9/12</div>
            <p className="text-xs text-muted-foreground">3 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ITC Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{itcBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Available credit</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {microservices.map((service, index) => (
          <MicroserviceIcon
            key={index}
            icon={service.icon}
            title={service.title}
          />
        ))}
      </div>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
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
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            You have {transactions.length} total transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {transactions.slice(0, 5).map((transaction: any) => (
              <InvoiceItem
                key={transaction.id}
                transaction={transaction}
                onView={onViewInvoice}
              />
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <ArrowRightIcon className="mr-2 h-4 w-4" />
            View All Transactions
          </Button>
        </CardFooter>
      </Card>
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px]">
            {transactions.slice(0, 10).map((transaction: any) => (
              <InvoiceItem
                key={transaction.id}
                transaction={transaction}
                onView={onViewInvoice}
              />
            ))}
          </ScrollArea>
        </CardContent>
      </Card> */}
      
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Tax Breakdown</CardTitle>
          <CardDescription>Current month's tax liability</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
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
                    <div className={`flex items-start max-w-[80%] ${message.role === 'assistant' || message.role === 'typing' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <Avatar className="w-8 h-8  sm:block">
                        <AvatarFallback>{message.role === 'assistant' || message.role === 'typing' ? 'AI' : 'You'}</AvatarFallback>
                      </Avatar>
                      <div className={`mx-2 p-3 rounded-lg text-sm sm:text-base ${
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Company Name</CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-bold">
          XYZ Enterprises Pvt Ltd
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">GSTIN Status</CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-bold">Active</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Registration Date
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-bold">01/04/2019</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Business Type</CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-bold">
          Private Limited Company
        </CardContent>
      </Card>
    </div>
    <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total GST Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpIcon className="inline mr-1" />
              20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Input Tax Credit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,234.50</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpIcon className="inline mr-1" />
              4.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">GSTR-1 and GSTR-3B</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11 Jun</div>
            <p className="text-xs text-muted-foreground">GSTR-1 for May</p>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>GST Breakdown</CardTitle>
            <CardDescription>Current month's GST composition</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleViewSelected = () => {
    // Implement view functionality for selected invoices
  };

  const handleDownloadSelected = () => {
    // Implement download functionality for selected invoices
  };

  const handleImport = () => {
    // Implement import functionality
  };

  const filteredTransactions = transactions.filter((t) => t.type === type);

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
      <ScrollArea className="h-[400px] border rounded-md p-2">
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
          // Message when no transactions of the selected type are found
          <div className="text-center text-gray-500">
            No {type === "sales" ? "sales" : "purchases"} transactions
            available.
          </div>
        )}
      </ScrollArea>
    </div>
  );
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

const GSTReturnFilingAssistant = () => {
  const [selectedReturn, setSelectedReturn] = useState("GSTR-1");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<GstReturnsType>({
    totalTaxableValue: "",
    totalCGST: "",
    totalSGST: "",
    totalIGST: "",
    b2bInvoices: [],
    b2cInvoices: [],
  });
  const [reviewData, setReviewData] = useState<GstReturnsType | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 2) {
      setReviewData(formData);
    }
    setStep(step + 1);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = () => {
    // Here you would typically send the data to your backend or GST portal
    console.log("Submitting GSTR-1 data:", formData);
    // Reset the form and show a success message
    setFormData({
      totalTaxableValue: "",
      totalCGST: "",
      totalSGST: "",
      totalIGST: "",
      b2bInvoices: [],
      b2cInvoices: [],
    });
    setStep(1);
    setReviewData(null);
    alert("GSTR-1 submitted successfully!");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>GST Return Filing Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedReturn} onValueChange={setSelectedReturn}>
          <TabsList>
            <TabsTrigger value="GSTR-1">GSTR-1</TabsTrigger>
            <TabsTrigger value="GSTR-3B">GSTR-3B</TabsTrigger>
          </TabsList>
          <TabsContent value="GSTR-1">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 1: Prepare Data</h3>
                <p>
                  Ensure all your sales invoices for the period are ready.
                  You'll need to enter the following information:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Total taxable value of supplies</li>
                  <li>Total CGST, SGST, and IGST collected</li>
                  <li>Details of B2B and B2C invoices</li>
                </ul>
                <Button onClick={handleNext}>Next</Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 2: Enter Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalTaxableValue">
                      Total Taxable Value
                    </Label>
                    <Input
                      id="totalTaxableValue"
                      name="totalTaxableValue"
                      value={formData.totalTaxableValue}
                      onChange={handleInputChange}
                      placeholder="Enter total taxable value"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalCGST">Total CGST</Label>
                    <Input
                      id="totalCGST"
                      name="totalCGST"
                      value={formData.totalCGST}
                      onChange={handleInputChange}
                      placeholder="Enter total CGST"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalSGST">Total SGST</Label>
                    <Input
                      id="totalSGST"
                      name="totalSGST"
                      value={formData.totalSGST}
                      onChange={handleInputChange}
                      placeholder="Enter total SGST"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalIGST">Total IGST</Label>
                    <Input
                      id="totalIGST"
                      name="totalIGST"
                      value={formData.totalIGST}
                      onChange={handleInputChange}
                      placeholder="Enter total IGST"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button onClick={handleNext}>Next</Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Step 3: Review and Submit
                </h3>
                <div className="border p-4 rounded-md">
                  <h4 className="font-semibold mb-2">GSTR-1 Summary</h4>
                  <p>Total Taxable Value: ₹{formData.totalTaxableValue}</p>
                  <p>Total CGST: ₹{formData.totalCGST}</p>
                  <p>Total SGST: ₹{formData.totalSGST}</p>
                  <p>Total IGST: ₹{formData.totalIGST}</p>
                </div>
                <div className="flex justify-between">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button onClick={handleSubmit}>Submit GSTR-1</Button>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="GSTR-3B">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">GSTR-3B Filing</h3>
              <p>
                GSTR-3B filing process will be implemented here, similar to
                GSTR-1.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
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
    { title: "Dashboard", icon: Home },
    { title: "Billing", icon: FileText },
    { title: "Sales", icon: Weight },
    { title: "Purchases", icon: ShoppingCart },
    { title: "Compare Invoices", icon: GitCompareArrows },
    { title: "GST Returns", icon: FileCheck },
    { title: "ITC Management", icon: CreditCard },
    { title: "GST Verification", icon: CheckCircle },
    { title: "HSN/SAC Lookup", icon: Search },
    { title: "AI Bot", icon: MessageSquare },
    { title: "GST Dashboard", icon: Calculator },
    { title: "Settings", icon: Settings },
  ];

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
        return <GSTReturnFilingAssistant />;
      case "ITC Management":
        return <ITCManagement />;
      case "GST Verification":
        return <GSTVerification />;
      case "HSN/SAC Lookup":
        return <HSNSACLookup />;

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
          className={`w-64 bg-background border-r transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static top-0 left-0 bottom-0 z-50`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <ArrowLeft
                  onClick={() => setSidebarOpen(false)}
                  className="h-7 w-7 md:hidden"
                />
                <div className="flex items-center flex-1 ml-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl md:text-2xl font-bold ml-2">FinApp</h1>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 w-full">
              <div className="px-4">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <Button
                      key={item.title}
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeItem === item.title
                          ? "bg-primary/10 text-primary"
                          : ""
                      }`}
                      onClick={() => handleNavigation(item.title)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Button>
                  ))}
                </nav>
              </div>
            </ScrollArea>
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  /* Handle logout */
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-background border-b p-4 flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {/* <Menu className="h-6 w-6" /> */}
              <Avatar>
                {/* <AvatarImage src="https://xsgames.co/randomusers/avatar.php?g=male" /> */}
                <AvatarImage src="https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
            {/* <h2 className="text-lg font-semibold">FinApp</h2> */}
            <div>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {darkMode ? (
                  <Sun className="h-7 w-7" />
                ) : (
                  <Moon className="h-7 w-7" />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-7 w-7" />
              </Button>
              <Button variant="ghost" size="icon">
                <BellRing className="h-7 w-7" />
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
