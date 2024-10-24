export type InvoiceItems = {
    description: string;
    quantity: string;
    unitPrice: number;
    totalPrice: number;
    gstPercentage: number;
  
  };
  
export  type Transaction = {
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
  
// export interface MicroserviceIconProps {
//     icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//     title: string;
//   }
  
  export  interface TransactionProps extends Omit<Transaction, "id" | "type"> {
    id: string;
    type: "sales" | "purchase";
    date: string;
    totalAmount: number;
  }
  
  export  interface InvoiceCreatedItemProps {
    transaction: TransactionProps;
    onView: (transaction: TransactionProps) => void;
    onSelect: (id: string) => void;
    isSelected: boolean;
  }
  
  export interface InvoiceItemProps {
    transaction: TransactionProps;
    onView: (transaction: TransactionProps) => void;
  }
  
  export interface SidebarItemProps {
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    isActive: boolean;
    onClick: () => void;
  }
  
  export type BillingScreenProps = {
    onSave: (
      type: "sales" | "purchase",
      data: Omit<Transaction, "id" | "type">
    ) => void;
  };
  
  export interface TransactionListProps {
    transactions: TransactionProps[];
    type: string;
    onViewInvoice: (transaction: TransactionProps) => void;
  }
  
  export interface TransactionForCompare {
    transactions: TransactionProps[];
  }
  
  export  type GstReturnsType = {
    totalTaxableValue: string;
    totalCGST: string;
    totalSGST: string;
    totalIGST: string;
    b2bInvoices: string[];
    b2cInvoices: string[];
  };
  
  export type ITCEntry = {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    invoiceNumber: string;
  };
  
  export type ITCEntryDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (entry: ITCEntry | Omit<ITCEntry, "id">) => void;
    title: string;
    initialData?: ITCEntry | null;
  };

export  interface DashboardCardProps {
    title: string
    amount: string
    icon: React.ReactNode
    description: string
    trend?: string
    colorScheme: 'blue' | 'green' | 'purple' | 'orange'
  }

export  interface MicroserviceIconProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    title: string
    color: string
  }
  
export  interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    activeItem: string
    handleNavigation: (item: string) => void
  }  
  