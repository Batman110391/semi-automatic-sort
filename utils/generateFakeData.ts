const paperType = ["Magazine", "Newspaper"];

const author = ["John Smith", "Daniel Wilson", "William Thompson"];

type Document = {
  newspaperType: string;
  authorName: string;
};

export function generateRandomDocumentsArray(size: number): Document[] {
  const documents: Document[] = [];

  for (let i = 0; i < size; i++) {
    const document: Document = {
      newspaperType: paperType[getRandomInt(2)],
      authorName: author[getRandomInt(3)],
    };
    documents.push(document);
  }

  return documents;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default generateRandomDocumentsArray;
