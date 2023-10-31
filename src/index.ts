type ErrorName = "INVALID_INPUT" | "UNEXPECTED_ERROR";

type Document = Record<string, any>;

type GetValueFunction = (doc: Document, key: string) => any;

type SortingOptions = {
  caseInsensitive?: boolean;
  customGetValue?: GetValueFunction;
};

type PriorityConfig = {
  field: string;
  priorities: (string | number | boolean)[];
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
      const priorityValues = priority.priorities;
      const basedOn = priority.basedOn;

      if (basedOn && basedOn.field && basedOn.value) {
        basedOnValues[basedOn.field] = basedOn.value;
      }

      const aValue = getValue(a, field, basedOnValues, customGetValue);
      const bValue = getValue(b, field, basedOnValues, customGetValue);

      const aPriorityIndex =
        priorityValues && searchValue(aValue, priorityValues, caseInsensitive);
      const bPriorityIndex =
        priorityValues && searchValue(bValue, priorityValues, caseInsensitive);

      if (aPriorityIndex !== -1 && bPriorityIndex !== -1) {
        if (aPriorityIndex > bPriorityIndex) return 1;
        if (aPriorityIndex < bPriorityIndex) return -1;
      } else if (aPriorityIndex !== -1) {
        return -1;
      } else if (bPriorityIndex !== -1) {
        return 1;
      }
    }

    return 0;
  };
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

function searchValue(
  value: any,
  priorityValues: (string | number | boolean)[],
  caseInsensitive: boolean
) {
  if (!Array.isArray(priorityValues) || value === undefined || value === null)
    return -1;

  if (caseInsensitive) {
    if (Array.isArray(value)) {
      return priorityValues.findIndex((pv) => {
        if (typeof pv === "string") {
          return value.find(
            (v) => v.trim().toLowerCase() === pv.trim().toLowerCase()
          );
        }
        return value.find((v) => v === pv);
      });
    }

    const word = typeof value === "string" ? value.trim().toLowerCase() : value;

    return priorityValues.findIndex((val) => {
      if (typeof val === "string") {
        return val.trim().toLowerCase() === word;
      }
      return val === word;
    });
  }

  if (Array.isArray(value)) {
    return priorityValues.findIndex((pv) => {
      return value.includes(pv);
    });
  }

  return priorityValues.indexOf(value);
}

export default {
  sortingArray,
};
