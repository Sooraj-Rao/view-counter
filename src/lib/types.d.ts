export interface SVGOptions {
  text: string;
  colorStyle: string;
  icon: keyof typeof icons;
  scale: number;
  borderRadius: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  iconSize: number;
  padding: number;
  gap: number;
  width: number;
  bgColor?: string | null;
  textColor?: string | null;
  iconColor?: string | null;
  viewsBgColor?: string | null;
  viewsColor?: string | null;
  gradientStart?: string | null;
  gradientEnd?: string | null;
  borderColor?: string | null;
}
