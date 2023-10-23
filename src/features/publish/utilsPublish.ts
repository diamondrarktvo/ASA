export const isThisValueSelected = (
  criteriaSelected: { name: string; value: string | number }[] | [],
  value: string | number,
): boolean => {
  if (!value) return false;

  if (!criteriaSelected || criteriaSelected.length > 0) return false;

  const valueFound = criteriaSelected.find((item) => item.value === value);

  /**
   * !!value est utilisé pour convertir le type d'une variable ici "value" en boolean
   * si (value est truthy) donc il retourne TRUE si (value est falsy) donc FALSE
   */
  return !!valueFound; // si la valeur est trouvée dans valueFound donc ça retourne TRUE sinon si c'est undefined donc FALSE
};

export const isAllCriteria;
