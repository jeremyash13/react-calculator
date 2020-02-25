import React, { useState } from "react";
import { Spring, animated as a } from "react-spring/renderprops";

export default function Button(props) {
  const [pressed, setPressed] = useState(false);
  return (
    <Spring
      native
      from={{ scale: 1 }}
      to={{ scale: pressed? 0.95 : 1 }}
      config={{ duration: 25 }}
    >
      {({ scale }) => (
        <a.button
          id={props.id}
          value={props.value}
          style={{
            transform: scale.interpolate(scale => `scale(${scale})`)
          }}
          onMouseDown={() => {
            setPressed(true);
          }}
          onClick={() => setPressed(false)}
          onMouseUp={() => setPressed(false)}
        >
          {props.children}
        </a.button>
      )}
    </Spring>
  );
}
