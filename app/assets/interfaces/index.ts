export interface Wallet {
    balance: number,
    total_payout: number,
    total_revenue: number,
    pending_payout: number,
    ledger_balance: number
  }

  export interface Transaction {
    amount: number,
    metadata: Metadata,
    payment_reference: string
    status: string,
    type: string,
    date: string
  }

  export interface Metadata {
    name: string,
    type: string,
    email: string,
    quantity: number,
    country: string,
    product_name: string,
  }