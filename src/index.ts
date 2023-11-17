type ErrorName = "INVALID_INPUT" | "UNEXPECTED_ERROR";

type Document = Record<string, any>;

type GetValueFunction = (doc: Document, key: string) => any;

type SortingOptions = {
  caseInsensitive?: boolean;
  customGetValue?: GetValueFunction;
};

type PriorityConfig = {
  field: string;
  priorities?: (string | number | boolean)[];
  basedOn?: {
    field: string;
    value: any;
  };
  order?: string;
};

class SortingError extends Error {
  name: ErrorName;
  message: string;
  cause: any;

  constructor({
    name,
    message,
    cause,
  }: {
    name: ErrorName;
    message: string;
    cause?: any;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

export function sortingArray(
  documents: Document[],
  criteria: PriorityConfig[] = [],
  options?: SortingOptions
) {
  if (!Array.isArray(documents) || !Array.isArray(criteria)) {
    throw new SortingError({
      name: "INVALID_INPUT",
      message:
        "Invalid input. The documents and criteria should be provided as arrays.",
    });
  }

  const { caseInsensitive = false, customGetValue } = options || {};

  try {
    return documents
      .slice()
      .sort(sortByPriority(criteria, caseInsensitive, customGetValue));
  } catch (error) {
    throw new SortingError({
      name: "UNEXPECTED_ERROR",
      message: "An unexpected error occurred during sorting.",
      cause: error,
    });
  }
}

function sortByPriority(
  priorities: PriorityConfig[],
  caseInsensitive: boolean,
  customGetValue?: GetValueFunction
) {
  return (a: Document, b: Document): number => {
    const basedOnValues: Record<string, any> = {};
    for (const priority of priorities) {
      const field = priority.field;
      const order = priority.order;
      const priorityValues = priority.priorities;
      const basedOn = priority.basedOn;

      if (basedOn && basedOn.field && basedOn.value) {
        basedOnValues[basedOn.field] = basedOn.value;
      }

      const aValue = getValue(a, field, basedOnValues, customGetValue);
      const bValue = getValue(b, field, basedOnValues, customGetValue);

      const aPriorityIndex =
        (priorityValues &&
          searchValue(aValue, priorityValues, caseInsensitive)) ||
        0;
      const bPriorityIndex =
        (priorityValues &&
          searchValue(bValue, priorityValues, caseInsensitive)) ||
        0;

      if (aPriorityIndex !== -1 && bPriorityIndex !== -1) {
        if (aPriorityIndex > bPriorityIndex) return 1;
        if (aPriorityIndex < bPriorityIndex) return -1;
      } else if (aPriorityIndex !== -1) {
        return -1;
      } else if (bPriorityIndex !== -1) {
        return 1;
      }

      if (order) {
        const isAscending = order === "asc";
        const isDiscending = order === "desc";
        if (isAscending) {
          if (isNumber(aValue) && isNumber(bValue)) {
            return aValue - bValue;
          } else {
            return aValue.localeCompare(bValue);
          }
        } else if (isDiscending) {
          if (isNumber(aValue) && isNumber(bValue)) {
            return bValue - aValue;
          } else {
            return bValue.localeCompare(aValue);
          }
        }
      }
    }

    return 0;
  };
}

function isNumber(value: any) {
  return typeof value === "number" && !!isNaN(value);
}

function getValue(
  obj: Document,
  field: string,
  basedOnValues: Document,
  customGetValue?: GetValueFunction
): any {
  if (customGetValue && typeof customGetValue === "function") {
    return customGetValue(obj, field);
  }
  return basedOnValues[field] || obj[field];
}

export function searchValue(
  value: any,
  priorityValues: (string | number | boolean)[],
  caseInsensitive: boolean
) {
  if (!Array.isArray(priorityValues) || value === undefined || value === null)
    return -1;

  const normalizedValue = normalizeValue(value, caseInsensitive);

  for (let i = 0; i < priorityValues.length; i++) {
    const normalizedPriorityValue = normalizeValue(
      priorityValues[i],
      caseInsensitive
    );
    if (isEqual(normalizedValue, normalizedPriorityValue)) {
      return i;
    }
  }

  return -1;
}

function normalizeValue(
  value: any,
  caseInsensitive: boolean
): string | number | boolean {
  if (typeof value === "string") {
    return caseInsensitive ? value.trim().toLowerCase() : value.trim();
  }
  return value;
}

function isEqual(
  value1: string | number | boolean,
  value2: string | number | boolean
): boolean {
  return value1 === value2;
}
export default {
  sortingArray,
  searchValue,
};
