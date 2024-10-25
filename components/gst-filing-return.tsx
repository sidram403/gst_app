import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload, FileText, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, Download, Edit, Eye } from 'lucide-react'
import * as XLSX from 'xlsx'

interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  gstin: string;
  partyName: string;
  invoiceValue: number;
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
}

interface GSTData {
  salesInvoices: Invoice[];
  purchaseInvoices: Invoice[];
}

const GSTFilingProcess: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [step, setStep] = useState(1);
  const [gstData, setGSTData] = useState<GSTData>({
    salesInvoices: [],
    purchaseInvoices: []
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [gstr2aData, setGSTR2AData] = useState<Invoice[]>([]);
  const [matchedInvoices, setMatchedInvoices] = useState<Invoice[]>([]);
  const [unmatchedInvoices, setUnmatchedInvoices] = useState<Invoice[]>([]);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'sales' | 'purchase' | 'gstr2a') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Invoice[];
        if (type === 'gstr2a') {
          setGSTR2AData(jsonData);
          reconcileInvoices(jsonData);
        } else {
          setGSTData(prevData => ({
            ...prevData,
            [type === 'sales' ? 'salesInvoices' : 'purchaseInvoices']: jsonData
          }));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const validateData = () => {
    const newErrors: string[] = [];
    gstData.salesInvoices.forEach((invoice, index) => {
      if (!invoice.invoiceNumber) newErrors.push(`Sales Invoice ${index + 1}: Missing invoice number`);
      if (!invoice.invoiceDate) newErrors.push(`Sales Invoice ${index + 1}: Missing invoice date`);
      if (!invoice.gstin) newErrors.push(`Sales Invoice ${index + 1}: Missing GSTIN`);
      if (invoice.taxableValue <= 0) newErrors.push(`Sales Invoice ${index + 1}: Invalid taxable value`);
    });
    gstData.purchaseInvoices.forEach((invoice, index) => {
      if (!invoice.invoiceNumber) newErrors.push(`Purchase Invoice ${index + 1}: Missing invoice number`);
      if (!invoice.invoiceDate) newErrors.push(`Purchase Invoice ${index + 1}: Missing invoice date`);
      if (!invoice.gstin) newErrors.push(`Purchase Invoice ${index + 1}: Missing GSTIN`);
      if (invoice.taxableValue <= 0) newErrors.push(`Purchase Invoice ${index + 1}: Invalid taxable value`);
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const reconcileInvoices = (gstr2aData: Invoice[]) => {
    const matched: Invoice[] = [];
    const unmatched: Invoice[] = [];

    gstData.purchaseInvoices.forEach(purchaseInvoice => {
      const matchingGSTR2AInvoice = gstr2aData.find(
        gstr2aInvoice => gstr2aInvoice.invoiceNumber === purchaseInvoice.invoiceNumber &&
                         gstr2aInvoice.gstin === purchaseInvoice.gstin
      );

      if (matchingGSTR2AInvoice && matchingGSTR2AInvoice.invoiceValue === purchaseInvoice.invoiceValue) {
        matched.push(purchaseInvoice);
      } else {
        unmatched.push(purchaseInvoice);
      }
    });

    setMatchedInvoices(matched);
    setUnmatchedInvoices(unmatched);
  };

  const downloadSummary = () => {
    const summaryData = {
      totalSalesInvoices: gstData.salesInvoices.length,
      totalPurchaseInvoices: gstData.purchaseInvoices.length,
      totalSalesValue: gstData.salesInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0),
      totalPurchaseValue: gstData.purchaseInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0),
      matchedInvoices: matchedInvoices.length,
      unmatchedInvoices: unmatchedInvoices.length
    };

    const worksheet = XLSX.utils.json_to_sheet([summaryData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
    XLSX.writeFile(workbook, "GST_Filing_Summary.xlsx");
  };

  const submitReturns = () => {
    alert("GST Returns submitted successfully!");
    setStep(1);
    setGSTData({ salesInvoices: [], purchaseInvoices: [] });
    setErrors([]);
    setGSTR2AData([]);
    setMatchedInvoices([]);
    setUnmatchedInvoices([]);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice({ ...invoice });
  };

  const handleSaveEdit = () => {
    if (editingInvoice) {
      const updatedUnmatched = unmatchedInvoices.map(inv => 
        inv.invoiceNumber === editingInvoice.invoiceNumber ? editingInvoice : inv
      );
      setUnmatchedInvoices(updatedUnmatched);
      setEditingInvoice(null);
      reconcileInvoices(gstr2aData);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Step 1: Import Data</CardTitle>
              <CardDescription>Upload your sales and purchase invoice data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sales-upload">Sales Invoices</Label>
                <Input
                  id="sales-upload"
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'sales')}
                  accept=".xlsx,.xls,.csv"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchase-upload">Purchase Invoices</Label>
                <Input
                  id="purchase-upload"
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'purchase')}
                  accept=".xlsx,.xls,.csv"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(2)} disabled={gstData.salesInvoices.length === 0 || gstData.purchaseInvoices.length === 0}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 2:
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Step 2: Review and Verify Data</CardTitle>
              <CardDescription>Check the imported data for accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sales">
                <TabsList>
                  <TabsTrigger value="sales">Sales Invoices</TabsTrigger>
                  <TabsTrigger value="purchase">Purchase Invoices</TabsTrigger>
                </TabsList>
                <TabsContent value="sales">
                  <ScrollArea className="h-[300px] w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice Number</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>GSTIN</TableHead>
                          <TableHead>Party Name</TableHead>
                          <TableHead>Invoice Value</TableHead>
                          <TableHead>Taxable Value</TableHead>
                          <TableHead>CGST</TableHead>
                          <TableHead>SGST</TableHead>
                          <TableHead>IGST</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {gstData.salesInvoices.map((invoice, index) => (
                          <TableRow key={index}>
                            <TableCell>{invoice.invoiceNumber}</TableCell>
                            <TableCell>{invoice.invoiceDate}</TableCell>
                            <TableCell>{invoice.gstin}</TableCell>
                            <TableCell>{invoice.partyName}</TableCell>
                            <TableCell>{invoice.invoiceValue.toFixed(2)}</TableCell>
                            <TableCell>{invoice.taxableValue.toFixed(2)}</TableCell>
                            <TableCell>{invoice.cgst.toFixed(2)}</TableCell>
                            <TableCell>{invoice.sgst.toFixed(2)}</TableCell>
                            <TableCell>{invoice.igst.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="purchase">
                  <ScrollArea className="h-[300px] w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice Number</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>GSTIN</TableHead>
                          <TableHead>Party Name</TableHead>
                          <TableHead>Invoice Value</TableHead>
                          <TableHead>Taxable Value</TableHead>
                          <TableHead>CGST</TableHead>
                          <TableHead>SGST</TableHead>
                          <TableHead>IGST</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {gstData.purchaseInvoices.map((invoice, index) => (
                          <TableRow key={index}>
                            <TableCell>{invoice.invoiceNumber}</TableCell>
                            <TableCell>{invoice.invoiceDate}</TableCell>
                            <TableCell>{invoice.gstin}</TableCell>
                            <TableCell>{invoice.partyName}</TableCell>
                            <TableCell>{invoice.invoiceValue.toFixed(2)}</TableCell>
                            <TableCell>{invoice.taxableValue.toFixed(2)}</TableCell>
                            <TableCell>{invoice.cgst.toFixed(2)}</TableCell>
                            <TableCell>{invoice.sgst.toFixed(2)}</TableCell>
                            <TableCell>{invoice.igst.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </TabsContent>
              </Tabs>
              {errors.length > 0 && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Errors Found</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={() => {
                if (validateData()) {
                  setStep(3);
                }
              }}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 3:
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Step 3: Reconcile with GSTR-2A</CardTitle>
              <CardDescription>Upload GSTR-2A data and compare with your purchase data</CardDescription>
            </CardHeader>
            <CardContent>
              {gstr2aData.length === 0 ? (
                <div className="space-y-4">
                  <Label htmlFor="gstr2a-upload">Upload GSTR-2A Data</Label>
                  <Input
                    id="gstr2a-upload"
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'gstr2a')}
                    accept=".xlsx,.xls,.csv"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  
                  <Progress value={(matchedInvoices.length / gstData.purchaseInvoices.length) * 100} className="w-full" />
                  <p>Matched Invoices: {matchedInvoices.length}</p>
                  <p>Unmatched Invoices: {unmatchedInvoices.length}</p>
                  <ScrollArea className="h-[300px] w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice Number</TableHead>
                          <TableHead>GSTIN</TableHead>
                          <TableHead>Your Value</TableHead>
                          <TableHead>GSTR-2A Value</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {gstData.purchaseInvoices.map((invoice, index) => {
                          const gstr2aInvoice = gstr2aData.find(i => i.invoiceNumber === invoice.invoiceNumber && i.gstin === invoice.gstin);
                          const isMatched = gstr2aInvoice && gstr2aInvoice.invoiceValue === invoice.invoiceValue;
                          return (
                            <TableRow key={index} className={isMatched ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}>
                              <TableCell>{invoice.invoiceNumber}</TableCell>
                              <TableCell>{invoice.gstin}</TableCell>
                              <TableCell>{invoice.invoiceValue.toFixed(2)}</TableCell>
                              <TableCell>{gstr2aInvoice ? gstr2aInvoice.invoiceValue.toFixed(2) : 'Not Found'}</TableCell>
                              <TableCell>{isMatched ? 'Matched' : 'Unmatched'}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={() => setStep(4)} disabled={gstr2aData.length === 0}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 4:
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Step 4: Resolve Discrepancies</CardTitle>
              <CardDescription>Address any mismatches found during reconciliation</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice Number</TableHead>
                      <TableHead>GSTIN</TableHead>
                      <TableHead>Your Value</TableHead>
                      <TableHead>GSTR-2A Value</TableHead>
                      <TableHead>Difference</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unmatchedInvoices.map((invoice, index) => {
                      const gstr2aInvoice = gstr2aData.find(i => i.invoiceNumber === invoice.invoiceNumber && i.gstin === invoice.gstin);
                      const difference = gstr2aInvoice ? invoice.invoiceValue - gstr2aInvoice.invoiceValue : invoice.invoiceValue;
                      return (
                        <TableRow key={index} className="bg-yellow-100 dark:bg-yellow-900">
                          <TableCell>{invoice.invoiceNumber}</TableCell>
                          <TableCell>{invoice.gstin}</TableCell>
                          <TableCell>{invoice.invoiceValue.toFixed(2)}</TableCell>
                          <TableCell>{gstr2aInvoice ? gstr2aInvoice.invoiceValue.toFixed(2) : 'Not Found'}</TableCell>
                          <TableCell>{difference.toFixed(2)}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="mr-2">
                                  <Edit className="w-4 h-4 mr-1" /> Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Invoice</DialogTitle>
                                  <DialogDescription>Make changes to the invoice details</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="invoiceNumber" className="text-right">Invoice Number</Label>
                                    <Input
                                      id="invoiceNumber"
                                      value={editingInvoice?.invoiceNumber || ''}
                                      onChange={(e) => setEditingInvoice(prev => ({ ...prev!, invoiceNumber: e.target.value }))}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="invoiceValue" className="text-right">Invoice Value</Label>
                                    <Input
                                      id="invoiceValue"
                                      type="number"
                                      value={editingInvoice?.invoiceValue || 0}
                                      onChange={(e) => setEditingInvoice(prev => ({ ...prev!, invoiceValue: parseFloat(e.target.value) }))}
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={handleSaveEdit}>Save changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-1" /> View
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>View Invoice Details</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-bold">Invoice Number:</Label>
                                    <span className="col-span-3">{invoice.invoiceNumber}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-bold">GSTIN:</Label>
                                    <span className="col-span-3">{invoice.gstin}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-bold">Invoice Value:</Label>
                                    <span className="col-span-3">{invoice.invoiceValue.toFixed(2)}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-bold">GSTR-2A Value:</Label>
                                    <span className="col-span-3">{gstr2aInvoice ? gstr2aInvoice.invoiceValue.toFixed(2) : 'Not Found'}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right font-bold">Difference:</Label>
                                    <span className="col-span-3">{difference.toFixed(2)}</span>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={() => setStep(5)}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 5:
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Step 5: Final Review and Submission</CardTitle>
              <CardDescription>Review your GST returns before submission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Summary</h3>
                <p>Total Sales Invoices: {gstData.salesInvoices.length}</p>
                <p>Total Purchase Invoices: {gstData.purchaseInvoices.length}</p>
                <p>Matched Invoices: {matchedInvoices.length}</p>
                <p>Unmatched Invoices: {unmatchedInvoices.length}</p>
                <p>Total Sales Value: ₹{gstData.salesInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0).toFixed(2)}</p>
                <p>Total Purchase Value: ₹{gstData.purchaseInvoices.reduce((sum, invoice) => sum + invoice.invoiceValue, 0).toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button variant="outline" onClick={() => setStep(4)} className="w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button variant="outline" onClick={downloadSummary} className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" /> Download Summary
                </Button>
                <Button onClick={submitReturns} className="w-full sm:w-auto">
                  <CheckCircle className="mr-2 h-4 w-4" /> Submit Returns
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 ${darkMode ? 'dark' : ''}`}>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">GST Filing Process</h1>
      <div className="flex items-center mb-8 overflow-x-auto">
        {[1, 2, 3, 4, 5].map((s) => (
          <React.Fragment key={s}>
            <div 
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                s === step ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {s}
            </div>
            {s < 5 && <div className="flex-grow h-1 bg-gray-200 dark:bg-gray-700 mx-2" />}
          </React.Fragment>
        ))}
      </div>
      {renderStep()}
    </div>
  );
};

export default GSTFilingProcess;