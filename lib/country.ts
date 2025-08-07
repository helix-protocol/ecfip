// Country mapping for flag and name expansion
export const countryMapping = {
  FR: { flag: "🇫🇷", name: "France" },
  BE: { flag: "🇧🇪", name: "Belgium" },
  LU: { flag: "🇱🇺", name: "Luxembourg" },
  DE: { flag: "🇩🇪", name: "Germany" },
} as const;

// Get country display info
export function getCountryDisplay(entityId: string): {
  flag: string;
  name: string;
} {
  // Extract country code from entity ID (first 2 characters)
  const countryCode = entityId.substring(0, 2);
  return (
    countryMapping[countryCode as keyof typeof countryMapping] || {
      flag: "🌍",
      name: "Unknown",
    }
  );
}
