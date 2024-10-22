import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, FileText, AlertTriangle, Info } from 'lucide-react'

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Alert className="my-4">
    <Info className="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{children}</AlertDescription>
  </Alert>
)

const GSTRegistrationGuide: React.FC = () => {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
     <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">GST Registration Guide</h2>
          <p className="text-sm text-muted-foreground mt-1">
            A comprehensive guide to GST registration for businesses in India
          </p>
        </div>
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            GST registration is a mandatory process for businesses in India that exceed a certain turnover threshold or deal in specific types of goods and services. The registration process involves providing information about your business and verifying your eligibility.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="eligibility">
              <AccordionTrigger>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Eligibility Criteria
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Annual Turnover:</strong> If your annual turnover exceeds Rs. 40 lakhs for most businesses, you are generally required to register.</li>
                  <li><strong>Nature of Business:</strong> Certain businesses, regardless of turnover, are mandated to register, such as those involved in inter-state supply of goods or services, public finance, and certain types of manufacturing.</li>
                  <li><strong>Composition Scheme:</strong> If your business meets the eligibility criteria, you can opt for the composition scheme, which has lower GST rates and simplified compliance requirements.</li>
                </ul>
                <InfoCard title="Important Note">
                  Carefully assess your business type and turnover to determine if you need to register for GST. Failing to register when required can lead to penalties.
                </InfoCard>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="documents">
              <AccordionTrigger>
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-500" />
                  Required Documents
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>PAN Card:</strong> The Permanent Account Number of your business or proprietor.</li>
                  <li><strong>Address Proof:</strong> Documents such as electricity bill, rent agreement, or property tax receipt.</li>
                  <li><strong>Bank Account Details:</strong> Information about your business's bank account.</li>
                  <li><strong>Constitution of Business:</strong> Documents like partnership deed, memorandum of association, or articles of association, depending on the nature of your business.</li>
                  <li><strong>Authorized Signatory Details:</strong> Information about the person authorized to sign the GST application.</li>
                  <li><strong>NOC (No Objection Certificate):</strong> If your business is a branch or unit of a parent company, an NOC from the parent company might be required.</li>
                </ul>
                <InfoCard title="Pro Tip">
                  Gather all required documents before starting the registration process to ensure a smooth and quick application.
                </InfoCard>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mistakes">
              <AccordionTrigger>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                  Common Mistakes
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Incorrect Information:</strong> Ensure that all the information provided in the application is accurate and up-to-date.</li>
                  <li><strong>Missing Documents:</strong> Make sure you have all the required documents ready before starting the registration process.</li>
                  <li><strong>Delayed Registration:</strong> Registering late can lead to penalties and interest charges.</li>
                  <li><strong>Ineligible Composition Scheme:</strong> Ensure that your business meets the eligibility criteria for the composition scheme before opting for it.</li>
                </ul>
                <InfoCard title="Avoid Penalties">
                  Double-check all information and documents before submission to avoid delays and potential penalties.
                </InfoCard>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="other">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-purple-500" />
                  Other Important Information
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Online Registration:</strong> The GST registration process is primarily conducted online through the official GST portal.</li>
                  <li><strong>Temporary Reference Number (TRN):</strong> Upon submission of the application, you will receive a TRN, which can be used for transactions until the final registration certificate is issued.</li>
                  <li><strong>Registration Certificate:</strong> Once your application is approved, you will receive a registration certificate, which contains your GSTIN.</li>
                  <li><strong>Amendment and Cancellation:</strong> If your business details change or if you cease operations, you can amend or cancel your registration.</li>
                </ul>
                <InfoCard title="Stay Updated">
                  Regularly check the official GST portal for any updates or changes in the registration process or requirements.
                </InfoCard>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline">GST Registration</Badge>
            <Badge variant="outline">Business Compliance</Badge>
            <Badge variant="outline">Tax Regulations</Badge>
            <Badge variant="outline">Indian Taxation</Badge>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default GSTRegistrationGuide