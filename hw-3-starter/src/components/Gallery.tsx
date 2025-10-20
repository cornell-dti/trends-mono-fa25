import { useMemo, useState } from "react";
import "./Gallery.css";

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
