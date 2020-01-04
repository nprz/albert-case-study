This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Run Project

- Install dependencies with `npm i`
- Once installation is complete run `npm start`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### File Structure

In this project `src` holds 3 main directories: `components`, `redux`, and `helpers`. Within the `components` directory is a flat list of folders, each named after the component held within. In the individual component folders are 2 files `index` and `<ComponentName>`. The `index` file provides a place to connect the component to the redux store and perform any logic to the data returned from the store before passing the data as props to the presentational component, held with the `<ComponentName>` file (index files are created even if the component is not connected to the store to provide consistent file naming and importing).
The `redux` directory contains 3 directories: `actionCreators`, `actions`, and `reducers`. `actions` holds const string values which are imported into the `actionCreators` and `reducers` files of the same name. `actionCreators` are functions which can be dispatched by the store and `reducers` hold the logic to handle updating the store.
The `helpers` folder holds files which contain helper functions that can be used throughout the project.

### Current Implementation

Currently the app uses redux as a global store for the data returned from the API. There are two components connected to the store, the rest of the components are children of these connected components. The components being `SearchInput`, which is connected to the `search` portion of the store, and `SearchResults`, which holds the `searchResults` portion of the store.

### Styling and Component Library

This project uses the [Material-UI](https://material-ui.com/) component library along with its [styling solution](https://material-ui.com/styles/basics/). The style for each component is written in the same file as the component implementation.

### Future Improvements

- Caching: The Open Library API returns a huge amount of data with most calls, even when the limit of items returned is set to 10, there is still too much data returned for the app to run effciently on devices with slow internet connectivity or devices with limited CPU power. This could be improved through the use of caching query results from the API. This would allow the device to read query results from local memory rather than performing an API call if the user has previously searched for the same query before.
- Prevent empty string searching: Anytime the input is cleared the API is unnecessarily called. Preventing this would improve performance.
- Routing: If another page were requested it would be smart to install `react-router-dom` and create a routing structure for the app.
- Responsive UI: The UI could be improved to be more responsive on mobile devices. While the app is currently usable on a mobile device it is not the greatest experince and could be improved.
- Pagination: Right now a user view the cannot skip ahead and must view each page one by one. This experience could be improved.
- Tests: There are no tests for this app, if the project were to grow writing tests would be beneficial as it would help ensure that existing code is not broken by features written in the future.
