export const setFigure = (ref, alignment, width) => {
    const figure = ref.current.closest('figure');

    figure.style.width = width;

    figure.classList.remove('left');
    figure.classList.remove('right');
    figure.classList.remove('no-padding');

    if(alignment === 'left') figure.classList.add('left');
    if(alignment === 'right') figure.classList.add('right');

    if(width === '100%') figure.classList.add("no-padding");
}