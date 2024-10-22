import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calculator, BookOpen, ClipboardList, FileCheck, HelpCircle, Truck, Hash, ChevronDown } from 'lucide-react'
import GSTRegistrationGuide from './gst-registration-guide'
import GSTFilingGuide from './gst-filing-guide'


// Learning Center Components
const GSTBasics = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">GST Basics</h2>
    <p>Goods and Services Tax (GST) is an indirect tax levied on the supply of goods and services. It's a comprehensive, multi-stage, destination-based tax:</p>
    {/* Add more information about GST basics */}
  </div>
)

const InputTaxCredit = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Input Tax Credit</h2>
    <p>Input Tax Credit (ITC) is the credit manufacturers receive for paying input taxes towards inputs used in the manufacture of products or while availing services.</p>
    {/* Add more information about ITC */}
  </div>
)

const EwayBills = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">E-way Bills</h2>
    <p>An e-way bill is an electronic document generated on the GST portal evidencing movement of goods. It's required for:</p>
    {/* Add more information about e-way bills */}
  </div>
)

const HSNSACCodes = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">HSN/SAC Codes</h2>
    <p>HSN (Harmonized System of Nomenclature) codes are used for goods, while SAC (Services Accounting Code) is used for services. These codes are used to classify goods and services under GST.</p>
    {/* Add more information about HSN/SAC codes */}
  </div>
)

const resources = [
  {
    category: "Registration",
    icon: <FileText className="h-5 w-5" />,
    items: [
      { title: "GST Registration Guide", icon: <ClipboardList className="h-4 w-4" />, component: <GSTRegistrationGuide /> },
      
    ],
  },
  {
    category: "Filing",
    icon: <Calculator className="h-5 w-5" />,
    items: [
      { title: "GST Filing Guide", icon: <FileCheck className="h-4 w-4" />, component: <GSTFilingGuide /> }
    ],
  },
  {
    category: "Learning Center",
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      { title: "GST Basics", icon: <HelpCircle className="h-4 w-4" />, component: <GSTBasics /> },
      { title: "Input Tax Credit", icon: <HelpCircle className="h-4 w-4" />, component: <InputTaxCredit /> },
      { title: "E-way Bills", icon: <Truck className="h-4 w-4" />, component: <EwayBills /> },
      { title: "HSN/SAC Codes", icon: <Hash className="h-4 w-4" />, component: <HSNSACCodes /> },
    ],
  },
]

export const GSTResources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(resources[0].category)
  const [activeItem, setActiveItem] = useState(resources[0].items[0].title)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setActiveItem(resources.find(r => r.category === category)?.items[0].title || '')
  }

  const handleItemChange = (item: string) => {
    setActiveItem(item)
  }

  const activeResource = resources.find(r => r.category === activeCategory)?.items.find(i => i.title === activeItem)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>GST Resources</CardTitle>
        <CardDescription>Access helpful guides and information about GST</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {resources.map((resource) => (
              <TabsTrigger key={resource.category} value={resource.category} className="flex items-center">
                {resource.icon}
                <span className="ml-2 hidden sm:inline">{resource.category}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {resources.map((resource) => (
            <TabsContent key={resource.category} value={resource.category} className="mt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                  {/* <ScrollArea className="h-[60vh] rounded-md border p-4"> */}
                    {activeResource?.component}
                  {/* </ScrollArea> */}
                </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}