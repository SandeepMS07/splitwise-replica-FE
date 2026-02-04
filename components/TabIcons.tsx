import Svg, { Path } from "react-native-svg";

export const GroupsIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm10 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM7 15c-2.76 0-5 1.79-5 4v1h10v-1c0-2.21-2.24-4-5-4Zm10 0c-.34 0-.67.03-1 .08 1.79.86 3 2.28 3 3.92v1h5v-1c0-2.21-2.24-4-5-4Z"
      fill={color}
    />
  </Svg>
);

export const BalancesIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 5h16a2 2 0 0 1 2 2v3H2V7a2 2 0 0 1 2-2Zm-2 9h20v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3Zm6 2h4v2H8v-2Z"
      fill={color}
    />
  </Svg>
);

export const ProfileIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.31 0-6 1.79-6 4v2h12v-2c0-2.21-2.69-4-6-4Z"
      fill={color}
    />
  </Svg>
);
