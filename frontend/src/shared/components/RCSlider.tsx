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
        track: { backgroundColor: "#3b82f6" }, // blue-500
        handle: {
          borderColor: "#3b82f6",
          backgroundColor: "#3b82f6",
        },
        rail: { backgroundColor: "#e5e7eb" }, // gray-200
      }}
    />
  );
};

export default RCSlider;
