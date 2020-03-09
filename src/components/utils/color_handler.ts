export interface COMPONENTS_COLOR {
  primary? : boolean;
  secondary? : boolean;
  disabled? : boolean;
  warning? : boolean;
};

export const getColor = (componentProps : any) => {
  const { theme, secondary, disabled, warning } = componentProps || {};
  if (warning) {
    return theme.WARNING;
  } else if (disabled) {
    return theme.DISABLED;
  }
  return secondary ? theme.SECONDARY : theme.PRIMARY;
};
