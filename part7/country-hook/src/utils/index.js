export const formatCountry = (country) => {
  return {
    name: country.name.common,
    capital: country.capital[0],
    population: country.population,
    flag: country.flags.png,
  }
}
