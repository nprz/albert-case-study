This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Run Project

- Install dependencies with `npm i`
- Once installation is complete run `npm start`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### File Structure

In this project, `src` holds 3 main directories: `components`, `redux`, and `helpers`. Within the `components` directory is a flat list of folders, each named after the component held within. In the individual component folders are 2 files `index` and `<ComponentName>`. The `index` file provides a place to connect the component to the redux store and perform any logic to the data returned from the store before passing the data as props to the presentational component, held with the `<ComponentName>` file (index files are created even if the component is not connected to the store to provide consistent file name).
The `redux` directory 3 directories: `actionCreators`, `actions`, and `reducers`,

### Current Implementation

Currently the app uses redux as a global store for the data returned from the API. The `search` key of the store contains the data used by the `SearchInput` component. The `searchResults` key contains the data used by the `SearchResults` component.

### Styling and Component Library

### Future Improvements

- Caching: The Open Library API returns a huge amount of data with most calls, even when the limit of items return is set to 10 there is still too much data returned for the app to run effciently on devices with slow internet connectivity or devices with limited CPU power. This could be improved through the use of caching query results from the API. This would allow the device to read query results from local memory rather than performing an API call if the user has previously searched for the same query before.
- Routing: introduce routing with react router
- Debouncing: A debouncing function could be implemented on the search input which would reduce the number of times the endpoint would be called, thus reducing strain on the API.
- Responsive UI: The UI could be improved to be more responsive on mobile devices. While the app is currently usable on a mobile device it is not the greatest experince and could be improved.
- Pagination: Right now a user cannot skip ahead. This experience could be improved. Although if a user continually needs to page through search results this would indicate poor logic on the APIs end. Still the option to view more pages should be available.
