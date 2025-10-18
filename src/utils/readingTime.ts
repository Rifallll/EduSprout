export const calculateReadingTime = (text: string, wordsPerMinute: number = 200): string => {
  if (!text) return "0 menit";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} menit baca`;
};