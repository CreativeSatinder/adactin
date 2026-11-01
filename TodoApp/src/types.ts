export interface ShoppingItem {
  id: string;
  title: string;
  store: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface ThemeColors {
  dark: boolean;
  bg: string;
  card: string;
  header: string;
  headerText: string;
  text: string;
  subtext: string;
  muted: string;
  border: string;
  borderLight: string;
  tabBg: string;
  tabActive: string;
  inputBg: string;
  rowBg: string;
  rowActiveBg: string;
  pillBg: string;
  spinnerBox: string;
  overlay: string;
}

export interface ThemeContextValue {
  theme: ThemeColors;
  toggleTheme: () => void;
}
