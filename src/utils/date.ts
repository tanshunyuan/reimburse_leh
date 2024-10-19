export const formatDate = (timestamp: string | undefined | null) => {
  if(!timestamp) return '' 
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const year = String(date.getFullYear()).slice(2); // Get last two digits of the year
  return `${day}/${month}/${year}`;
};