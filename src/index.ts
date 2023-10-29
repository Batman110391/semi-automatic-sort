type Document = Record<string, any>;

type GetValueFunction = (doc: Document, key: string) => any;

type SortingOptions = {
  caseInsensitive?: boolean;
  customGetValue?: GetValueFunction;
};

type PriorityConfig = {
  field: string;
  priorities: string[];
  basedOn?: {
    field: string;
    value: any;
  };
};

export function semiAutomaticSorting(
  documents: Document[],
  documentsElementToReorders: PriorityConfig[],
  options?: SortingOptions
) {
  if (!Array.isArray(documents) || !Array.isArray(documentsElementToReorders)) {
    return [];
  }

  const { caseInsensitive = false, customGetValue } = options || {};

  try {
    return documents
      .slice()
      .sort(
        sortByPriority(
          documentsElementToReorders,
          caseInsensitive,
          customGetValue
        )
      );
  } catch (error) {
    console.error(error);
    return documents;
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
  priorityValues: string[],
  caseInsensitive: boolean
) {
  if (!Array.isArray(priorityValues) || !value) return -1;

  if (caseInsensitive) {
    if (Array.isArray(value)) {
      return priorityValues.findIndex((pv) => {
        return value.find(
          (v) => v.trim().toLowerCase() === pv.trim().toLowerCase()
        );
      });
    }

    const word = value.trim().toLowerCase();

    return priorityValues.findIndex((val) => val.trim().toLowerCase() === word);
  }

  if (Array.isArray(value)) {
    return priorityValues.findIndex((pv) => {
      return value.includes(pv);
    });
  }

  return priorityValues.indexOf(value);
}

export default {
  semiAutomaticSorting,
};
