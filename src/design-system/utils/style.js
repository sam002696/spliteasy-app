export function resolveTokenValue(scale, value) {
  if (value == null) {
    return undefined;
  }

  return Object.prototype.hasOwnProperty.call(scale, value) ? scale[value] : value;
}

export function spacingStyle(theme, props) {
  const {
    m,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    p,
    pt,
    pr,
    pb,
    pl,
    px,
    py,
  } = props;

  return {
    margin: resolveTokenValue(theme.space, m),
    marginTop: resolveTokenValue(theme.space, mt ?? my),
    marginRight: resolveTokenValue(theme.space, mr ?? mx),
    marginBottom: resolveTokenValue(theme.space, mb ?? my),
    marginLeft: resolveTokenValue(theme.space, ml ?? mx),
    padding: resolveTokenValue(theme.space, p),
    paddingTop: resolveTokenValue(theme.space, pt ?? py),
    paddingRight: resolveTokenValue(theme.space, pr ?? px),
    paddingBottom: resolveTokenValue(theme.space, pb ?? py),
    paddingLeft: resolveTokenValue(theme.space, pl ?? px),
  };
}

export function colorValue(theme, value) {
  if (!value) {
    return undefined;
  }

  return theme.semantic[value] || theme.colors[value] || theme.rgba[value] || value;
}

export function radiusValue(theme, value) {
  return resolveTokenValue(theme.radii, value);
}
