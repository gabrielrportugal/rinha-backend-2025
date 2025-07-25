/**
 * Data Transfer Object containing payment summary statistics
 *
 * @class PaymentsData
 * @property {number} totalRequests - The total number of payment requests
 * @property {number} totalAmount - The sum of all payment amounts
 *
 * @param {number} totalRequests - The total number of payment requests
 * @param {number} totalAmount - The sum of all payment amounts
 */
export class PaymentsData {
  totalRequests: number;
  totalAmount: number;

  constructor(totalRequests: number, totalAmount: number) {
    this.totalRequests = totalRequests;
    this.totalAmount = totalAmount;
    // cast to two decimal places
    this.totalAmount = Math.round(this.totalAmount * 100) / 100;
  }
}

/**
 * Data Transfer Object for payments summary response
 *
 * @class PaymentsSummaryResponseDto
 * @property {PaymentsData} default - Summary data for default payment source
 * @property {PaymentsData} fallback - Summary data for fallback payment source
 *
 * @param {PaymentsData} d - The default payment source data
 * @param {PaymentsData} fb - The fallback payment source data
 */
export class PaymentsSummaryResponseDto {
  default: PaymentsData;
  fallback: PaymentsData;

  constructor(d: PaymentsData, fb: PaymentsData) {
    this.fallback = fb;
    this.default = d;
  }
}
