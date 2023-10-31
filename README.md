# semi-automatic-sort (sort array criteria)

This library allows you to semi-automatically sort of documents based on specified configuration parameters.

> Node >=12

## Installation

To use **Semi Automatic Sort** in your project, run:

```
npm install semi-automatic-sort
or
yarn add semi-automatic-sort
```

## Usage

```javascript
import { semiAutomaticSort } from "semi-automatic-sort";

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

## Spiegazione step by step

1. L'array **'criteria'** specifica le regole di priorità per riordinare gli elementi nell'array **'documents'**. In particolare, i criteri si basano su tre campi: **_'newspaperType'_**, **_'authorName'_** e **_'articleTitle'_**. Questi criteri specificano l'ordine di priorità in base al tipo di giornale, all'autore, e al titolo.
2. La funzione inizia ordinando i documenti in base alla priorità del campo **_'newspaperType'_**, come specificato nelle regole in **'criteria'**. Poiché **_'Newspaper'_** ha la priorità rispetto a **_'Magazine'_**, i documenti con **_'newspaperType'_** uguale a **_'Newspaper'_** vengono ordinati prima.
3. Successivamente, la funzione considera il campo **_'authorName'_** in base alla specifica regola per il tipo di giornale. Per esempio, **_'John Smith'_**, **_'Daniel Wilson'_**, e **_'William Thompson'_** sono gli autori prioritari per il tipo di giornale **_'Newspaper'_**, mentre per il tipo di giornale **_'Magazine'_** sono prioritari **_'Emily Johnson'_**, **_'Sarah Thompson'_**, **_'Jennifer Adams'_**, **_'Olivia Roberts'_**, e **_'Sophia Clark'_**.
4. Infine, la funzione considera il campo **_'articleTitle'_** per il tipo di giornale **_'Newspaper'_**. I titoli prioritari sono **_"Sports Section"_** e **_"Breaking News"_**.
5. Riunendo tutte queste regole, la funzione riordina gli oggetti nell'array **_'documents'_** in base a queste priorità specifiche, producendo l'array ordinato come risultato.

## Parametri dell'Array di Specifiche di ordinamento

| Campo      | Descrizione                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tipo            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| field      | Rappresenta il campo del documento rispetto al quale si vuole ordinare gli oggetti della collezione. Ad esempio, "newspaperType" indica che gli oggetti della collezione devono essere ordinati in base al campo "newspaperType" del documento.                                                                                                                                                                                                                                                                                                                                                                                                                           | String          |
| priorities | Elenca i valori che devono essere usati per ordinare gli oggetti della collezione rispetto al campo specificato. Ad esempio, ["Newspaper", "Magazine"] indica che gli oggetti della collezione devono essere ordinati in modo che gli oggetti con "newspaperType" uguale a "Newspaper" vengano prima di quelli con "newspaperType" uguale a "Magazine".                                                                                                                                                                                                                                                                                                                   | Array of String |
| basedOn    | Specifica se il valore di un altro campo deve essere usato come criterio di ordinamento. Questo parametro è facoltativo. Se presente, contiene i seguenti parametri: <ul><li>field (stringa): il campo del documento il cui valore deve essere utilizzato come criterio di ordinamento.</li><li>value (qualsiasi tipo): il valore del campo specificato da field che deve essere considerato per ordinare gli oggetti della collezione. Ad esempio, se field è "newspaperType" e value è "Newspaper", allora tutti gli oggetti della collezione con newspaperType uguale a "Newspaper" verranno ordinati in base al valore del campo specificato in priorities.</li></ul> | Object          |

## Opzioni di ordinamento

- **caseInsensitive** - true/false (Default false) se dichiarato true, gli oggetti
  della collezione vengono ordinati in base al campo specificato senza
  distizione tra minuscole e majuscole.
- **customGetValue** - La funzione opzionale `customGetValue` viene utilizzata per consentire una logica personalizzata per estrarre i valori dai documenti durante il processo di ordinamento. Se si desidera personalizzare come i valori vengono recuperati dai documenti, è possibile fornire questa funzione come parte delle opzioni.Questa funzione consente di modificare il comportamento predefinito di recupero dei valori dai documenti. Ad esempio, se si desidera estrarre valori specifici da un oggetto complesso o trasformare i valori prima che vengano utilizzati per l'ordinamento, è possibile definire la logica all'interno di `customGetValue`.Questo tipo di funzionalità è particolarmente utile quando i valori che devono essere utilizzati per l'ordinamento non sono direttamente accessibili o richiedono una manipolazione specifica prima di essere utilizzati. La funzione `customGetValue` consente di adattare la logica di estrazione dei valori in base a requisiti specifici e complessi. In sintesi, la funzione `customGetValue` offre flessibilità per adattare il processo di recupero dei valori durante l'ordinamento, consentendo una maggiore personalizzazione e controllo sulla logica di estrazione dei valori dai documenti.

#### caseInsensitive

```javascript
const sortedDocuments = sortingArray(documents, documentsElementToReorders, {
  caseInsensitive: true,
});
```

##### customGetValue

Supponiamo di avere un caso in cui i documenti contengono un oggetto complesso per il campo "author" e vogliamo ordinare i documenti in base ai nomi degli autori. Possiamo definire una funzione `customGetValue` per estrarre in modo specifico i nomi degli autori dai documenti:

```
const availableFields = [
  { value: 'author', type: 'author', path: ['author', 'name'] },
  // ... altri campi disponibili ...
];

const customGetValue = (obj, field) => {
  const fieldValue = availableFields.find(f => f.value === field);

  const { type, path } = fieldValue || {};

  if (path) {
    const currentValue = path.reduce((prev, curr) => {
      const value = _.get(obj, curr);

      if (!prev && value) {
        return value;
      }
      return prev;
    }, null);

    if (type === 'author') {
      if (Array.isArray(currentValue)) {
        return currentValue.map(value => value.name);
      }

      return currentValue;
    }

    return currentValue;
  } else {
    return null;
  }
};

// Esempio di utilizzo della funzione di ordinamento con customGetValue
const sortedDocuments = sortingSemiAutomaticCollectionByConfig(
  documents,
  documentsElementToReorders,
  { customGetValue }
);
```

In questo esempio, la funzione `customGetValue` consente di estrarre i nomi degli autori dai documenti, consentendo di utilizzare questi valori durante il processo di ordinamento. La logica definita all'interno di `customGetValue` è in grado di manipolare l'oggetto complesso e di estrarre i valori desiderati per l'ordinamento. Questo consente un controllo più preciso sulla logica di estrazione dei valori durante il processo di ordinamento.

#### ❤️ Support

If you make any profit from this or you just want to encourage me, you can offer me a coffee and I'll try to accommodate you.

<a href="https://www.buymeacoffee.com/simoneGatt" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>
