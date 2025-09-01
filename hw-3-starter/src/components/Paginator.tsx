import { ChevronUpCircle, ChevronDownCircle } from "lucide-react";

type Props = {
  minLimit?: number;
  maxLimit: number;
  page: number;
  setPage: (page: number) => void;
};

const Paginator = ({ minLimit, maxLimit, page, setPage }: Props) => {

	// TODO 1: Add reactive logic to make the two buttons update the setPage.

  return (
    <div className="row">
      <button data-testid="decrementpage">
        <ChevronDownCircle size={64} />
      </button>
      <h2 data-testid="pagenumber" className="pagenumber">
        {page}
      </h2>
      <button data-testid="incrementpage">
        <ChevronUpCircle size={64} />
      </button>
    </div>
  );
};

export default Paginator;
