import { base64Func } from "_utils";
import { criteriaType } from "../types";
import { criteriaSelected, stepper2NavigationTypes } from "./types";

/**
 *
 * @param criteriaSelected
 * @param value
 * @returns boolean
 */
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

/**
 *
 * @param allCriteria
 * @param criteriaSelected
 * @returns boolean
 */
export const isAllCriteriaRequiredSelected = (
  allCriteria: criteriaType[],
  criteriaSelected: criteriaSelected[],
) => {
  if (!allCriteria || allCriteria.length === 0) return false;
  if (!criteriaSelected || criteriaSelected.length === 0) return false;

  const criteriaSelectedIds = criteriaSelected.map((item) => item.criteria);

  const criteriaIds = allCriteria.map((item) => item.id)?.slice(0, 3);

  const isAllCriteriaSelected = criteriaIds.every((item) =>
    criteriaSelectedIds.includes(item),
  );

  return isAllCriteriaSelected;
};

export const convertUriImageToBase64 = (uri: string) => {
  if (!uri) return "";
  let base64Image = base64Func.btoa(uri);
  return base64Image;
};
