import { useState } from "react";

/*
 * Treat this as a library component. Often times, you don't want to code basic components from
 * scratch, but rather rely on a pre-built library.
 */

type SlideToggleProps = {
  label: string;
  onChange: (val: boolean) => void;
};

/**
 * A slide toggle.
 * @param label A label for the toggle, displayed to the right of the toggle.
 * @param onChange A callback function to be called whenever the slide is toggled.
 */
const SlideToggle = ({ label, onChange }: SlideToggleProps) => {
  const [on, setOn] = useState(false);
  return (
    <div className="toggle-container">
      <div
        className={`toggle-switch ${on ? "on" : "off"}`}
        onClick={() => {
          onChange(!on);
          setOn((prev) => !prev);
        }}
      >
        <div className="toggle-circle"></div>
      </div>
      <p>{label}</p>
    </div>
  );
};

export default SlideToggle;
