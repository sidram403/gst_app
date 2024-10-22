import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileCheck, CalendarIcon, AlertTriangle, Info } from 'lucide-react'

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Alert className="mb-4">
    <Info className="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{children}</AlertDescription>
  </Alert>
)

const GSTFilingGuide: React.FC = () => {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">GST Filing Guide</h2>
          <p className="text-sm text-muted-foreground mt-1">
            A comprehensive guide to GST filing for businesses in India
          </p>
        </div>
        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="gstr1">
              <AccordionTrigger>
                <div className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5 text-green-500" />
                  GSTR-1 Guide
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm">GSTR-1 is a monthly return that is required to be filed by all registered taxpayers. It is used to report outward supplies of goods and services made during the month.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Outward Supplies:</strong> The return captures the details of all sales made by the taxpayer, including the invoice number, date, value, and GST rate.</li>
                  <li><strong>B2B Supplies:</strong> For business-to-business supplies, the recipient's GSTIN is also recorded.</li>
                  <li><strong>B2C Supplies:</strong> For business-to-consumer supplies, the HSN code and place of supply are reported.</li>
                  <li><strong>Export Supplies:</strong> Exports are declared in a separate section of the return.</li>
                </ul>
                <InfoCard title="Important Note">
                  Ensure accuracy in reporting all outward supplies to avoid discrepancies and potential penalties.
                </InfoCard>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gstr3b">
              <AccordionTrigger>
                <div className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5 text-blue-500" />
                  GSTR-3B Guide
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm">GSTR-3B is a simplified return that can be filed by taxpayers with a monthly turnover of up to Rs. 5 crores. It is a monthly return that provides a summary of the taxpayer's outward supplies, inward supplies, and the GST payable or refundable.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Summary of Supplies:</strong> The return includes the total value of outward supplies, inward supplies, and the input tax credit (ITC) claimed.</li>
                  <li><strong>GST Payable/Refundable:</strong> The net GST liability or refund is calculated based on the information provided in the return.</li>
                  <li><strong>Simplified Filing:</strong> GSTR-3B is a relatively simpler return compared to GSTR-1, making it easier for small taxpayers to file.</li>
                </ul>
                <InfoCard title="Pro Tip">
                  Regularly reconcile your GSTR-1 and GSTR-3B to ensure consistency in reporting and avoid discrepancies.
                </InfoCard>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="calendar">
              <AccordionTrigger>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-purple-500" />
                  Filing Calendar
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm">The due date for filing GSTR-1 and GSTR-3B depends on the last digit of the taxpayer's GSTIN. Generally, the due date is the 20th of the following month. However, there are specific due dates for quarterly filers and taxpayers with a turnover of less than Rs. 1.5 crores.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Monthly Filers:</strong> Most taxpayers are required to file GSTR-1 and GSTR-3B on a monthly basis.</li>
                  <li><strong>Quarterly Filers:</strong> Taxpayers with a monthly turnover between Rs. 1.5 crores and Rs. 5 crores can file GSTR-1 quarterly and GSTR-3B monthly.</li>
                  <li><strong>Annual Filers:</strong> Taxpayers with a monthly turnover of less than Rs. 1.5 crores can file GSTR-1 and GSTR-3B annually.</li>
                </ul>
                <InfoCard title="Stay Organized">
                  Set reminders for your filing due dates to ensure timely compliance and avoid penalties.
                </InfoCard>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="penalties">
              <AccordionTrigger>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                  Late Filing Penalties
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm">If a taxpayer fails to file GSTR-1 or GSTR-3B on time, they will be subject to late filing penalties. The penalty amount varies depending on the delay and the nature of the return.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Late Filing Fee:</strong> A fixed late filing fee is applicable for both GSTR-1 and GSTR-3B.</li>
                  <li><strong>Interest on Late Payment:</strong> If the GST payable is not paid on time, interest will be charged on the outstanding amount.</li>
                </ul>
                <InfoCard title="Avoid Penalties">
                  File your returns on time to avoid unnecessary penalties and interest charges.
                </InfoCard>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="other">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-indigo-500" />
                  Other Important Information
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Amendments:</strong> Taxpayers can amend their returns if they find any errors or omissions.</li>
                  <li><strong>Matching:</strong> The GST system matches the outward supplies declared by one taxpayer with the inward supplies reported by another taxpayer.</li>
                  <li><strong>Audit:</strong> Taxpayers may be selected for audit by the GST authorities to verify the accuracy of their returns.</li>
                </ul>
                <InfoCard title="Stay Compliant">
                  Regularly review your GST filings and maintain accurate records to ensure compliance with GST regulations.
                </InfoCard>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline">GST Filing</Badge>
            <Badge variant="outline">GSTR-1</Badge>
            <Badge variant="outline">GSTR-3B</Badge>
            <Badge variant="outline">Tax Compliance</Badge>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default GSTFilingGuide