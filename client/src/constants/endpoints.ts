export const { REACT_APP_BASE_PATH } = process.env // no trailing slash!

const defaultBasePath = '/'
const basePath = REACT_APP_BASE_PATH || defaultBasePath

export const endpoints: { [key: string]: string } = {
  filesList: `${basePath}file/list`,
}
