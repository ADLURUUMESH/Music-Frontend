import { Confirm } from "react-st-modal";

export function Dialog(props) {
  return (
    <div>
      <button
        onClick={async () => {
          const result = await Confirm(
            "Сonfirmation text",
            "Сonfirmation title"
          );

          if (result) {
            // Сonfirmation confirmed
          } else {
            // Сonfirmation not confirmed
          }
        }}
      >
        Confirm
      </button>
    </div>
  );
}
