export interface TotalAmountPerVatRate {
  readonly vat_5: number;
  readonly vat_8: number;
  readonly reduced_vat_8: number;
  readonly vat_10: number;
}

export const isTotalAmountPerVatRate = (
  arg: any
): arg is TotalAmountPerVatRate => {
  if (arg === undefined || arg === null) return false;
  if (
    'vat_5' in arg &&
    'vat_8' in arg &&
    'reduced_vat_8' in arg &&
    'vat_10' in arg
  ) {
    return true;
  }
  return false;
};

export const TotalAmountPerVatRate = (
  vat_5: number,
  vat_8: number,
  reduced_vat_8: number,
  vat_10: number
) => ({
  vat_5,
  vat_8,
  reduced_vat_8,
  vat_10,
});
