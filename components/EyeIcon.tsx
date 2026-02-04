import Svg, { Circle, Path } from "react-native-svg";
import { theme } from "@/utils/theme";

export const EyeIcon = ({ open }: { open: boolean }) => {
  if (!open) {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
          stroke={theme.colors.textSecondary}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle
          cx={12}
          cy={12}
          r={3}
          stroke={theme.colors.textSecondary}
          strokeWidth={1.7}
        />
      </Svg>
    );
  }

  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 3l18 18"
        stroke={theme.colors.textSecondary}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <Path
        d="M10.58 10.58a2 2 0 0 0 2.83 2.83"
        stroke={theme.colors.textSecondary}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <Path
        d="M9.88 4.68A10.8 10.8 0 0 1 12 4c6.5 0 10 6 10 6a17.1 17.1 0 0 1-3.12 3.88"
        stroke={theme.colors.textSecondary}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.1 6.1C4.05 7.4 2 10 2 10s3.5 6 10 6c1.28 0 2.44-.22 3.47-.6"
        stroke={theme.colors.textSecondary}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
