
const allowedStyles = [ 'unstyled', 'header-two', 'header-three', 'header-four' ]

export const getConfig = (config) => {

    config = {
        styles : getStyles(config?.styles),
        vimeo : config?.vimeo !== false,
        youTube : config?.youTube !== false,
        link : config?.link !== false,
        image : config?.image !== false,
        bulletList : config?.bulletList !== false,
        numberedList : config?.numberedList !== false,
        multiLine : config?.multiLine !== false,
    }

    config.hasMedia = config.vimeo || config.youTube || config.image || config.link;
    return config;
}

const getStyles = styles => {
    if(styles == null || styles === undefined) return allowedStyles;
    return styles.filter(style => allowedStyles.includes(style));
}