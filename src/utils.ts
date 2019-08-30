// eslint-disable-next-line import/prefer-default-export
export const parseImageSrc = (imageDOM: string) => {
  if (document) {
    const imageDOMWrap = document.createElement('div');
    imageDOMWrap.innerHTML = imageDOM;
    // @ts-ignore
    const imageSrc = new URL(imageDOMWrap.querySelector('img').src);
    if (imageSrc) return imageSrc.pathname;
  }
  return '';
};
