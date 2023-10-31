import "mocha";
import { assert } from "chai";

import { sortingArray } from "../src/index";
import npmPackage from "../src/index";
import generateRandomDocumentsArray from "../utils/generateFakeData";

const DEBUG_PERFORM = true;
const TIME_PERFORMANCE_DEBUG = 0.1;

/*
Reacp test:

"should return an empty array when given an empty array as input"
"should sort the documents based on the priorities specified in 'criteria'"
"should sort the documents based on multiple levels of priorities"
"should handle documents with missing fields"
"should handle documents with duplicate entries"
"should handle documents with missing basedOn field"
"should handle documents with missing fields in basedOn condition"
"should handle documents with missing basedOn"
"should handle documents with case insensitive params options"
*/

function compareArrays(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
    return false;
  }

  return true;
}

function sortingArrayWithPerformance(
  documents: any[],
  criteria?: any[],
  options?: Object
) {
  let startTime: any, endTime: any, elapsedTime: any;

  if (DEBUG_PERFORM) {
    startTime = Date.now();
  }

  const result = sortingArray(documents, criteria, options);

  if (DEBUG_PERFORM) {
    endTime = Date.now();

    elapsedTime = endTime - startTime;
    console.log(`\n -> executions: ${elapsedTime} millisecondi`);
    assert.ok(
      parseFloat(elapsedTime) < documents.length || 1 * TIME_PERFORMANCE_DEBUG,
      `Il tempo di esecuzione è superiore a ${
        documents.length || 1 * TIME_PERFORMANCE_DEBUG
      } millisecondi: ${elapsedTime}`
    );
  }

  return result;
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

  it("should performance big Data", () => {
    const fakeDocumentData = generateRandomDocumentsArray(10000);

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
    sortingArrayWithPerformance(fakeDocumentData, criteria);
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
});
