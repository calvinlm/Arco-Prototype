// Currency conversion utilities
export const EXCHANGE_RATES = {
  USD_TO_PHP: 56.5, // Approximate exchange rate
}

export function convertUSDToPHP(usdAmount: number): number {
  return usdAmount * EXCHANGE_RATES.USD_TO_PHP
}

export function formatPHP(amount: number): string {
  return `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatCurrency(amount: number, currency = "php"): string {
  switch (currency.toLowerCase()) {
    case "php":
      return formatPHP(amount)
    case "usd":
      return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    case "eur":
      return `€${amount.toLocaleString("en-EU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    case "gbp":
      return `£${amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    case "sgd":
      return `S$${amount.toLocaleString("en-SG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    default:
      return formatPHP(amount)
  }
}
