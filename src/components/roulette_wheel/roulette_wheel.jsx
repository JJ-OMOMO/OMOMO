import React from "react";
import { Wheel } from "react-custom-roulette";
import Swal from "sweetalert2";

export default ({
  closeModal,
  mustSpin,
  setMustSpin,
  rouletteData,
  prizeNumber,
  data,
  backgroundColors,
  textColors,
  fontSize,
  outerBorderColor,
  outerBorderWidth,
  innerRadius,
  innerBorderColor,
  innerBorderWidth,
  radiusLineColor,
  radiusLineWidth,
  textDistance,
}) => (
  <>
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={data}
      backgroundColors={backgroundColors}
      textColors={textColors}
      fontSize={fontSize}
      outerBorderColor={outerBorderColor}
      outerBorderWidth={outerBorderWidth}
      innerRadius={innerRadius}
      innerBorderColor={innerBorderColor}
      innerBorderWidth={innerBorderWidth}
      radiusLineColor={radiusLineColor}
      radiusLineWidth={radiusLineWidth}
      textDistance={textDistance}
      onStopSpinning={
        !setMustSpin
          ? () => {
              return Swal.fire({
                text: `오늘은 '${data[prizeNumber].option}'!`,
                background: "#FEDB41",
                backdrop: "rgba(0,0,0,0.8)",
                confirmButtonColor: "#463400",
                icon: "success",
              });
            }
          : async () => {
              setMustSpin(false);
              const result = { ...rouletteData };
              result.optionName = data[prizeNumber].option;
              localStorage.setItem(result.id, JSON.stringify(result));
              await closeModal(false);
              await window.location.reload();
            }
      }
    />
  </>
);
