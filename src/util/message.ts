export interface RequireErrorMessageExtra {
  fieldName?: string
}
export interface MinLengthErrorMessageExtra {
  fieldName?: string
  minLength:number
}

export interface MaxLengthErrorMessageExtra {
  fieldName?: string
  maxLength:number
}
const errorMessageRenderMapping = {
  'required': (extra: RequireErrorMessageExtra) => `${extra?.fieldName}不能为空`,
  'minLength': (extra: MinLengthErrorMessageExtra) => `${extra?.fieldName}至少${extra?.minLength}个字符`,
  'maxLength': (extra: MaxLengthErrorMessageExtra) => `${extra?.fieldName}最多${extra?.maxLength}个字符`,
};
export const getFormErrorString = (type: string | undefined, extra: any) => {
  if (type === undefined) {
    return undefined;
  }
  const renderer = errorMessageRenderMapping[type];
  if (renderer === undefined) {
    return undefined;
  }
  return renderer(extra);
};
