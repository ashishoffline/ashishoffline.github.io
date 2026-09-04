/**
 * Shared utility functions across all pages and tools
 */

/**
 * Format a number as Indian Rupee (INR) currency: e.g. 15000 -> "₹15,000"
 */
export function formatINR(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format a number with commas according to Indian numbering system: e.g. 100000 -> "1,00,000"
 */
export function formatIndianNumber(value: number): string {
    return new Intl.NumberFormat('en-IN').format(value);
}

