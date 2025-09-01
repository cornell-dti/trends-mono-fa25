import { useMemo, useState } from "react";
import "./Gallery.css";

/**
 * Welcome to Homework 4, the frontend-capstone homework!
 * After this, we'll be moving on to backend development, as well as the final project.
 *
 * This homework tests more advanced React concepts: Props, Minimal State, Memoization.
 *
 * The component we built in Homework 3 has now been upgraded:
 * - Paginator is now just a subcomponent of the Gallery component
 * - The Gallery component takes in a list of items, and lets us paginate and search through them.
 *
 * Notice a few things:
 * - The page state has been "lifted" from Paginator to Gallery. This is because the Gallery component
 *  needs to know what page we're on, so it can display the correct items.
 * - We added a new "search" state. This state tracks the current search query.
 * These two states are "minimalist" -- together, they describe all we need to know about the Gallery component's behavior and appearance.
 *
 * Your job is to implement the remaining logic for the Gallery component.
 *
 * 1. "Control" the search input so that it reflects and updates the search state.
 *
 * In React, a "controlled" input is one whose value is controlled by React state.
 * Your task is to change the input so that its value reflects the search state, and when the user types into the input, the search state is updated.
 *
 * 2. Finish "lifting" the page state from Paginator to Gallery.
 *
 * The page state is currently only used by the Gallery component, but it should be used by the Paginator component as well.
 * (You will notice that the Paginator component is currently broken, because it doesn't know what page it's on! We're not passing it any props!)
 * Pass the correct props down, and observe how the Paginator component starts working again.
 *
 * Note that this re-architecture, compared to HW3, puts all our state in one place (Gallery), one level higher in the component hierarchy! Then, we pass relevant state back down to child components as props.
 * This is a powerful pattern that we will use a lot in the future.
 *
 * 2. Implement the logic for the itemsToDisplay and lastPossiblePage variables.
 *
 * The itemsToDisplay variable should be the list of items that should be displayed on the current page according to the following rules:
 * - It is size-limited to the itemsPerPage prop, since we don't want to display too many items at once.
 * - It is filtered by the search state, so that only items whose name contains the search query are displayed. When filtering, ignore upper/lowercase, and trim whitespace from either end of the search query as well as the item name.
 * - It is sliced according to the current page number. For example, if we are on page 2, and itemsPerPage is 10, then we should display items 10-19.
 *
 * The lastPossiblePage variable should be the last possible page number that a user can go to according to the following rules:
 * - It is the smallest number such that itemsToDisplay is non-empty.
 * - It is at least 1.
 *
 * To get started, run:
 *
 * pnpm install
 * pnpm dev
 *
 * Then visit localhost:5173 in your browser to see the app.
 *
 * If it's not working, you might need to complete at least TODOs 1 and 2 first.
 *
 * For grading purposes, do not remove any of the provided code, especially any 'data-testid' attributes.
 * Instead, add new code as needed!
 *
 * When you're done, you should be able to see a webpage with a large list of items.
 * There will be a display for what page you're on in the list, and you can move to the next or previous pages.
 * Additionally, when you enter some search in the search-box, some items will get filtered out and the pages will change accordingly.
 *
 * Good luck!
 *
 * As always, feel free to ask questions on Ed or come to office hours.
 */

type Props<T> = {
  data: T[];
  itemsPerPage: number;
};

// Notice how we can destructure the props object into its constituent properties upon arrival!
const Gallery = <T extends { name: string }>({
  data,
  itemsPerPage,
}: Props<T>) => {
  const [page, setPage] = useState(1);

  const itemsToDisplay: T[] = useMemo(() => {
    // TODO 4: Implement some logic to "derive" the items that we should display on this page based on our state!
    return data;
  }, [data]);

  // TODO 5: Define a variable `lastPossiblePage`.

  return (
    <div className="body">
      <h1>Gallery</h1>
      {/* TODO 3: Define a state and modify this input so that it reflects and updates the search state. */}
      <input data-testid="search" type="text" placeholder="Search" />

      <div className="gallery">
        {itemsToDisplay.map((item) => (
          <div className="item" key={item.name} data-testid="item">
            {item.name}
          </div>
        ))}
      </div>

      {/* TODO 2: Render the Paginator component here with the proper props. */}
    </div>
  );
};

export default Gallery;
