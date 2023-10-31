import { sortingArray } from "../lib/esm/index.mjs";

// Test for errors in ESM

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
    return false;
  }

  return true;
}

function verify(bool, message) {
  if (bool) {
    console.log("Success -> ", message);
  } else {
    console.log("Failed -> ", message);
  }
}

function logErrors(error) {
  return error;
}

function testError() {
  const documents = null;

  try {
    sortingArray(documents);
    verify(false, "Not Error");
  } catch (error) {
    verify(true, logErrors(error));
  }
}

function testGeneric() {
  const documents = [
    {
      playerName: "Totti",
      shirtNumber: 10,
      club: "Roma",
    },
    {
      playerName: "Pirlo",
      shirtNumber: 21,
      club: "Juventus",
    },
    {
      playerName: "Del Piero",
      shirtNumber: 10,
      club: "Juventus",
    },
    {
      playerName: "Baggio",
      shirtNumber: 10,
      club: "Brescia",
    },
  ];

  const criteria = [
    {
      field: "shirtNumber",
      priorities: [10],
    },
    {
      field: "club",
      basedOn: { field: "shirtNumber", value: 10 },
      priorities: ["Juventus"],
    },
  ];

  const expected = [
    {
      playerName: "Del Piero",
      shirtNumber: 10,
      club: "Juventus",
    },
    {
      playerName: "Totti",
      shirtNumber: 10,
      club: "Roma",
    },
    {
      playerName: "Baggio",
      shirtNumber: 10,
      club: "Brescia",
    },
    {
      playerName: "Pirlo",
      shirtNumber: 21,
      club: "Juventus",
    },
  ];

  try {
    const sortedDocuments = sortingArray(documents, criteria);

    if (!compareArrays(sortedDocuments, expected)) {
      verify(false, logErrors(sortedDocuments));
    } else {
      verify(true, logErrors(sortedDocuments));
    }
  } catch (error) {
    verify(false, logErrors(error));
  }
}

testError();
testGeneric();
