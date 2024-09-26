"use client"

import React, { useState } from 'react'
import { Menu, Home, FileText, MessageSquare, Calculator, Settings, LogOut, ArrowRight, DollarSign, TrendingUp, AlertCircle, CheckCircle, Cpu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface MicroserviceCardProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component
  description: string;
}

interface InvoiceItemProps {
  category: string;
  amount: string;
  date: string;
}

interface SidebarItemProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component
  isActive: boolean;
  onClick: () => void;
}

const MicroserviceCard = ({ title, icon: Icon, description } : MicroserviceCardProps) => (
  <Card className="w-full h-full">
    <CardContent className="flex flex-col items-center justify-center h-full p-4">
      <Icon className="w-8 h-8 mb-2 text-primary" />
      <h3 className="text-sm font-semibold text-center">{title}</h3>
      <p className="text-xs text-center text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
)

const InvoiceItem = ({ category, amount, date } : InvoiceItemProps) => (
  <div className="flex justify-between items-center py-2 border-b last:border-b-0">
    <div>
      <Badge variant={category === 'Sales' ? 'default' : 'secondary'}>{category}</Badge>
      <p className="text-sm mt-1">{date}</p>
    </div>
    <div className="flex items-center">
      <span className="font-semibold mr-2">₹{amount}</span>
      <Button variant="ghost" size="sm">
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
)

const SidebarItem = ({ title, icon: Icon, isActive, onClick } : SidebarItemProps) => (
  <Button
    variant="ghost"
    className={`w-full justify-start mb-2 ${isActive ? 'bg-primary/10 text-primary' : ''}`}
    onClick={onClick}
  >
    <Icon className="mr-2 h-4 w-4" />
    {title}
  </Button>
)

const DashboardContent = () => (
  <div className="grid grid-cols-2 gap-4 mb-6">
    <Card className='bg-blue-100'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Billing</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
    <Card className='bg-green-100'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Filed Returns</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">9/12</div>
        <p className="text-xs text-muted-foreground">3 pending</p>
      </CardContent>
    </Card>
    <Card className='bg-yellow-100'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+573</div>
        <p className="text-xs text-muted-foreground">+201 from last week</p>
      </CardContent>
    </Card>
    <Card className='bg-purple-100'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ITC Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹12,234.56</div>
        <p className="text-xs text-muted-foreground">Available credit</p>
      </CardContent>
    </Card>
  </div>
)

const BillingScreen = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">Billing</h2>
    <div className="flex space-x-4">
      <Button>Sales Entry</Button>
      <Button variant="outline">Purchase Entry</Button>
    </div>
    {/* Add your billing form or component here */}
  </div>
)

const AIBotScreen = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">AI Assistant</h2>
    <div className="grid grid-cols-2 gap-4">
      <Button>GST Filing Help</Button>
      <Button>Invoice Query</Button>
      <Button>Tax Calculation</Button>
      <Button>Compliance Check</Button>
    </div>
    <div className="border rounded-lg p-4 h-64 overflow-y-auto">
      {/* Chat messages would go here */}
    </div>
    <div className="flex space-x-2">
      <Input placeholder="Type your message..." className="flex-grow" />
      <Button>Send</Button>
    </div>
  </div>
)

const GSTDashboardScreen = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">GST Dashboard</h2>
    <Input placeholder="Search GSTIN" />
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Company Name</CardTitle>
        </CardHeader>
        <CardContent>XYZ Enterprises Pvt Ltd</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>GSTIN Status</CardTitle>
        </CardHeader>
        <CardContent>Active</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Registration Date</CardTitle>
        </CardHeader>
        <CardContent>01/04/2019</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Business Type</CardTitle>
        </CardHeader>
        <CardContent>Private Limited Company</CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>GST Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input placeholder="Enter amount" type="number" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="GST Rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5%</SelectItem>
              <SelectItem value="12">12%</SelectItem>
              <SelectItem value="18">18%</SelectItem>
              <SelectItem value="28">28%</SelectItem>
            </SelectContent>
          </Select>
          <Button>Calculate</Button>
        </div>
        {/* Result would be displayed here */}
      </CardContent>
    </Card>
  </div>
)

const SettingsScreen = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">Settings</h2>
    {/* Add settings options here */}
  </div>
)

export default function EnhancedFinancialApp() {
  const [activeItem, setActiveItem] = useState('Dashboard')

  const sidebarItems = [
    { title: 'Dashboard', icon: Home },
    { title: 'Billing', icon: FileText },
    { title: 'AI Bot', icon: MessageSquare },
    { title: 'GST Dashboard', icon: Calculator },
    { title: 'Settings', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return (
          <>
            <DashboardContent />
            <div className="grid grid-cols-2 gap-4 mb-6">
              <MicroserviceCard
                title="GST Verification"
                icon={CheckCircle}
                description="Verify GST numbers"
              />
              <MicroserviceCard
                title="GST Calculator"
                icon={Calculator}
                description="Calculate GST easily"
              />
              <MicroserviceCard
                title="Invoice Creation"
                icon={FileText}
                description="Create invoices quickly"
              />
              <MicroserviceCard
                title="AI Assistant"
                icon={Cpu}
                description="Get intelligent help"
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px]">
                  <InvoiceItem category="Sales" amount="1,234.56" date="2023-09-15" />
                  <InvoiceItem category="Purchase" amount="987.65" date="2023-09-14" />
                  <InvoiceItem category="Sales" amount="2,345.67" date="2023-09-13" />
                  <InvoiceItem category="Sales" amount="876.54" date="2023-09-12" />
                  <InvoiceItem category="Purchase" amount="1,543.21" date="2023-09-11" />
                  {/* Add more invoice items here */}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Important Notices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-orange-500">
                  <AlertCircle className="h-4 w-4" />
                  <p>GST filing deadline: 20th September 2023</p>
                </div>
                <div className="flex items-center space-x-2 text-green-500 mt-2">
                  <CheckCircle className="h-4 w-4" />
                  <p>New invoice generated: INV-2023-09-15-001</p>
                </div>
              </CardContent>
            </Card>
          </>
        )
      case 'Billing':
        return <BillingScreen />
      case 'AI Bot':
        return <AIBotScreen />
      case 'GST Dashboard':
        return <GSTDashboardScreen />
      case 'Settings':
        return <SettingsScreen />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FinApp</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-2">
                {sidebarItems.map((item) => (
                  <SidebarItem
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    isActive={activeItem === item.title}
                    onClick={() => setActiveItem(item.title)}
                  />
                ))}
                <SidebarItem title="Logout" icon={LogOut} isActive={true} onClick={() => {/* Handle logout */}} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  )
}