import { format, parseISO, getUnixTime, fromUnixTime } from "date-fns";

export const yyyyMmToEpoch = (yyyyMm: string): number => {
  console.log('yyyyMmToEpoch input:', yyyyMm, typeof yyyyMm);
  
  if (!yyyyMm || typeof yyyyMm !== 'string') {
    throw new Error("Invalid input: Expected string in YYYY-MM format");
  }
  
  if (!yyyyMm.match(/^\d{4}-\d{2}$/)) {
    throw new Error("Invalid date format. Expected YYYY-MM");
  }

  try {
    // Parse as first day of the month
    const dateString = `${yyyyMm}-01`;
    console.log('Parsing date string:', dateString);
    
    const date = parseISO(dateString);
    console.log('Parsed date object:', date);
    
    const epoch = getUnixTime(date);
    console.log('Unix time (seconds):', epoch, typeof epoch);
    
    return epoch;
  } catch (error) {
    console.error('Error in yyyyMmToEpoch:', error);
    throw new Error(`Failed to convert ${yyyyMm} to epoch: ${error?.toString()}`);
  }
};

export const epochToYyyyMm = (epoch: number): string => {
  console.log('epochToYyyyMm input:', epoch, typeof epoch);
  
  if (typeof epoch !== 'number' || isNaN(epoch)) {
    throw new Error("Invalid input: Expected number (Unix timestamp)");
  }
  
  try {
    const date = fromUnixTime(epoch);
    console.log('Converted to date:', date);
    
    const result = format(date, "yyyy-MM");
    console.log('Formatted result:', result);
    
    return result;
  } catch (error) {
    console.error('Error in epochToYyyyMm:', error);
    throw new Error(`Failed to convert epoch ${epoch} to YYYY-MM: ${error?.toString()}`);
  }
};

export const yyyyMmToReadable = (yyyyMm: string): string => {
  if (!yyyyMm) return "";

  try {
    const date = parseISO(`${yyyyMm}-01`);
    return format(date, "MMMM yyyy");
  } catch (error) {
    console.error('Error in yyyyMmToReadable:', error);
    return yyyyMm; // Return original if formatting fails
  }
};

export const epochToReadable = (epoch: number): string => {
  if (typeof epoch !== 'number' || isNaN(epoch)) {
    return "Invalid date";
  }
  
  try {
    const date = fromUnixTime(epoch);
    return format(date, "MMMM yyyy");
  } catch (error) {
    console.error('Error in epochToReadable:', error);
    return "Invalid date";
  }
};

export const isValidYyyyMm = (yyyyMm: string): boolean => {
  if (!yyyyMm || typeof yyyyMm !== 'string') return false;

  const regex = /^\d{4}-\d{2}$/;
  if (!regex.test(yyyyMm)) return false;

  const [year, month] = yyyyMm.split("-").map(Number);
  if (
    typeof year !== "number" ||
    typeof month !== "number" ||
    isNaN(year) ||
    isNaN(month)
  ) {
    return false;
  }
  return year >= 1900 && year <= 2100 && month >= 1 && month <= 12;
};