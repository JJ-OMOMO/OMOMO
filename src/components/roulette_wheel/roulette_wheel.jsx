import React from 'react'
import { Wheel } from 'react-custom-roulette'


export default ({
    getRoulette,
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
    textDistance
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
                !setMustSpin ?
                    () => {
                        return alert(data[prizeNumber].option)
                    }
                    :
                    async () => {
                        setMustSpin(false);
                        const result = { ...rouletteData }
                        result.optionName = data[prizeNumber].option;
                        localStorage.setItem(result.id, JSON.stringify(result));
                        await closeModal(false);
                        await getRoulette();
                    }
            }
        />
    </>
)
