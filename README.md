# Anki Card Creator

Anki Card Creator is a project developed using TypeScript, Vite and Vue.  
It allows users to search for vocabulary items and create Anki cards for them.

Access the application on the [github page](https://mysterken.github.io/ankiCardCreator/).

## Usage

To use the application, enter the vocabulary you want to learn in the search bar. The application will fetch the data,
create Anki cards, and display the information.

## Features

- Fetches data from an API and stores it in IndexedDB.
- Allows users to search for specific vocabulary.
- Provides detailed information about each vocabulary item, including meanings, readings, mnemonics, and hints.
- Supports different types of vocabulary items: Kana, Kanji, Radical, and Vocabulary.
- Sanitizes and formats the fetched data for display.

## Development

### Prerequisites
- Node.js
- Yarn or npm
- Git

### Project setup

Clone the repository:
```bash
git clone https://github.com/Mysterken/ankiCardCreator.git
```

Install the dependencies:
```bash
yarn install
# or
npm install
```

Compiles and hot-reloads for development
```bash
vite
```

Now you can access the application on your browser
