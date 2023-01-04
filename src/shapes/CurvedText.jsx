import { useEffect, useMemo, useState } from "react";
import { Shape } from "react-konva";

export const CurvedText = ({ curve, text }) => {
  const [invert, setInvert] = useState(false);

  const radius = useMemo(() => {
    return 5000 * (0.01 * (100 - Math.abs(curve)));
  }, [curve]);

  useEffect(() => {
    if (curve >= 0) {
      setInvert(false);
    } else if (curve < 0) {
      setInvert(true);
    }
  }, [curve]);

  return (
    <>
      <Shape
        sceneFunc={(ctxRef, shape) => {
          // Move to center
          ctxRef.translate(
            window.innerWidth / 2,
            invert
              ? -radius + window.innerHeight / 2
              : radius + window.innerHeight / 2
          );
          const inwardFacing = invert ? false : true;
          const sAngle = invert ? 180 : 0;
          let startAngle = sAngle * (Math.PI / 180); // convert to radians
          const kerning = 2;
          const diameter = radius * 2;

          // calculate height of the font
          var div = document.createElement("div");
          div.innerHTML = text;
          div.style.position = "absolute";
          div.style.top = "-10000px";
          div.style.left = "-10000px";
          document.body.appendChild(div);
          div.style.fontSize = "22pt";
          const textHeight = div.offsetHeight;
          document.body.removeChild(div);

          ctxRef.font = "22pt Arial";

          // Setup letters and positioning
          startAngle += Math.PI * !inwardFacing; // Rotate 180 if outward
          ctxRef.textBaseline = "middle";
          ctxRef.textAlign = "center";

          // rotate 50% of total angle for center alignment
          for (var j = 0; j < text.length; j++) {
            var charWid = ctxRef.measureText(text[j]).width;
            startAngle +=
              (charWid + (j === text.length - 1 ? 0 : kerning)) /
              (diameter / 2 - textHeight) /
              2;
          }

          ctxRef.rotate(startAngle);

          const drawLetters = (j) => {
            var charWid = ctxRef.measureText(text[j]).width; // half letter
            // rotate half letter
            ctxRef.rotate((charWid / 2 / (diameter / 2 - textHeight)) * -1);
            ctxRef.fillText(
              text[j],
              0,
              (inwardFacing ? 1 : -1) * (0 - diameter / 2)
            );

            ctxRef.rotate(
              ((charWid / 2 + kerning) / (diameter / 2 - textHeight)) * -1
            ); // rotate half letter
          };

          if (curve < 0) {
            for (var k = 0; k < text.length; k++) {
              drawLetters(k);
            }
          } else {
            for (var l = text.length - 1; l >= 0; l--) {
              drawLetters(l);
            }
          }
        }}
      />
    </>
  );
};
