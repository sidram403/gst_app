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
  IndianRupee
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
} from "@/components/ui/table"

type Transaction = {
  id: string;
  type: "sales" | "purchase";
  date: string;
  partyName: string;
  amount: number;
  gst: {
    cgst: number;
    sgst: number;
    igst: number;
  };
  description: string;
  quantity: string
};

interface MicroserviceIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
}

interface TransactionProps {
  type: "sales" | "purchase";
  date: string;
  amount: number;
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
        ₹{transaction.amount.toFixed(2)}
      </span>
      <Button variant="ghost" size="sm" onClick={() => onView(transaction)}>
        <FileText className="h-4 w-4" />
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

  const totalBilling = transactions.reduce(
    (sum: number, t: any) => sum + t.amount,
    0
  );
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
            <CardTitle className="text-sm font-medium">Total Billing</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalBilling.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
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
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground">
              +{transactions.length} new
            </p>
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

const BillingScreen = ({ onSave }: BillingScreenProps) => {
  const [entryType, setEntryType] = useState<"sales" | "purchase">("sales");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Convert FormDataEntryValue to string safely
    const getStringValue = (value: FormDataEntryValue) =>
      typeof value === "string" ? value : "";
    const CGSTAmount =  (parseFloat(getStringValue(data.amount)) % 9) / 100;
    const SGSTAmount =  (parseFloat(getStringValue(data.amount)) % 9) / 100;
    const totalAmount = parseFloat(getStringValue(data.amount)) + CGSTAmount + SGSTAmount
    

    onSave(entryType, {
      ...data,
      amount: parseFloat(getStringValue(data.amount)),
      gst: {
        cgst: parseFloat(getStringValue(data.cgst)),
        sgst: parseFloat(getStringValue(data.sgst)),
        igst: parseFloat(getStringValue(data.igst)),
      },
      description: getStringValue(data.description),
      partyName: getStringValue(data.partyName),
      date: getStringValue(data.date),
      quantity:getStringValue(data.quantity)
    } as Transaction);
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
            <Label htmlFor="amount" className="text-sm">
              Amount (before GST)
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              required
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cgst" className="text-sm">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              step="0.01"
              required
              className="text-sm"
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cgst" className="text-sm">
              CGST (%)
            </Label>
            <Input
              id="cgst"
              name="cgst"
              type="number"
              step="0.01"
              required
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sgst" className="text-sm">
              SGST (%)
            </Label>
            <Input
              id="sgst"
              name="sgst"
              type="number"
              step="0.01"
              required
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="igst" className="text-sm">
              IGST (%)
            </Label>
            <Input
              id="igst"
              name="igst"
              type="number"
              step="0.01"
              required
              className="text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm">
            Description
          </Label>
          <Textarea id="description" name="description" className="text-sm" />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          Save {entryType.charAt(0).toUpperCase() + entryType.slice(1)} Entry
        </Button>
      </form>
    </div>
  );
};

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
              <ArrowLeft onClick={() => setSidebarOpen(false)} className="h-7 w-7" />
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
            <DialogTitle className="text-lg text-center">Invoice Details</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            
            {/* {selectedInvoice && (
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Invoice ID:</strong> {selectedInvoice.id}
                </p>
                <p className="text-sm">
                  <strong>Type:</strong> {selectedInvoice.type}
                </p>
                <p className="text-sm">
                  <strong>Date:</strong> {selectedInvoice.date}
                </p>
                <p className="text-sm">
                  <strong>Party Name:</strong> {selectedInvoice.partyName}
                </p>
                <p className="text-sm">
                  <strong>Amount:</strong> ₹{selectedInvoice.amount.toFixed(2)}
                </p>
                <p className="text-sm">
                  <strong>CGST:</strong> {selectedInvoice.gst.cgst}%
                </p>
                <p className="text-sm">
                  <strong>SGST:</strong> {selectedInvoice.gst.sgst}%
                </p>
                <p className="text-sm">
                  <strong>IGST:</strong> {selectedInvoice.gst.igst}%
                </p>
                <p className="text-sm">
                  <strong>Description:</strong> {selectedInvoice.description}
                </p>
              </div>
            )} */}

{selectedInvoice && (
  <ScrollArea className="max-h-[80vh]">
    <div className="space-y-4 p-4">
      {/* Header section */}
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Invoice</h2>
            <p className="text-sm font-semibold">{selectedInvoice.id}</p>
          </div>


          <div className="text-right">
            <p className="text-sm font-semibold">Total Amount</p>
            <p className="text-xl font-bold">₹{selectedInvoice.amount.toFixed(2)}</p>
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
          <TableRow>
            <TableCell>{selectedInvoice.description}</TableCell>
            <TableCell className="text-right">1</TableCell>
            <TableCell className="text-right">₹{selectedInvoice.amount.toFixed(2)}</TableCell>
            <TableCell className="text-right">₹{selectedInvoice.amount.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* GST and Total breakdown */}
      <div className="space-y-2 text-right">
        <div className="flex justify-end items-center space-x-1">
          <IndianRupee className="h-4 w-4 text-green-500" />
          <span className="text-sm font-semibold">CGST {selectedInvoice.gst.cgst}%: ₹{selectedInvoice.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-end items-center space-x-1">
          <IndianRupee className="h-4 w-4 text-green-500" />
          <span className="text-sm font-semibold">SGST {selectedInvoice.gst.sgst}%: ₹{selectedInvoice.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-end items-center space-x-1">
          <IndianRupee className="h-4 w-4 text-green-500" />
          <span className="text-lg font-semibold">Total: ₹{selectedInvoice.amount.toFixed(2)}</span>
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
