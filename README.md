# sort array criteria

This library allows you to semi-automatically sort documents based on specified configuration parameters, with zero dependency with TypeScript support.

> Node >=12

You can watch a preview of how the library works in this [demo](https://codesandbox.io/p/sandbox/sort-array-criteria-demo-q2yzg9?file=%2Fsrc%2FApp.js%3A10%2C10) version

## Installation

To use **Sort Array Criteria** in your project, run:

```
npm install sort-array-criteria
or
yarn add sort-array-criteria
```

## Usage

```javascript
import { sortingArray } from "sort-array-criteria"; //ESM
//or
const { sortingArray } = require("sort-array-criteria"); //CJS

//example
const documents = [
  {
    newspaperType: "Newspaper",
    authorName: "John Smith",
    articleTitle: "Breaking News",
  },
  {
    newspaperType: "Magazine",
    authorName: "Emily Johnson",
    articleTitle: "Fashion Trends",
  },
  {
    newspaperType: "Newspaper",
    authorName: "John Smith",
    articleTitle: "Sports Section",
  },
  {
    newspaperType: "Magazine",
    authorName: "Sarah Thompson",
    articleTitle: "Healthy Living",
  },
  {
    newspaperType: "Newspaper",
    authorName: "Daniel Wilson",
    articleTitle: "Local Events",
  },
  {
    newspaperType: "Magazine",
    authorName: "Jennifer Adams",
    articleTitle: "Travel Guide",
  },
  {
    newspaperType: "Newspaper",
    authorName: "Matthew Turner",
    articleTitle: "Business News",
  },
  {
    newspaperType: "Magazine",
    authorName: "Olivia Roberts",
    articleTitle: "Art and Culture",
  },
  {
    newspaperType: "Newspaper",
    authorName: "William Thompson",
    articleTitle: "Opinion Piece",
  },
  {
    newspaperType: "Magazine",
    authorName: "Sophia Clark",
    articleTitle: "Entertainment Buzz",
  },
];

const criteria = [
  {
    field: "newspaperType",
    priorities: ["Newspaper", "Magazine"],
  },
  {
    field: "authorName",
    basedOn: { field: "newspaperType", value: "Newspaper" },
    priorities: ["John Smith", "Daniel Wilson", "William Thompson"],
  },
  {
    field: "authorName",
    basedOn: { field: "newspaperType", value: "Magazine" },
    priorities: [
      "Emily Johnson",
      "Sarah Thompson",
      "Jennifer Adams",
      "Olivia Roberts",
      "Sophia Clark",
    ],
  },
  {
    field: "articleTitle",
    basedOn: { field: "newspaperType", value: "Newspaper" },
    priorities: ["Sports Section", "Breaking News"],
  },
];

const sortedDocuments = sortingArray(documents, criteria);
```

## Response

```javascript
//Example response

[
  {
    newspaperType: "Newspaper",
    authorName: "John Smith",
    articleTitle: "Sports Section",
  },
  {
    newspaperType: "Newspaper",
    authorName: "John Smith",
    articleTitle: "Breaking News",
  },
  {
    newspaperType: "Newspaper",
    authorName: "Daniel Wilson",
    articleTitle: "Local Events",
  },
  {
    newspaperType: "Newspaper",
    authorName: "William Thompson",
    articleTitle: "Opinion Piece",
  },
  {
    newspaperType: "Newspaper",
    authorName: "Matthew Turner",
    articleTitle: "Business News",
  },
  {
    newspaperType: "Magazine",
    authorName: "Emily Johnson",
    articleTitle: "Fashion Trends",
  },
  {
    newspaperType: "Magazine",
    authorName: "Sarah Thompson",
    articleTitle: "Healthy Living",
  },
  {
    newspaperType: "Magazine",
    authorName: "Jennifer Adams",
    articleTitle: "Travel Guide",
  },
  {
    newspaperType: "Magazine",
    authorName: "Olivia Roberts",
    articleTitle: "Art and Culture",
  },
  {
    newspaperType: "Magazine",
    authorName: "Sophia Clark",
    articleTitle: "Entertainment Buzz",
  },
];
```

## Step by step explanation

1. The array **'criteria'** specifies the priority rules for reordering the elements in the array **'documents'**. Specifically, the criteria are based on three fields: **\*'newspaperType'\***, **\*'authorName'\***, and **\*'articleTitle'\***. These criteria specify the order of priority based on the type of newspaper, the author, and the article title.
2. The function begins by sorting the documents based on the priority of the **\*'newspaperType'\*** field, as specified in the rules in **'criteria'**. Since **\*'Newspaper'\*** has priority over **\*'Magazine'\***, the documents with **\*'newspaperType'\*** equal to **\*'Newspaper'\*** are sorted first.
3. Subsequently, the function considers the **\*'authorName'\*** field based on the specific rule for the type of newspaper. For example, **\*'John Smith'\***, **\*'Daniel Wilson'\***, and **\*'William Thompson'\*** are the prioritized authors for the **\*'Newspaper'\*** type, while for the **\*'Magazine'\*** type, **\*'Emily Johnson'\***, **\*'Sarah Thompson'\***, **\*'Jennifer Adams'\***, **\*'Olivia Roberts'\***, and **\*'Sophia Clark'\*** are prioritized.
4. Finally, the function considers the **\*'articleTitle'\*** field for the **\*'Newspaper'\*** type. The prioritized titles are **\*"Sports Section"\*** and **\*"Breaking News"\***.
5. By combining all these rules, the function rearranges the objects in the **\*'documents'\*** array according to these specific priorities, producing the sorted array as the result.

## Array Sorting Specification Parameters (criteria)

| Field        | Type              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Required |
| ------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| _field_      | _String_          | Represents the field of the document with respect to which the collection objects are to be sorted. For example, "newspaperType" indicates that the collection objects should be sorted based on the "newspaperType" field of the document.                                                                                                                                                                                                                                                                                                                                                                                                     | _False_  |
| _priorities_ | _Array of String_ | Lists the values that should be used to sort the collection objects with respect to the specified field. For instance, ["Newspaper", "Magazine"] indicates that the collection objects should be sorted such that objects with "newspaperType" equal to "Newspaper" come before those with "newspaperType" equal to "Magazine".                                                                                                                                                                                                                                                                                                                 | _False_  |
| _basedOn_    | _Object_          | Specifies whether the value of another field should be used as a sorting criterion. This parameter is optional. If present, it contains the following parameters: **_field (string)_**: the field of the document whose value should be used as a sorting criterion. **_value (any type)_**: the value of the field specified by _field_ that should be considered for sorting the collection objects. For example, if _field_ is **_"newspaperType"_** and _value_ is **_"Newspaper"_**, then all collection objects with _newspaperType_ equal to **_"Newspaper"_** will be sorted based on the value of the field specified in _priorities_. | _False_  |

**Note**: _It's not necessary to specify an array of priorities, although it would make little sense not to do so as it would function just like a regular sort. However, you can still pass a parameter of null or an empty array to achieve correct results._

```javascript
const array = [
  "Sarah Thompson",
  "William Thompson",
  "Emily Johnson",
  "Alan Smith",
];

const sortedDocuments = sortingArray(array, null, { order: "asc" });
// Sorts the array like a regular sort if nothing is specified

["Alan Smith", "Emily Johnson", "Sarah Thompson", "William Thompson"];
```

## Sorting Options (options)

| Field             | Type                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Required |
| ----------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| _caseInsensitive_ | _Boolean_             | When declared as true, the collection objects are sorted based on the specified field without regard to case sensitivity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | _False_  |
| _customGetValue_  | _Function_            | The optional `customGetValue` function is used to allow custom logic for extracting values from the documents during the sorting process. If you want to customize how values are retrieved from the documents, you can provide this function as part of the options. This function allows you to modify the default behavior of retrieving values from the documents. For example, if you want to extract specific values from a complex object or transform the values before they are used for sorting, you can define the logic within `customGetValue`. This kind of functionality is particularly useful when the values to be used for sorting are not directly accessible or require specific manipulation before use. The `customGetValue` function enables tailoring the value extraction logic to specific and complex requirements. | _False_  |
| order             | _String: <asc, desc>_ | The accepted values will be the classic **_"asc"_** and **_"desc"_**, indicating how to order the elements regardless of any specific value priority. If no _order_ field is provided, the results will remain unchanged.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | _False_  |

#### caseInsensitive

```javascript
const sortedDocuments = semiAutomaticSorting(documents, criteria, {
  caseInsensitive: true,
});
```

###### order

```javascript
const sortedDocuments = semiAutomaticSorting(documents, criteria, {
  order: "asc",
});
```

##### customGetValue

Suppose we have a case where the documents contain a complex object for the "name" and for "documents" field, and we want to sort the documents based on the authors' names. We can define a `customGetValue` function to specifically extract the authors' names from the documents:

```javascript
const availableFields = [
  { value: "name", type: "author" },
  { value: "documents", type: "publications" },
  // ... other fields available ...
];

const customGetValue = (obj, field) => {
  /*
     Example obj
      obj = {
          name: {firstname: 'Mario', surname: 'Rossi'},
          documents: [{title: 'fsrtDoc', year: 2010}, {title: 'secDoc', year: 2020}],
          // ... other data ...
      };

      Example field
      field = name | documents
  */

  const fieldValue = availableFields.find((f) => f.value === field);

  const { type } = fieldValue || {};

  const value = obj[field];

  if (type === "author") {
    // I just want the name as the calculation value
    return value.firstname;
  } else if (type === "publications") {
    // Please consider only the titles of documents published
    // by the author for a correct calculation
    return value.map((d) => d.title);
  }

  return value;
};

// Example of using the sort function with customGetValue
const sortedDocuments = sortingSemiAutomaticCollectionByConfig(
  documents,
  criteria,
  { customGetValue }
);
```

The logic defined in _"customGetValue"_ can manipulate the complex object and extract the desired values for sorting. This allows for more precise control over the value extraction logic during the sorting process.

#### ❤️ Support

If you make any profit from this or you just want to encourage me, you can offer me a coffee and I'll try to accommodate you.

<a href="https://www.buymeacoffee.com/simoneGatt" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>
