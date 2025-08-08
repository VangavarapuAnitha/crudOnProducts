import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface RCSliderProps {
  min: number;
  max: number;
  onAfterChange: (values: number[]) => void;
}

const RCSlider: React.FC<RCSliderProps> = ({ min, max, onAfterChange }) => {
  return (
    <Slider
      range
      min={min}
      max={max}
      defaultValue={[min, max]}
      onChangeComplete={(values) => onAfterChange(values as number[])}
      styles={{
        track: { backgroundColor: "oklch(28.2% 0.091 267.935)" }, // blue-500
        handle: {
          borderColor: "oklch(28.2% 0.091 267.935)",
          backgroundColor: "oklch(28.2% 0.091 267.935)",
        },
        rail: { backgroundColor: "#e5e7eb" }, // gray-200
      }}
    />
  );
};

export default RCSlider;
