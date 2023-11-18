type ErrorName = "INVALID_INPUT" | "UNEXPECTED_ERROR";

type Document = Record<string, any>;

type SortableData = Document | string | number;

type GetValueFunction = (doc: SortableData, key: string) => any;

type SortingOptions = {
  caseInsensitive?: boolean;
  customGetValue?: GetValueFunction;
  order?: string;
};

type PriorityConfig = {
  field: string;
  priorities?: (string | number | boolean)[];
  basedOn?: {
    field: string;
    value: any;
  };
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
  documents: Document[] | Array<string> | Array<number>,
  criteria: PriorityConfig[] | null,
  options?: SortingOptions
) {
  if (!Array.isArray(documents)) {
    throw new SortingError({
      name: "INVALID_INPUT",
      message:
        "Invalid input. The documents and criteria should be provided as arrays.",
    });
  }

  const { caseInsensitive = false, customGetValue, order } = options || {};

  try {
    return documents
      .slice()
      .sort(sortByPriority(criteria, caseInsensitive, customGetValue, order));
  } catch (error) {
    throw new SortingError({
      name: "UNEXPECTED_ERROR",
      message: "An unexpected error occurred during sorting.",
      cause: error,
    });
  }
}

function sortByPriority(
  priorities: PriorityConfig[] | null,
  caseInsensitive: boolean,
  customGetValue?: GetValueFunction,
  order?: string
): (a: SortableData, b: SortableData) => number {
  return (a: SortableData, b: SortableData): number => {
    if (Array.isArray(priorities)) {
      const basedOnValues: Record<string, any> = {};
      for (const priority of priorities) {
        const field = priority.field;
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
          return compareValues(order, aValue, bValue);
        }
      }
    }

    if (order) {
      return compareValues(order, a, b);
    } else {
      return 0;
    }
  };
}

function compareValues(
  order: string,
  aValue: SortableData,
  bValue: SortableData
): number {
  const isAscending = order === "asc";
  const isDescending = order === "desc";

  if (
    (isAscending || isDescending) &&
    typeof aValue === "number" &&
    typeof bValue === "number"
  ) {
    return isAscending ? aValue - bValue : bValue - aValue;
  }

  if (
    (isAscending || isDescending) &&
    typeof aValue === "string" &&
    typeof bValue === "string"
  ) {
    return isAscending
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }

  return 0;
}

function getValue(
  obj: SortableData,
  field: string,
  basedOnValues: SortableData,
  customGetValue?: GetValueFunction
): string | number {
  if (customGetValue && typeof customGetValue === "function") {
    return customGetValue(obj, field);
  }

  if (
    typeof obj === "object" &&
    obj !== null &&
    typeof basedOnValues === "object" &&
    basedOnValues !== null
  ) {
    return (
      (basedOnValues as Record<string, any>)[field] ||
      (obj as Record<string, any>)[field]
    );
  }

  return 0;
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
