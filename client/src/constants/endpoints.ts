const defaultBasePath = '/'
const basePath = import.meta.env.VITE_BASE_PATH || defaultBasePath

export const endpoints: { [key: string]: string } = {
  filesList: `${basePath}file/list`,
}
