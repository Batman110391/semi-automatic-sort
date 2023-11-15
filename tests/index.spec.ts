import "mocha";
import { assert } from "chai";

import { searchValue, sortingArray } from "../src/index";
import npmPackage from "../src/index";
import generateRandomDocumentsArray from "../utils/generateFakeData";

function compareArrays(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
    return false;
  }

  return true;
}

describe("NPM Package", () => {
  it("should be an object", () => {
    assert.isObject(npmPackage);
  });

  it("should have a sortingArray property", () => {
    assert.property(npmPackage, "sortingArray");
  });
});

describe("sortingArray Function", () => {
  it("should be a function", () => {
    assert.isFunction(sortingArray);
  });

  it("should return an empty array when given an empty array as input", () => {
    assert.deepStrictEqual(sortingArray([], []), []);
  });

  it("should sort the documents based on the priorities specified in 'criteria'", () => {
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

    const expected = [
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

    const sortedDocuments = sortingArray(documents, criteria);

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should sort the documents based on the priorities specified in 'criteria'",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });

  it("should sort the documents based on multiple levels of priorities", () => {
    const documents = [
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
        authorName: "Emily Johnson",
        articleTitle: "Fashion Trends",
      },
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Breaking News",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sophia Clark",
        articleTitle: "Entertainment Buzz",
      },
      {
        newspaperType: "Newspaper",
        authorName: "William Thompson",
        articleTitle: "Opinion Piece",
      },
      {
        newspaperType: "Magazine",
        authorName: "Jennifer Adams",
        articleTitle: "Travel Guide",
      },
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Magazine",
        authorName: "Olivia Roberts",
        articleTitle: "Art and Culture",
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
      {
        field: "articleTitle",
        basedOn: { field: "newspaperType", value: "Magazine" },
        priorities: ["Fashion Trends", "Art and Culture"],
      },
    ];

    const expected = [
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

    const sortedDocuments = sortingArray(documents, criteria);

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should sort the documents based on multiple levels of priorities",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });

  it("should handle documents with missing fields", () => {
    const documents = [
      { newspaperType: "Magazine", authorName: "Sarah Thompson" },
      { newspaperType: "Newspaper", articleTitle: "Local Events" },
      { authorName: "Emily Johnson", articleTitle: "Fashion Trends" },
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Breaking News",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sophia Clark",
        articleTitle: "Entertainment Buzz",
      },
      { newspaperType: "Newspaper", articleTitle: "Opinion Piece" },
      { newspaperType: "Magazine", authorName: "Jennifer Adams" },
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      { authorName: "Olivia Roberts", articleTitle: "Art and Culture" },
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

    const expected = [
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
      { newspaperType: "Newspaper", articleTitle: "Local Events" },
      { newspaperType: "Newspaper", articleTitle: "Opinion Piece" },
      { newspaperType: "Magazine", authorName: "Sarah Thompson" },
      { newspaperType: "Magazine", authorName: "Jennifer Adams" },
      {
        newspaperType: "Magazine",
        authorName: "Sophia Clark",
        articleTitle: "Entertainment Buzz",
      },
      { authorName: "Emily Johnson", articleTitle: "Fashion Trends" },
      { authorName: "Olivia Roberts", articleTitle: "Art and Culture" },
    ];

    const sortedDocuments = sortingArray(documents, criteria);

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should handle documents with missing fields",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });

  it("should handle documents with duplicate entries", () => {
    const documents = [
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      { newspaperType: "Magazine", authorName: "Sarah Thompson" },
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Fashion Trends",
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
        priorities: ["John Smith", "William Thompson"],
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

    const expected = [
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Fashion Trends",
      },
      { newspaperType: "Magazine", authorName: "Sarah Thompson" },
    ];

    const sortedDocuments = sortingArray(documents, criteria);

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should handle documents with duplicate entries",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });

  it("should handle documents with missing basedOn field", () => {
    const documents = [
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sarah Thompson",
        articleTitle: "Fashion Trends",
      },
      {
        newspaperType: "Newspaper",
        authorName: "William Thompson",
        articleTitle: "Opinion Piece",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Travel Guide",
      },
    ];

    const criteria = [
      {
        field: "newspaperType",
        priorities: ["Newspaper", "Magazine"],
      },
      {
        field: "authorName",
        basedOn: { field: "nonExistingField", value: "Newspaper" },
        priorities: ["John Smith", "William Thompson"],
      },
      {
        field: "articleTitle",
        basedOn: { field: "newspaperType", value: "Newspaper" },
        priorities: ["Sports Section", "Breaking News"],
      },
    ];

    const expected = [
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Newspaper",
        authorName: "William Thompson",
        articleTitle: "Opinion Piece",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sarah Thompson",
        articleTitle: "Fashion Trends",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Travel Guide",
      },
    ];

    const sortedDocuments = sortingArray(documents, criteria);

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should handle documents with missing basedOn field",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });

  it("should handle documents with missing fields in basedOn condition", () => {
    const documents = [
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sarah Thompson",
        articleTitle: "Fashion Trends",
      },
      {
        newspaperType: "Newspaper",
        authorName: "William Thompson",
        articleTitle: "Opinion Piece",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Travel Guide",
      },
    ];

    const criteria = [
      {
        field: "newspaperType",
        priorities: ["Newspaper", "Magazine"],
      },
      {
        field: "authorName",
        basedOn: { field: "nonExistingField", value: "NonExistingValue" },
        priorities: ["John Smith", "William Thompson"],
      },
      {
        field: "articleTitle",
        basedOn: { field: "newspaperType", value: "Newspaper" },
        priorities: ["Sports Section", "Breaking News"],
      },
    ];

    const expected = [
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Newspaper",
        authorName: "William Thompson",
        articleTitle: "Opinion Piece",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sarah Thompson",
        articleTitle: "Fashion Trends",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Travel Guide",
      },
    ];

    const sortedDocuments = sortingArray(documents, criteria);

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should handle documents with missing fields in basedOn condition",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });

  it("should handle documents with missing basedOn", () => {
    const documents = [
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sarah Thompson",
        articleTitle: "Fashion Trends",
      },
      {
        newspaperType: "Newspaper",
        authorName: "William Thompson",
        articleTitle: "Opinion Piece",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Travel Guide",
      },
    ];

    const criteria = [
      {
        field: "newspaperType",
        priorities: ["Newspaper", "Magazine"],
      },
      {
        field: "authorName",
        priorities: ["Emily Johnson", "John Smith", "William Thompson"],
      },
      {
        field: "articleTitle",
        priorities: ["Sports Section", "Breaking News"],
      },
    ];

    const expected = [
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Newspaper",
        authorName: "William Thompson",
        articleTitle: "Opinion Piece",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Travel Guide",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sarah Thompson",
        articleTitle: "Fashion Trends",
      },
    ];

    const sortedDocuments = sortingArray(documents, criteria);

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should handle documents with missing basedOn",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });

  it("should handle documents with case insensitive params options", () => {
    const documents = [
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sarah Thompson",
        articleTitle: "Fashion Trends",
      },
      {
        newspaperType: "Newspaper",
        authorName: "William Thompson",
        articleTitle: "Opinion Piece",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Travel Guide",
      },
    ];

    const criteria = [
      {
        field: "newspaperType",
        priorities: ["newspaper", "magazine"],
      },
      {
        field: "authorName",
        basedOn: { field: "newspaperType", value: "Newspaper" },
        priorities: ["william Thompson", "john smith  "],
      },
    ];

    const expected = [
      {
        newspaperType: "Newspaper",
        authorName: "William Thompson",
        articleTitle: "Opinion Piece",
      },
      {
        newspaperType: "Newspaper",
        authorName: "John Smith",
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Magazine",
        authorName: "Sarah Thompson",
        articleTitle: "Fashion Trends",
      },
      {
        newspaperType: "Magazine",
        authorName: "Emily Johnson",
        articleTitle: "Travel Guide",
      },
    ];

    const sortedDocuments = sortingArray(documents, criteria, {
      caseInsensitive: true,
    });

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should handle documents with case insensitive params options",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });

  it("should handle documents with parameter options that have numeric values", () => {
    const documents = [
      {
        playerName: "Totti",
        shirtNumber: 10,
      },
      {
        playerName: "Pirlo",
        shirtNumber: 21,
      },
      {
        playerName: "Del Piero",
        shirtNumber: 10,
      },
      {
        playerName: "Baggio",
        shirtNumber: 10,
      },
    ];

    const criteria = [
      {
        field: "shirtNumber",
        priorities: [10],
      },
    ];

    const expected = [
      {
        playerName: "Totti",
        shirtNumber: 10,
      },
      {
        playerName: "Del Piero",
        shirtNumber: 10,
      },
      {
        playerName: "Baggio",
        shirtNumber: 10,
      },
      {
        playerName: "Pirlo",
        shirtNumber: 21,
      },
    ];

    const sortedDocuments = sortingArray(documents, criteria);

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should handle documents with parameter options that have numeric values",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });

  it("should sort the documents based on the priorities specified in the 'criteria', with a customGetValue", () => {
    const documents = [
      {
        newspaperType: "Newspaper",
        authorName: { firstname: "John Smith", surname: "xxx" },
        articleTitle: "Breaking News",
      },
      {
        newspaperType: "Magazine",
        authorName: { firstname: "Emily Johnson", surname: "xxx" },
        articleTitle: "Fashion Trends",
      },
      {
        newspaperType: "Newspaper",
        authorName: { firstname: "John Smith", surname: "xxx" },
        articleTitle: "Sports Section",
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
        priorities: ["John Smith"],
      },
      {
        field: "authorName",
        basedOn: { field: "newspaperType", value: "Magazine" },
        priorities: ["Emily Johnson"],
      },
    ];

    const expected = [
      {
        newspaperType: "Newspaper",
        authorName: { firstname: "John Smith", surname: "xxx" },
        articleTitle: "Breaking News",
      },
      {
        newspaperType: "Newspaper",
        authorName: { firstname: "John Smith", surname: "xxx" },
        articleTitle: "Sports Section",
      },
      {
        newspaperType: "Magazine",
        authorName: { firstname: "Emily Johnson", surname: "xxx" },
        articleTitle: "Fashion Trends",
      },
    ];

    const availableFields = [{ value: "name", type: "author" }];

    const customGetValue = (obj: any, field: any) => {
      const fieldValue = availableFields.find((f) => f.value === field);

      const { type } = fieldValue || {};

      const value = obj[field];

      if (type === "author") {
        return value.firstname;
      }

      return value;
    };

    const sortedDocuments = sortingArray(documents, criteria, {
      customGetValue,
    });

    if (!compareArrays(sortedDocuments, expected)) {
      console.log(
        "should sort the documents based on the priorities specified in 'criteria'",
        sortedDocuments
      );
    }

    assert.deepStrictEqual(sortedDocuments, expected);
  });
});

describe("SearchValue Function", () => {
  it("should return the index when the value is found in the priority values", () => {
    const priorityValues = ["apple", "banana", "cherry", "date"];
    const value1 = "banana";
    const value2 = "Cherry";
    const value3 = 10;

    assert.strictEqual(searchValue(value1, priorityValues, true), 1);
    assert.strictEqual(searchValue(value2, priorityValues, true), 2);
    assert.strictEqual(searchValue(value3, priorityValues, false), -1);
  });

  it("should return -1 when the value is not found in the priority values", () => {
    const priorityValues = ["apple", "banana", "cherry", "date"];
    const value1 = "grape";
    const value2 = "kiwi";
    const value3 = 10;

    assert.strictEqual(searchValue(value1, priorityValues, true), -1);
    assert.strictEqual(searchValue(value2, priorityValues, true), -1);
    assert.strictEqual(searchValue(value3, priorityValues, false), -1);
  });

  it("should handle null and undefined values", () => {
    const priorityValues = ["apple", "banana", "cherry", "date"];
    const value1 = null;
    const value2 = undefined;

    assert.strictEqual(searchValue(value1, priorityValues, true), -1);
    assert.strictEqual(searchValue(value2, priorityValues, true), -1);
  });
});

describe("sortingArray Function performance", () => {
  it("should performance big Data", () => {
    const fakeDocumentData = generateRandomDocumentsArray(100000);

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
    ];
    sortingArray(fakeDocumentData, criteria);
  });
});
