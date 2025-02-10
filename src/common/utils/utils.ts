import { PlanetCharacteristics } from '../types/types';

export const getBaseUrl = () => {
  return 'https://swapi.dev/api/planets';
};

export const normalizeData = <T extends Record<string, unknown>>(
  data: T[]
): PlanetCharacteristics[] => {
  return data.map((planet) => {
    const normalizedPlanet: Partial<PlanetCharacteristics> = {};

    Object.keys(planet).forEach((key) => {
      const value = planet[key];
      let newKey = key as keyof PlanetCharacteristics;

      if (key.includes('_')) {
        const index = key.indexOf('_');
        newKey = (key.slice(0, index) +
          key.charAt(index + 1).toUpperCase() +
          key.slice(index + 2)) as keyof PlanetCharacteristics;
      }
      if (newKey === 'films' && Array.isArray(value)) {
        normalizedPlanet[newKey] = value as string[];
      } else if (typeof value === 'string') {
        normalizedPlanet[newKey] = value as string;
      }
    });

    return normalizedPlanet as PlanetCharacteristics;
  });
};

export const getIdFromUrl = (url: string) => {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
};
