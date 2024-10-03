"use client";

import React, { useState, useEffect } from "react";
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
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type InvoiceItems = {
  description: string;
  quantity: string;
  unitPrice: number;
  totalPrice: number;
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
    cgstPercentage: number;
    sgstPercentage: number;
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
  transactions: TransactionProps[]
}

const MicroserviceIcon = ({ icon: Icon, title }: MicroserviceIconProps) => (
  <div className="flex flex-col items-center justify-center p-4">
    <Icon className="w-8 h-8 mb-2 text-primary" />
    <p className="text-xs text-center">{title}</p>
  </div>
);

const InvoiceItem = ({ transaction, onView }: InvoiceItemProps) => (
  <div className="flex justify-between items-center py-2 border-b last:border-b-0">
    <div>
      <Badge variant={transaction.type === "sales" ? "default" : "secondary"}>
        {transaction.type}
      </Badge>
      <p className="text-xs mt-1">{transaction.date}</p>
    </div>
    <div className="flex items-center">
      <span className="text-sm font-semibold mr-2">
        ₹{transaction.totalAmount.toFixed(2)}
      </span>
      <Button variant="ghost" size="sm" onClick={() => onView(transaction)}>
        <FileText className="h-4 w-4" />
      </Button>
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
  .filter((t:any) => t.type === "sales")
  .reduce((sum :number, t : any) => sum + t.totalAmount, 0);

// Filter by "purchases" and calculate total purchases amount
  const totalPurchasesAmount = transactions
  .filter((t:any) => t.type === "purchase")
  .reduce((sum : number, t : any) => sum + t.totalAmount, 0);
  const totalProfit = totalSalesAmount - totalPurchasesAmount
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSalesAmount.toFixed(2)}</div>
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
            <div className="text-2xl font-bold">₹{totalPurchasesAmount.toFixed(2)}</div>
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
      <Card>
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
      </Card>
    </div>
  );
};

const BillingScreen = ({ onSave } : BillingScreenProps) => {
  const [entryType, setEntryType] = useState<'sales' | 'purchase'>('sales')
  const [items, setItems] = useState<InvoiceItems[]>([{ description: '', quantity: '1', unitPrice: 0, totalPrice: 0 }])
  const [gstPercentage, setGstPercentage] = useState(18)

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: '1', unitPrice: 0, totalPrice: 0 }])
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleItemChange = (index: number, field: keyof InvoiceItems, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = parseFloat(newItems[index].quantity) || 0
      const unitPrice = parseFloat(newItems[index].unitPrice.toString()) || 0
      newItems[index].totalPrice = quantity * unitPrice
    }
    
    setItems(newItems)
  }

  const calculateTotals = () => {
    const totalAmountWithoutGST = items.reduce((sum, item) => sum + item.totalPrice, 0)
    const gstAmount = (totalAmountWithoutGST * gstPercentage) / 100
    const totalAmount = totalAmountWithoutGST + gstAmount

    return {
      totalAmountWithoutGST,
      gst: {
        cgst: gstAmount / 2,
        sgst: gstAmount / 2,
        cgstPercentage: gstPercentage / 2,
        sgstPercentage: gstPercentage / 2,
      },
      totalAmount,
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const { totalAmountWithoutGST, gst, totalAmount } = calculateTotals()

    const transaction: Transaction = {
      id: `${entryType.toUpperCase()}-${Date.now()}`,
      type: entryType,
      date: formData.get('date') as string,
      invoiceNum: formData.get('invoiceNum') as string,
      partyName: formData.get('partyName') as string,
      gstinNum: formData.get('gstinNum') as string,
      items,
      totalAmountWithoutGST,
      gst,
      totalAmount,
    }

    onSave(entryType,transaction)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold">Billing</h2>
      <div className="flex space-x-2 sm:space-x-4">
        <Button onClick={() => setEntryType('sales')} variant={entryType === 'sales' ? 'default' : 'outline'} className="text-xs sm:text-sm">Sales Entry</Button>
        <Button onClick={() => setEntryType('purchase')} variant={entryType === 'purchase' ? 'default' : 'outline'} className="text-xs sm:text-sm">Purchase Entry</Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceNum" className="text-sm">Invoice Number</Label>
            <Input id="invoiceNum" name="invoiceNum" required className="text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm">Date</Label>
            <Input id="date" name="date" type="date" required className="text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="partyName" className="text-sm">{entryType === 'sales' ? 'Customer Name' : 'Vendor Name'}</Label>
            <Input id="partyName" name="partyName" required className="text-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gstinNum" className="text-sm">GSTIN</Label>
            <Input id="gstinNum" name="gstinNum" required className="text-sm" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Items</Label>
          {items.map((item, index) => (
            <div key={index} className="flex flex-wrap items-end gap-2 pb-2 border-b">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor={`description-${index}`} className="text-xs">Description</Label>
                <Input
                  id={`description-${index}`}
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="text-sm"
                  required
                />
              </div>
              <div className="w-20">
                <Label htmlFor={`quantity-${index}`} className="text-xs">Quantity</Label>
                <Input
                  id={`quantity-${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  className="text-sm"
                  required
                />
              </div>
              <div className="w-28">
                <Label htmlFor={`unitPrice-${index}`} className="text-xs">Unit Price</Label>
                <Input
                  id={`unitPrice-${index}`}
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                  className="text-sm"
                  required
                />
              </div>
              <div className="w-28">
                <Label className="text-xs">Total Price</Label>
                <Input
                  value={item.totalPrice.toFixed(2)}
                  readOnly
                  className="text-sm bg-muted"
                />
              </div>
              <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveItem(index)} disabled={items.length === 1}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={handleAddItem} className="mt-2">
            <Plus className="h-4 w-4 mr-2" /> Add Item
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gstPercentage" className="text-sm">GST Percentage</Label>
          <Select value={gstPercentage.toString()} onValueChange={(value) => setGstPercentage(parseInt(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select GST %" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5%</SelectItem>
              <SelectItem value="12">12%</SelectItem>
              <SelectItem value="18">18%</SelectItem>
              <SelectItem value="28">28%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 text-right">
          <p className="text-sm">Total (without GST): ₹{calculateTotals().totalAmountWithoutGST.toFixed(2)}</p>
          <p className="text-sm">CGST ({gstPercentage / 2}%): ₹{calculateTotals().gst.cgst.toFixed(2)}</p>
          <p className="text-sm">SGST ({gstPercentage / 2}%): ₹{calculateTotals().gst.sgst.toFixed(2)}</p>
          <p className="text-lg font-semibold">Total Amount: ₹{calculateTotals().totalAmount.toFixed(2)}</p>
        </div>

        <Button type="submit" className="w-full sm:w-auto">Save {entryType.charAt(0).toUpperCase() + entryType.slice(1)} Entry</Button>
      </form>
    </div>
  )
}

const AIBotScreen = () => (
  <div className="space-y-4">
    <h2 className="text-xl sm:text-2xl font-semibold">AI Assistant</h2>
    <div className="grid grid-cols-2 gap-2 sm:gap-4">
      <Button className="text-xs sm:text-sm">GST Filing Help</Button>
      <Button className="text-xs sm:text-sm">Invoice Query</Button>
      <Button className="text-xs sm:text-sm">Tax Calculation</Button>
      <Button className="text-xs sm:text-sm">Compliance Check</Button>
    </div>
    <div className="border rounded-lg p-4 h-48 sm:h-64 overflow-y-auto">
      {/* Chat messages would go here */}
    </div>
    <div className="flex space-x-2">
      <Input placeholder="Type your message..." className="flex-grow text-sm" />
      <Button className="text-xs sm:text-sm">Send</Button>
    </div>
  </div>
);

const GSTDashboardScreen = () => (
  <div className="space-y-4">
    <h2 className="text-xl sm:text-2xl font-semibold">GST Dashboard</h2>
    <Input placeholder="Search GSTIN" className="text-sm" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Company Name</CardTitle>
        </CardHeader>
        <CardContent className="text-xs sm:text-sm">
          XYZ Enterprises Pvt Ltd
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">GSTIN Status</CardTitle>
        </CardHeader>
        <CardContent className="text-xs sm:text-sm">Active</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">
            Registration Date
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs sm:text-sm">01/04/2019</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Business Type</CardTitle>
        </CardHeader>
        <CardContent className="text-xs sm:text-sm">
          Private Limited Company
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">GST Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Input placeholder="Enter amount" type="number" className="text-sm" />
          <Select>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="GST Rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5%</SelectItem>
              <SelectItem value="12">12%</SelectItem>
              <SelectItem value="18">18%</SelectItem>
              <SelectItem value="28">28%</SelectItem>
            </SelectContent>
          </Select>
          <Button className="text-xs sm:text-sm">Calculate</Button>
        </div>
        {/* Result would be displayed here */}
      </CardContent>
    </Card>
  </div>
);

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

const CompareInvoicesScreen = ({ transactions } : TransactionForCompare) => {
  const [compareType, setCompareType] = useState<'inwards' | 'outwards'>('outwards')
  const [uploadedInvoices, setUploadedInvoices] = useState<Transaction[]>([])
  const [comparisonResults, setComparisonResults] = useState<{ matched: number; unmatched: number; details: any[] }>({ matched: 0, unmatched: 0, details: [] })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        try {
          const parsedData = JSON.parse(content) as Transaction[]
          setUploadedInvoices(parsedData)
          compareInvoices(parsedData)
        } catch (error) {
          console.error("Error parsing JSON:", error)
          // Handle error (e.g., show a toast notification)
        }
      }
      reader.readAsText(file)
    }
  }

  const compareInvoices = (uploadedInvoices: Transaction[]) => {
    const results = uploadedInvoices.map(uploaded => {
      const match = transactions.find(t => 
        t.type === (compareType === 'outwards' ? 'sales' : 'purchase') &&
        t.gstinNum === uploaded.gstinNum &&
        t.totalAmount === uploaded.totalAmount &&
        t.invoiceNum === uploaded.invoiceNum
      )
      return {
        uploaded,
        match: !!match,
      }
    })

    const matched = results.filter(r => r.match).length
    const unmatched = results.length - matched

    setComparisonResults({
      matched,
      unmatched,
      details: results,
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold">Compare Invoices</h2>
      <div className="flex space-x-2 sm:space-x-4">
        <Button onClick={() => setCompareType('outwards')} variant={compareType === 'outwards' ? 'default' : 'outline'} className="text-xs sm:text-sm">Outwards</Button>
        <Button onClick={() => setCompareType('inwards')} variant={compareType === 'inwards' ? 'default' : 'outline'} className="text-xs sm:text-sm">Inwards</Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input type="file" accept=".json" onChange={handleFileUpload} className="text-sm" />
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
                    <TableHead className="min-w-[100px]">Invoice ID</TableHead>
                    <TableHead className="min-w-[120px]">GSTIN</TableHead>
                    <TableHead className="min-w-[120px]">Total Amount</TableHead>
                    <TableHead className="min-w-[80px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonResults.details.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.uploaded.invoiceNum}</TableCell>
                      <TableCell>{result.uploaded.gstinNum}</TableCell>
                      <TableCell>₹{result.uploaded.totalAmount.toFixed(2)}</TableCell>
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

  const sidebarItems = [
    { title: "Dashboard", icon: Home },
    { title: "Billing", icon: FileText },
    { title: "Sales", icon: Weight },
    { title: "Purchases", icon: ShoppingCart },
    { title: 'Compare Invoices', icon: GitCompareArrows },
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
        case 'Compare Invoices':
          return <CompareInvoicesScreen transactions={transactions} />  
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
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <ArrowLeft
                onClick={() => setSidebarOpen(false)}
                className="h-7 w-7"
              />
              <div className="flex items-center flex-1 ml-4">
                <Avatar>
                  <AvatarImage src="https://xsgames.co/randomusers/avatar.php?g=male" />
                  {/* <AvatarImage src="https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg" /> */}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-xl md:text-2xl font-bold ml-2">
                  Siddharth
                </h1>
              </div>
            </div>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  isActive={activeItem === item.title}
                  onClick={() => handleNavigation(item.title)}
                />
              ))}
              <SidebarItem
                title="Logout"
                icon={LogOut}
                isActive={true}
                onClick={() => {
                  /* Handle logout */
                }}
              />
            </nav>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-center">
              Invoice Details
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedInvoice && (
              <ScrollArea className="max-h-[80vh]">
                <div className="space-y-4 p-4">
                  {/* Header section */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <h2 className="text-lg font-bold">Invoice</h2>
                        <p className="text-sm font-semibold">
                          {selectedInvoice.invoiceNum}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold">{selectedInvoice.type === "sales" ? "Customer GSTIN" : "Vendor GSTIN"} </p>
                        <p className="text-sm font-bold">
                          {selectedInvoice.gstinNum}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date and party name */}
                  <div className="flex justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {selectedInvoice.date}
                    </div>
                    <div>{selectedInvoice.partyName}</div>
                  </div>

                  {/* Table with description, quantity, and prices */}
                  <Table className="text-xs">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ₹{item.unitPrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            ₹{item.totalPrice.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* GST and Total breakdown */}
                  <div className="space-y-2 text-right">
                    <div className="flex justify-end items-center space-x-1">
                      <span className="text-sm font-semibold">
                        CGST {selectedInvoice.gst.cgstPercentage}%: ₹
                        {selectedInvoice.gst.cgst.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-end items-center space-x-1">
                      <span className="text-sm font-semibold">
                        SGST {selectedInvoice.gst.sgstPercentage}%: ₹
                        {selectedInvoice.gst.sgst.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-end items-center space-x-1">
                      <IndianRupee className="h-4 w-4 text-green-500" />
                      <span className="text-lg font-semibold">
                        Total: ₹{selectedInvoice.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
