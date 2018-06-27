class Utils {
  constructor() {
    this._hash2int = {};
  }

  stripSlashes(str) {
    let newStr = '';
    if (typeof str === 'string') {
      newStr = str
        .replace(/\\\//g, '/')
        .replace(/\\'/g, '\'')
        .replace(/\\"/g, '"')
        .replace(/\\0/g, '\0')
        .replace(/\\\\/g, '\\');
    }
    return newStr;
  }

  parseStringObject(sObj) {
    if (typeof sObj !== 'string') {
      return sObj;
    }

    const stripedObj = this.stripSlashes(sObj);
    //eslint-disable-next-line
    if (typeof sObj === 'string' && (/^[\],:{}\s]*$/.test(stripedObj.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))) {
      //this is a json
      try {
        return JSON.parse(stripedObj);
      } catch (e) {
        // console.error('Parse object error: Catched ', e);
      }
    }
    return stripedObj;
  }

  hashToInt(str, min, max) {
    let int = 0;

    if ((typeof str === 'undefined') || str.length === 0) {
      return int;
    }

    if (!this._hash2int[str]) {
      for (let i = 0; i < str.length; i++) {
        int += str.charCodeAt(i);
      }
      this._hash2int[str] = int;
    }

    if ((typeof min === 'undefined') || (typeof max === 'undefined')) {
      return this._hash2int[str];
    } else {
      return (this._hash2int[str] % (max - min + 1)) + min;
    }

  }

  insertIfDefined(obj, field, value) {
    if (typeof value !== 'undefined') {
      obj[field] = value;
    }
  }

  convertStyleParams(styleParams) {

    //default styleParams
    const convertedStyleParams = Object.assign({
      cubeImages: false,
      cubeType: 'fill',
      cubeRatio: 1,
      rotatingCropRatios: '',
      smartCrop: false,
      imageMargin: 10,
      galleryMargin: 0,
      floatingImages: 0,
      chooseBestGroup: true,
      groupSize: 3,
      groupTypes: '1,2h,2v,3h,3v,3t,3b,3l,3r',
      rotatingGroupTypes: '',
      isVertical: true,
      minItemSize: 120,
      oneRow: false,
      gallerySize: 500,
      collageDensity: 50,
    }, styleParams);

    this.insertIfDefined(convertedStyleParams, 'cubeImages', convertedStyleParams.cropItems);
    this.insertIfDefined(convertedStyleParams, 'cubeType', convertedStyleParams.cropType);
    this.insertIfDefined(convertedStyleParams, 'cubeRatio', convertedStyleParams.cropRatio);
    this.insertIfDefined(convertedStyleParams, 'rotatingCropRatios', Array.isArray(convertedStyleParams.rotatingCropRatios) ? convertedStyleParams.rotatingCropRatios.join(',') : undefined);
    this.insertIfDefined(convertedStyleParams, 'smartCrop', convertedStyleParams.smartCrop);
    this.insertIfDefined(convertedStyleParams, 'imageMargin', convertedStyleParams.itemSpacing);
    this.insertIfDefined(convertedStyleParams, 'galleryMargin', convertedStyleParams.layoutSpacing);
    this.insertIfDefined(convertedStyleParams, 'floatingImages', convertedStyleParams.randomSpacings);
    this.insertIfDefined(convertedStyleParams, 'chooseBestGroup', convertedStyleParams.smartGrouping);
    this.insertIfDefined(convertedStyleParams, 'groupSize', convertedStyleParams.itemsPerGroup);
    this.insertIfDefined(convertedStyleParams, 'groupTypes', Array.isArray(convertedStyleParams.allowedGroupTypes) ? convertedStyleParams.allowedGroupTypes.join(',') : undefined);
    this.insertIfDefined(convertedStyleParams, 'rotatingGroupTypes', Array.isArray(convertedStyleParams.rotatingGroupTypes) ? convertedStyleParams.rotatingGroupTypes.join(',') : undefined);
    this.insertIfDefined(convertedStyleParams, 'isVertical', convertedStyleParams.isColumnsLayout);
    this.insertIfDefined(convertedStyleParams, 'minItemSize', convertedStyleParams.minItemSize);
    this.insertIfDefined(convertedStyleParams, 'oneRow', convertedStyleParams.isVerticalScroll);
    this.insertIfDefined(convertedStyleParams, 'gallerySize', convertedStyleParams.rowSize || convertedStyleParams.columnSize);
    this.insertIfDefined(convertedStyleParams, 'collageDensity', convertedStyleParams.collageDensity);

    return convertedStyleParams;
  }

  convertContainer(container, styleParams) {
    const convertedContainer = {
      bounds: {},
      ...container,
    };
    const width = container.width || container.galleryWidth;
    const height = container.height || container.galleryHeight;

    if (container.width >= 0) {
      convertedContainer.galleryWidth = width + ((styleParams.imageMargin || 0) - (styleParams.galleryMargin || 0)) * 2;
      delete convertedContainer.width;
    }
    if (container.height >= 0) {
      convertedContainer.galleryHeight = height + ((styleParams.imageMargin || 0) - (styleParams.galleryMargin || 0));
      delete convertedContainer.height;
    }

    return convertedContainer;
  }

}
export const utils = new Utils();