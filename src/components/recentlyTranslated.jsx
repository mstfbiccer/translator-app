import { BsArrowLeftRight, BsTrash } from "react-icons/bs";
import { MdOutlineCleaningServices } from "react-icons/md";
import { RecentlyOperations } from "../api/recentlyOperations";

const RecentlyTranslated = ({
  recentlyList,
  title,
  onClickHandler,
  localStorageUpdate,
}) => {
  const recentlyOperator = new RecentlyOperations();
  return (
    <div>
      {recentlyList.length > 0 && <h3 className="recently-title">{title} </h3>}

      <div>
        {recentlyList.map((item) => (
          <div className="recently-items" key={item.id + item.input}>
            <div className="recently-inputs" key={item.id} value={item.id}>
              <div
                className="recently-input"
                onClick={() => {
                  onClickHandler(item.input);
                }}
              >
                {item.input}
              </div>
              <div className="recently-icon">
                <BsArrowLeftRight size={"10px"} />
              </div>
              <div
                className="recently-output"
                onClick={() => {
                  onClickHandler(item.input);
                }}
              >
                {item.output}
              </div>
              <div
                className="recently-trash"
                onClick={() => {
                  recentlyOperator.remove(item.id);
                  localStorageUpdate();
                }}
              >
                <BsTrash />
              </div>
            </div>
          </div>
        ))}
        {recentlyList.length > 0 && (
          <div
            className="clear-history"
            onClick={() => {
              recentlyOperator.clear();
              localStorageUpdate();
            }}
          >
            Clear History <MdOutlineCleaningServices />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyTranslated;
